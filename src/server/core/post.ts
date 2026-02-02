import { reddit } from '@devvit/web/server';

/**
 * Returns the current date formatted as 'DD MMM, YYYY' (e.g., '16 Feb, 2026').
 */
const getFormattedDate = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const createDailyPost = async (subredditName: string) => {
  const dateString = getFormattedDate();
  const title = `🏴‍☠️ Mystery Land Spotted! - Pirate Chest: ${dateString}`;

  return await reddit.submitCustomPost({
    subredditName: subredditName,
    title: title,
  });
}
