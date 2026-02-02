import { reddit } from '@devvit/web/server';

export const createDailyPost = async (subredditName: string) => {
  const title = '🏴‍☠️ Uncharted Isle Spotted! - Daily Pirate Chest Challenge'

  return await reddit.submitCustomPost({
    subredditName: subredditName,
    title: title,
  });
};
