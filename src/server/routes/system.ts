import { Router } from 'express';
import { createDailyPost } from '../core/post';
import { context, reddit } from '@devvit/web/server';

const router = Router();

router.post('/internal/on-app-install', async (_req, res) => {
  try {
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await createDailyPost(subreddit.name);
    res.json({ status: 'success', message: `Install Post created: ${post.id}` });
  } catch (error) {
    console.error('Install Error:', error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/internal/cron/daily-challenge', async (_req, res) => {
  console.log('Running Daily Challenge Cron Job...');
  try {
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await createDailyPost(subreddit.name);
    console.log(`Daily Challenge posted via Scheduler: ${post.id}`);
    res.json({ status: 'success', postId: post.id });
  } catch (error) {
    console.error('Scheduler Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to create daily post' });
  }
});

router.post('/internal/menu/post-create', async (_req, res) => {
  try {
    const post = await createDailyPost(context.subredditName || '');

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
      showToast: { text: 'Daily Challenge Created! 🏴‍☠️', appearance: 'success' }
    });
  } catch (error) {
    console.error('Menu Action Error:', error);
    res.status(500).json({
      status: 'error',
      showToast: { text: 'Failed to create post', appearance: 'neutral' }
    });
  }
});

export default router;
