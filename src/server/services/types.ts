export interface SimpleRedis {
  get(key: string): Promise<string | undefined | null>;
  set(key: string, value: string, options?: { expiration?: Date }): Promise<unknown>;
}

export interface ILeaderboardRedis {
  zAdd(key: string, options: { member: string; score: number }): Promise<number>;
  zIncrBy(key: string, member: string, increment: number): Promise<number>;
  zRange(
    key: string,
    min: number,
    max: number,
    options?: { by?: 'rank' | 'score' | 'lex'; reverse?: boolean }
  ): Promise<{ member: string; score: number }[]>;
  zRank(key: string, member: string): Promise<number | undefined>;
  zCard(key: string): Promise<number>;
  zScore(key: string, member: string): Promise<number | undefined>;
}
