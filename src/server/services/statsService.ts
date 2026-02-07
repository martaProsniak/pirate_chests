import { FindingsMap } from '../../shared/types/game';
import { RedisClient } from '@devvit/web/server';

export const updateUserGlobalStats = async (
  redis: RedisClient,
  userId: string,
  data: { score: number; findings?: FindingsMap; isWin: boolean }
) => {
  const statsKey = `user_stats:${userId}`;

  const promises = [
    redis.hIncrBy(statsKey, 'gamesPlayed', 1),
    redis.hIncrBy(statsKey, 'totalScore', data.score),
  ];

  if (data.isWin) {
    promises.push(redis.hIncrBy(statsKey, 'wins', 1));
  }

  if (data.findings) {
    if (data.findings.chest > 0)
      promises.push(redis.hIncrBy(statsKey, 'findings_chest', data.findings.chest));
    if (data.findings.gold > 0)
      promises.push(redis.hIncrBy(statsKey, 'findings_gold', data.findings.gold));
    if (data.findings.coconut > 0)
      promises.push(redis.hIncrBy(statsKey, 'findings_coconut', data.findings.coconut));
    if (data.findings.bomb > 0)
      promises.push(redis.hIncrBy(statsKey, 'findings_bomb', data.findings.bomb));
  }

  await Promise.all(promises);
};
