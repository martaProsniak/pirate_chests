export const getTodayKey = () => new Date().toISOString().split('T')[0];

export const generateRandomId = () => Math.random().toString(36).substring(2, 15);

export const parseRedisInt = (val: string | undefined | null): number => {
  return val ? parseInt(val, 10) : 0;
};
