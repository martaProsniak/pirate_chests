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

  const commentLines = [
    '**Ahoy Captains!** 🏴‍☠️',
    '',
    "Today's map is ready for exploration. Remember the Pirate Code:",
    '- Moves are limited by your Rum supply.',
    '- Watch out for bombs!',
    '- Only one attempt per day counts for the leaderboard.',
    '',
    'Good luck and may your chest be full of gold!',
    '',
    '---',
    '*Credits:*',
    '*Game Assets designed by Freepik.*',
  ];

  const commentText = commentLines.join('\n');

  const post = await reddit.submitCustomPost({
    subredditName: subredditName,
    title: title,
  });

  const comment = await reddit.submitComment({
    id: post.id,
    text: commentText,
  });

  try {
    await comment.distinguish(true); // true = sticky
  } catch (e) {
    console.warn('Could not sticky comment. App might lack mod permissions.', e);
  }

  return post;
};
