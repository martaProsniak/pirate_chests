import { Router } from 'express';
import { redis, reddit, context, realtime } from '@devvit/web/server';
import { getUserStats } from '../utils/helpers';
import {
  InitResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  UserStats,
  PracticeGameResponse,
  PostCommentResponse,
  PostCommentRequest,
  DailyChallengeResponse,
} from '../../shared/types/api';
import { Difficulty, FindingsMap, TreasureKind } from '../../shared/types/game';
import { CONFIG } from '../core/gameConfig';
import { generateBoard } from '../core/board';
import { generatePirateComment } from '../utils/commentGenerator';
import { getOrCreateDailyBoard } from '../services/boardService';
import { updateUserGlobalStats } from '../services/statsService';
import { MODE_UPDATE_MSG, STATS_UPDATE_MSG, userDataChannel } from '../../shared/types/channels';
import { LeaderboardService } from '../services/leaderboardService';

const router = Router();

const getClientGameConfig = (difficulty: Difficulty = 'base') => {
  const currentConfig = CONFIG[difficulty];

  return { ...currentConfig };
};

router.get('/api/init', async (_req, res) => {
  const { postId } = context;

  if (!postId) {
    res.status(400).json({ status: 'error', message: 'Missing postId' });
    return;
  }

  try {
    const currUser = await reddit.getCurrentUser();
    const username = currUser?.username ?? 'Anonymous Pirate';

    const response: InitResponse = {
      type: 'init',
      postId: postId,
      username: username,
    };

    res.json(response);
  } catch (error) {
    console.error('Init Error:', error);
    res.status(500).json({ status: 'error', message: 'Initialization failed' });
  }
});

router.get('/api/daily-challenge', async (_req, res) => {
  const { userId, postId } = context;

  if (!userId || !postId) {
    console.error('Missing context:', { userId, postId });
    res.status(400).json({ error: 'Context missing' });
    return;
  }

  try {
    const playedKey = `daily_played_flag:${postId}:${userId}`;
    const statsKey = `user_stats:${userId}`;

    const playedRaw = await redis.get(playedKey);
    const hasPlayed = !!playedRaw;

    let matrix;
    let mode: 'daily' | 'practice';

    if (hasPlayed) {
      // User has already played this specific post -> Force Practice
      matrix = generateBoard('base');
      mode = 'practice';
    } else {
      // New game for this post -> Get deterministic board
      mode = 'daily';
      matrix = await getOrCreateDailyBoard(redis, postId);
    }

    const statsRaw = await redis.hGetAll(statsKey);
    const stats = getUserStats(statsRaw);
    const currUser = await reddit.getCurrentUser();

    const response: DailyChallengeResponse = {
      matrix,
      gameConfig: getClientGameConfig('base'),
      date: new Date().toISOString(),
      hasPlayed,
      stats,
      username: currUser?.username ?? 'Matey',
      mode,
    };

    res.json(response);
  } catch (error) {
    console.error('Daily Challenge Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.get('/api/practice-challenge', async (_req, res) => {
  const difficulty: Difficulty = 'base';
  const { userId } = context;

  try {
    const matrix = generateBoard(difficulty);
    const statsKey = `user_stats:${userId}`;
    const statsRaw = await redis.hGetAll(statsKey);
    const stats: UserStats = getUserStats(statsRaw);
    const currUser = await reddit.getCurrentUser();

    const response: PracticeGameResponse = {
      matrix: matrix,
      gameConfig: getClientGameConfig('base'),
      stats: stats,
      username: currUser?.username ?? 'Anonymous Pirate',
      mode: 'practice',
    };

    res.json(response);
  } catch (error) {
    console.error('Practice Error:', error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/api/submit-score', async (req, res) => {
  const { userId, postId, username } = context;

  if (!userId || !postId || !username) {
    res.status(400).json({ error: 'Missing context' });
    return;
  }

  const { score, findings, isWin, isDaily, time } = req.body as SubmitScoreRequest;
  const leaderboardService = new LeaderboardService(redis);

  let confirmedIsDaily = isDaily;

  try {
    const playedKey = `daily_played_flag:${postId}:${userId}`;

    if (isDaily) {
      const playedRaw = await redis.get(playedKey);
      if (playedRaw) {
        confirmedIsDaily = false;
      }
    }

    await updateUserGlobalStats(redis, userId, { score, findings, isWin });

    if (confirmedIsDaily) {
      const memberKey = `${username}::${userId}`;
      await redis.set(playedKey, '1');

      await Promise.all([
        leaderboardService.addDailyScore(postId, memberKey, score, time),
        leaderboardService.addWeeklyScore(memberKey, score, time)
      ]);
    }

    const updatedStatsRaw = await redis.hGetAll(`user_stats:${userId}`);
    const newStats: UserStats = getUserStats(updatedStatsRaw);

    res.json({ success: true, newStats } as SubmitScoreResponse);

    await realtime.send(userDataChannel(userId), {
      type: STATS_UPDATE_MSG,
      userId: userId,
      payload: { stats: newStats },
    });

    if (confirmedIsDaily) {
      await realtime.send(userDataChannel(userId), {
        type: MODE_UPDATE_MSG,
        userId: userId,
        payload: { postId: postId, mode: 'practice' },
      });
    }
  } catch (error) {
    console.error('Submit Score Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to submit score' });
  }
});

router.get('/api/leaderboard', async (req, res) => {
  const { postId, username, userId } = context;
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const period = (urlParams.get('period') as 'daily' | 'weekly') || 'daily';

  const leaderboardService = new LeaderboardService(redis);

  try {
    const response = await leaderboardService.getLeaderboard(
      period,
      postId,
      userId,
      username
    );
    res.json(response);
  } catch (error) {
    console.error('Leaderboard Error:', error);
    res.status(500).json({ entries: [] });
  }
});

router.post('/api/post-comment', async (req, res) => {
  const { userId, postId } = context;

  if (!userId || !postId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { score, isWin, wasBombed, moves, findings } = req.body as PostCommentRequest;

  try {
    const commentText = generatePirateComment(score, isWin, wasBombed, moves, findings);

    const comment = await reddit.submitComment({
      id: postId,
      text: commentText,
    });

    res.json({ success: true, commentId: comment.id } as PostCommentResponse);
  } catch (error) {
    console.error('Post Comment Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to post comment' });
  }
});

router.get('/api/user-stats', async (_req, res) => {
  const { userId } = context;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  try {
    const statsKey = `user_stats:${userId}`;
    const rawStats = await redis.hGetAll(statsKey);

    const emptyFindings: FindingsMap = {
      chest: 0,
      gold: 0,
      coconut: 0,
      bomb: 0,
    };

    if (!rawStats) {
      res.json({
        success: true,
        stats: { score: 0, gamesPlayed: 0, wins: 0, findings: emptyFindings },
      });
      return;
    }

    const findings: FindingsMap = { ...emptyFindings };

    Object.keys(rawStats).forEach((key) => {
      if (key.startsWith('findings_')) {
        const itemType = key.replace('findings_', '') as TreasureKind;

        if (itemType in findings) {
          findings[itemType] = parseInt(rawStats[key] || '0', 10);
        }
      }
    });

    const stats: UserStats = {
      score: parseInt(rawStats.totalScore || '0', 10),
      gamesPlayed: parseInt(rawStats.gamesPlayed || '0', 10),
      wins: parseInt(rawStats.wins || '0', 10),
      findings,
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
