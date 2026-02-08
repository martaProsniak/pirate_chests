import { endOfISOWeek, format, getISOWeek, getISOWeekYear, startOfISOWeek } from 'date-fns';

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

export const getDateLabel = (period: 'daily' | 'weekly'): string => {
  const now = new Date();

  if (period === 'daily') {
    return format(now, 'MMM d');
  }

  const start = startOfISOWeek(now);
  const end = endOfISOWeek(now);

  return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
};
