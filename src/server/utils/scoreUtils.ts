import { getISOWeek, getISOWeekYear } from 'date-fns';

export const MAX_TIME_CONSTANT = 100000;

export const calculateCompositeScore = (score: number, time: number): number => {
  const timeFraction = 1 - Math.min(time, MAX_TIME_CONSTANT) / MAX_TIME_CONSTANT;
  return score + timeFraction;
};

export const getCurrentWeekKey = (): string => {
  const now = new Date();

  const week = getISOWeek(now);
  const year = getISOWeekYear(now);

  const formattedWeek = week.toString().padStart(2, '0');

  return `${year}-W${formattedWeek}`;
};
