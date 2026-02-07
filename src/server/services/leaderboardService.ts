import { LeaderboardEntry, LeaderboardResponse } from '../../shared/types/api';
import { calculateCompositeScore, getCurrentWeekKey } from '../utils/scoreUtils';
import { ILeaderboardRedis } from './types';

export class LeaderboardService {
  private redis: ILeaderboardRedis;

  constructor(redis: ILeaderboardRedis) {
    this.redis = redis;
  }

  async addDailyScore(postId: string, memberKey: string, score: number, time: number) {
    const key = `daily_leaderboard:${postId}`;
    const compositeScore = calculateCompositeScore(score, time);

    await this.redis.zAdd(key, { member: memberKey, score: compositeScore });
  }

  async addWeeklyScore(memberKey: string, score: number, time: number) {
    const weekKey = getCurrentWeekKey();
    const key = `weekly_leaderboard:${weekKey}`;
    const compositeScore = calculateCompositeScore(score, time);

    await this.redis.zIncrBy(key, memberKey, compositeScore);
  }

  async getLeaderboard(
    period: 'daily' | 'weekly',
    postId: string | undefined,
    currentUserId: string | undefined,
    currentUsername: string | undefined
  ): Promise<LeaderboardResponse> {
    let key: string;

    if (period === 'weekly') {
      const weekKey = getCurrentWeekKey();
      key = `weekly_leaderboard:${weekKey}`;
    } else {
      if (!postId) return { entries: [] };
      key = `daily_leaderboard:${postId}`;
    }

    const topScores = await this.redis.zRange(key, 0, 19, {
      by: 'rank',
      reverse: true,
    });

    const entries: LeaderboardEntry[] = topScores.map((entry, index) => {
      const [username] = entry.member.split('::');
      return {
        username: username ?? 'Stranger',
        score: Math.floor(entry.score),
        rank: index + 1,
      };
    });

    let userEntry: LeaderboardEntry | null = null;

    if (currentUserId) {
      const userInTopIndex = topScores.findIndex((s) => s.member.endsWith(`::${currentUserId}`));

      if (userInTopIndex !== -1) {
        userEntry = entries[userInTopIndex]!;
      } else {
        const memberKey = `${currentUsername}::${currentUserId}`;

        const [rankAsc, totalCount, score] = await Promise.all([
          this.redis.zRank(key, memberKey),
          this.redis.zCard(key),
          this.redis.zScore(key, memberKey),
        ]);

        if (rankAsc !== undefined && totalCount !== undefined && score !== undefined) {
          userEntry = {
            username: currentUsername ?? 'Matey',
            score: Math.floor(score),
            rank: totalCount - rankAsc,
          };
        }
      }
    }

    return { entries, userEntry };
  }
}
