export const MAX_TIME_CONSTANT = 100000;

export const calculateCompositeScore = (score: number, time: number): number => {
  const timeFraction = 1 - Math.min(time, MAX_TIME_CONSTANT) / MAX_TIME_CONSTANT;
  return score + timeFraction;
};
