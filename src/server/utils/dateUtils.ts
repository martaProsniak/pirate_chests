import { endOfISOWeek, format, getISOWeek, getISOWeekYear, parse, startOfISOWeek } from 'date-fns';

const POST_DATE_FORMAT = 'd MMM, yyyy';

export const getFormattedDate = (date: Date = new Date()): string => {
  return format(date, POST_DATE_FORMAT);
};

const parsePostDate = (dateString: string): Date => {
  return parse(dateString, POST_DATE_FORMAT, new Date());
};

export const getWeekKey = (dateString: string): string => {
  const date = parsePostDate(dateString);

  const week = getISOWeek(date);
  const year = getISOWeekYear(date);

  const formattedWeek = week.toString().padStart(2, '0');

  return `${year}-W${formattedWeek}`;
};

export const getDateLabel = (period: 'daily' | 'weekly', dateString: string): string => {
  const date = parsePostDate(dateString);

  if (period === 'daily') {
    return format(date, 'MMM d');
  }

  const start = startOfISOWeek(date);
  const end = endOfISOWeek(date);

  return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
};

export const extractDateFromTitle = (title: string): string => {
  const dateRegex = /(\d{1,2} [A-Za-z]+, \d{4})$/;
  const match = title.match(dateRegex);

  return match ? match[0] : '';
};
