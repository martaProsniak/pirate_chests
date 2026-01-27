import { Router } from 'express';
import { createPost } from '../core/post';
import { context } from '@devvit/web/server';

const router = Router();

router.post('/internal/on-app-install', async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: 'success', message: `Post created: ${post.id}` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'error' });
  }
});

router.post('/internal/menu/post-create', async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'error' });
  }
});

export default router;
