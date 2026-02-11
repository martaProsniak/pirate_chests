import { endOfISOWeek, format, getISOWeek, getISOWeekYear, parse, startOfISOWeek, isValid } from 'date-fns';
import { enUS } from 'date-fns/locale';

const POST_DATE_FORMAT = 'd MMM, yyyy';

export const getFormattedDate = (date: Date = new Date()): string => {
  return format(date, POST_DATE_FORMAT, { locale: enUS });
};

const parsePostDate = (dateString: string): Date => {
  if (!dateString) throw new Error('Date string is empty');
  let date = parse(dateString, POST_DATE_FORMAT, new Date(), { locale: enUS });

  if (!isValid(date)) {
    date = new Date(dateString);
  }

  if (!isValid(date)) {
    console.error(`CRITICAL: Failed to parse date: ${dateString}`);
    throw new Error(`Invalid date format: ${dateString}`);
  }

  return date;
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
    return format(date, 'MMM d', { locale: enUS });
  }

  const start = startOfISOWeek(date);
  const end = endOfISOWeek(date);

  return `${format(start, 'MMM d', { locale: enUS })} - ${format(end, 'MMM d', { locale: enUS })}`;
};

export const extractDateFromTitle = (title: string): string => {
  const dateRegex = /(\d{1,2} [A-Za-z]+, \d{4})$/;
  const match = title.match(dateRegex);
  return match ? match[0] : '';
};
