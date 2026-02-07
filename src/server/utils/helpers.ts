export const parseRedisInt = (val: string | undefined | null): number => {
  return val ? parseInt(val, 10) : 0;
};

export const getUserStats = (statsRaw: Record<string, string>) => {
  return {
    score: parseRedisInt(statsRaw?.totalScore),
    gamesPlayed: parseRedisInt(statsRaw?.gamesPlayed),
    wins: parseRedisInt(statsRaw?.wins),
    findings: {
      chest: parseRedisInt(statsRaw?.findings_chests),
      gold: parseRedisInt(statsRaw?.findings_gold),
      coconut: parseRedisInt(statsRaw?.findings_coconut),
      bomb: parseRedisInt(statsRaw?.findings_bombs),
    },
  };
};
