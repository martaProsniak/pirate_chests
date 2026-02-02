import { generateBoard } from '../core/board';
import { createSeededGenerator } from '../utils/seededRandom';
import { MatrixItem } from '../../shared/types/game';
import { SimpleRedis } from './types';

const BOARD_CACHE_TTL = 1000 * 60 * 60 * 24 * 180; // 6 months

export const getOrCreateDailyBoard = async (
  redis: SimpleRedis,
  postId: string
): Promise<MatrixItem[][]> => {
  const boardKey = `daily_board:${postId}`;

  const cachedMatrixJson = await redis.get(boardKey);

  if (cachedMatrixJson) {
    return JSON.parse(cachedMatrixJson);
  }

  const seededRandom = createSeededGenerator(postId);
  const newMatrix = generateBoard('base', seededRandom);

  const expirationDate = new Date(Date.now() + BOARD_CACHE_TTL);
  await redis.set(boardKey, JSON.stringify(newMatrix), { expiration: expirationDate });

  return newMatrix;
};
