import { LeaderboardEntry, LeaderboardResponse } from '../../shared/types/api';
import { calculateCompositeScore, getCurrentWeekKey } from '../utils/scoreUtils';
import { ILeaderboardRedis } from './types';

const DEFAULT_LIMIT = 10;
const TIE_BREAKER_BUFFER = 20;

export class LeaderboardService {
  private redis: ILeaderboardRedis;

  constructor(redis: ILeaderboardRedis) {
    this.redis = redis;
  }

  async addDailyScore(postId: string, memberKey: string, score: number, time: number) {
    const { leaderboardKey, timeKey } = this.getKeys('daily', postId);
    if (!leaderboardKey || !timeKey) return;

    await Promise.all([
      this.redis.zAdd(leaderboardKey, { member: memberKey, score: calculateCompositeScore(score, time) }),
      this.redis.hSet(timeKey, { [memberKey]: time.toString() }),
    ]);
  }

  async addWeeklyScore(memberKey: string, score: number, time: number) {
    const { leaderboardKey, timeKey } = this.getKeys('weekly');
    if (!leaderboardKey || !timeKey) return;

    await Promise.all([
      this.redis.zIncrBy(leaderboardKey, memberKey, score),
      this.redis.hIncrBy(timeKey, memberKey, time),
    ]);
  }

  async getLeaderboard(
    period: 'daily' | 'weekly',
    postId: string | undefined,
    currentUserId: string | undefined,
    currentUsername: string | undefined,
    limit: number = DEFAULT_LIMIT
  ): Promise<LeaderboardResponse> {
    const { leaderboardKey, timeKey } = this.getKeys(period, postId);
    if (!leaderboardKey || !timeKey) return { entries: [] };

    const rawEntries = await this.getTopEntries(leaderboardKey, timeKey, limit + TIE_BREAKER_BUFFER);

    const entries: LeaderboardEntry[] = rawEntries
      .slice(0, limit)
      .map((e, index) => ({
        username: e.member.split('::')[0] ?? 'Stranger',
        score: e.score,
        time: e.time,
        rank: index + 1,
      }));

    const userEntry = await this.resolveUserEntry(
      leaderboardKey,
      timeKey,
      rawEntries,
      currentUserId,
      currentUsername
    );

    return { entries, userEntry };
  }

  private getKeys(period: 'daily' | 'weekly', postId?: string) {
    if (period === 'weekly') {
      const weekKey = getCurrentWeekKey();
      return {
        leaderboardKey: `weekly_leaderboard:${weekKey}`,
        timeKey: `weekly_times:${weekKey}`,
      };
    }
    return postId
      ? { leaderboardKey: `daily_leaderboard:${postId}`, timeKey: `daily_times:${postId}` }
      : { leaderboardKey: null, timeKey: null };
  }

  private async getTopEntries(
    leaderboardKey: string,
    timeKey: string,
    fetchLimit: number
  ) {
    const rawScores = await this.redis.zRange(leaderboardKey, 0, fetchLimit - 1, {
      by: 'rank',
      reverse: true,
    });

    const entries = await Promise.all(
      rawScores.map(async (entry) => {
        const storedTime = await this.redis.hGet(timeKey, entry.member);
        return {
          member: entry.member,
          score: Math.floor(entry.score),
          time: storedTime ? parseInt(storedTime, 10) : 0,
        };
      })
    );

    return entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time - b.time;
    });
  }

  private async resolveUserEntry(
    leaderboardKey: string,
    timeKey: string,
    sortedRawEntries: { member: string; score: number; time: number }[],
    userId?: string,
    username?: string
  ): Promise<LeaderboardEntry | null> {
    if (!userId) return null;

    const bufferIndex = sortedRawEntries.findIndex((e) => e.member.endsWith(`::${userId}`));

    if (bufferIndex !== -1) {
      const entry = sortedRawEntries[bufferIndex]!;
      return {
        username: entry.member.split('::')[0] ?? 'Matey',
        score: entry.score,
        time: entry.time,
        rank: bufferIndex + 1,
      };
    }

    const memberKey = `${username}::${userId}`;
    const [score, timeRaw, rank] = await Promise.all([
      this.redis.zScore(leaderboardKey, memberKey),
      this.redis.hGet(timeKey, memberKey),
      this.redis.zRank(leaderboardKey, memberKey),
    ]);

    if (score === undefined || rank === undefined) return null;

    const totalCount = await this.redis.zCard(leaderboardKey);

    return {
      username: username ?? 'Matey',
      score: Math.floor(score),
      time: timeRaw ? parseInt(timeRaw, 10) : 0,
      rank: totalCount - rank,
    };
  }
}
