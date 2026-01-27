import { Router } from 'express';
import { redis, reddit, context } from '@devvit/web/server';
import { getTodayKey, generateRandomId, parseRedisInt } from '../utils/helpers';
import {
  InitResponse,
  DailyChallengeResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  LeaderboardResponse,
  LeaderboardEntry,
  UserStats
} from '../../shared/types/api';

const router = Router();

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

    const seedKey = `daily_seed:${today}`;
    const attemptsKey = `daily_attempts:${today}:${userId}`;
    const statsKey = `user_stats:${userId}`;

    let seed = await redis.get(seedKey);
    if (!seed) {
      seed = `pirate-${today}-${generateRandomId()}`;
      await redis.set(seedKey, seed, { expiration: new Date(Date.now() + 172800000) });
    }

    const attemptsRaw = await redis.get(attemptsKey);
    const attempts = parseRedisInt(attemptsRaw);

    const statsRaw = await redis.hGetAll(statsKey);
    const stats: UserStats = {
      score: parseRedisInt(statsRaw?.totalScore),
      gamesPlayed: parseRedisInt(statsRaw?.gamesPlayed),
      wins: parseRedisInt(statsRaw?.wins),
      findings: {
        chests: parseRedisInt(statsRaw?.findings_chests),
        gold: parseRedisInt(statsRaw?.findings_gold),
        bombs: parseRedisInt(statsRaw?.findings_bombs),
      }
    };

    const currUser = await reddit.getCurrentUser();

    const response: DailyChallengeResponse = {
      seed: seed,
      date: today!,
      attempts: attempts,
      stats: stats,
      username: currUser?.username ?? 'Anonymous Pirate',
    };

    res.json(response);

  } catch (error) {
    console.error('Daily Challenge Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
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

  try {
    const statsKey = `user_stats:${userId}`;
    const attemptsKey = `daily_attempts:${today}:${userId}`;
    const leaderboardKey = `daily_leaderboard:${today}`;

    await redis.hIncrBy(statsKey, 'gamesPlayed', 1);
    await redis.hIncrBy(statsKey, 'totalScore', score);

    if (findings) {
      if (findings.chests > 0) await redis.hIncrBy(statsKey, 'findings_chests', findings.chests);
      if (findings.gold > 0) await redis.hIncrBy(statsKey, 'findings_gold', findings.gold);
      if (findings.bombs > 0) await redis.hIncrBy(statsKey, 'findings_bombs', findings.bombs);
    }

    if (isWin) await redis.hIncrBy(statsKey, 'wins', 1);

    if (isDaily) {
      await redis.incrBy(attemptsKey, 1);
      if (isWin) {
        const currUser = await reddit.getCurrentUser();
        const username = currUser?.username ?? 'Anonymous';

        await redis.zAdd(leaderboardKey, {
          member: `${username}::${userId}`,
          score: score,
        });
      }
    }

    const updatedStatsRaw = await redis.hGetAll(statsKey);
    const newStats: UserStats = {
      score: parseRedisInt(updatedStatsRaw?.totalScore),
      gamesPlayed: parseRedisInt(updatedStatsRaw?.gamesPlayed),
      wins: parseRedisInt(updatedStatsRaw?.wins),
      findings: {
        chests: parseRedisInt(updatedStatsRaw?.findings_chests),
        gold: parseRedisInt(updatedStatsRaw?.findings_gold),
        bombs: parseRedisInt(updatedStatsRaw?.findings_bombs),
      }
    };

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

export default router;
