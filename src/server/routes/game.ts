import { Router } from 'express';
import { redis, reddit, context } from '@devvit/web/server';
import { getTodayKey, parseRedisInt, getUserStats } from '../utils/helpers';
import {
  InitResponse,
  DailyChallengeResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  LeaderboardResponse,
  LeaderboardEntry,
  UserStats, PracticeGameResponse, PostCommentResponse, PostCommentRequest,
} from '../../shared/types/api';
import { Difficulty } from '../../shared/types/game';
import { CONFIG } from '../core/game-config';
import { generateBoard } from '../core/board';
import { generatePirateComment } from '../utils/commentGenerator';

const router = Router();

const getClientGameConfig = (difficulty: Difficulty = 'base') => {
  const currentConfig = CONFIG[difficulty];

  return {...currentConfig};
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
  const { userId } = context;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const today = getTodayKey();
    const boardKey = `daily_board:${today}`;
    const attemptsKey = `daily_attempts:${today}:${userId}`;
    const statsKey = `user_stats:${userId}`;

    const attemptsRaw = await redis.get(attemptsKey);
    const attempts = parseRedisInt(attemptsRaw);
    let matrix;
    let mode: 'practice' | 'daily' = 'daily';

    if (attempts > 0) {
      console.log(`User ${userId} already played daily. Generating random map.`);
      matrix = generateBoard('base');
      mode = 'practice';
    } else {
      let matrixJson = await redis.get(boardKey);

      if (!matrixJson) {
        console.log(`Generating new Daily Board for ${today}`);
        const newMatrix = generateBoard('base');
        matrixJson = JSON.stringify(newMatrix);
        await redis.set(boardKey, matrixJson, { expiration: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)) });
      }

      matrix = JSON.parse(matrixJson);
    }

    const statsRaw = await redis.hGetAll(statsKey);
    const stats: UserStats = getUserStats(statsRaw);
    const currUser = await reddit.getCurrentUser();

    const response: DailyChallengeResponse = {
      matrix: matrix,
      gameConfig: getClientGameConfig('base'),
      date: today!,
      attempts: attempts,
      stats: stats,
      username: currUser?.username ?? 'Anonymous Pirate',
      mode: mode
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
  const { userId } = context;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { score, findings, isWin, isDaily } = req.body as SubmitScoreRequest;
  const today = getTodayKey();
  let confirmedIsDaily = isDaily;

  try {
    const statsKey = `user_stats:${userId}`;
    const attemptsKey = `daily_attempts:${today}:${userId}`;
    const leaderboardKey = `daily_leaderboard:${today}`;

    if (isDaily) {
      const currentAttemptsRaw = await redis.get(attemptsKey);
      const currentAttempts = parseRedisInt(currentAttemptsRaw);

      if (currentAttempts > 0) {
        confirmedIsDaily = false;
      }
    }

    await redis.hIncrBy(statsKey, 'gamesPlayed', 1);
    await redis.hIncrBy(statsKey, 'totalScore', score);

    if (findings) {
      if (findings.chest > 0) await redis.hIncrBy(statsKey, 'findings_chest', findings.chest);
      if (findings.gold > 0) await redis.hIncrBy(statsKey, 'findings_gold', findings.gold);
      if (findings.fish > 0) await redis.hIncrBy(statsKey, 'findings_fish', findings.fish);
      if (findings.bomb > 0) await redis.hIncrBy(statsKey, 'findings_bomb', findings.bomb);
    }

    if (isWin) await redis.hIncrBy(statsKey, 'wins', 1);

    if (confirmedIsDaily) {
      await redis.incrBy(attemptsKey, 1);
      const currUser = await reddit.getCurrentUser();
      const username = currUser?.username ?? 'Anonymous';

      await redis.zAdd(leaderboardKey, {
        member: `${username}::${userId}`,
        score: score,
      });

    }

    const updatedStatsRaw = await redis.hGetAll(statsKey);
    const newStats: UserStats = getUserStats(updatedStatsRaw);

    res.json({ success: true, newStats } as SubmitScoreResponse);

  } catch (error) {
    console.error('Submit Score Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to submit score' });
  }
});

router.get('/api/leaderboard', async (_req, res) => {
  try {
    const today = getTodayKey();
    const leaderboardKey = `daily_leaderboard:${today}`;

    const topScores = await redis.zRange(leaderboardKey, 0, 9, {
      by: 'rank',
      reverse: true
    });

    const entries: LeaderboardEntry[] = topScores.map((entry, index) => {
      const [username] = entry.member.split('::');
      return {
        username: username ?? 'Stranger',
        score: entry.score,
        rank: index + 1
      };
    });

    res.json({ entries } as LeaderboardResponse);

  } catch (error) {
    console.error('Leaderboard Error:', error);
    res.status(500).json({ entries: [] });
  }
});

const getRandomTemplate = (templates: string[]) => {
  return templates[Math.floor(Math.random() * templates.length)];
};

router.post('/api/post-comment', async (req, res) => {
  const { userId, postId } = context;

  if (!userId || !postId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { score, isWin, wasBombed, moves, findings } = req.body as PostCommentRequest;

  try {
    const lootList: string[] = [];
    if (findings.chest > 0) lootList.push(`${findings.chest}x 📦 Chests`);
    if (findings.gold > 0) lootList.push(`${findings.gold}x 💰 Gold`);
    if (findings.fish > 0) lootList.push(`${findings.fish}x 🐟 Fish`);

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

export default router;
