import { FindingsMap } from '../types/game';

export const pointsMap: FindingsMap = {
  chest: 150,
  gold: 50,
  coconut: 25,
  bomb: 0,
};

export const movesMap: FindingsMap = {
  chest: 3,
  gold: 1,
  coconut: 1,
  bomb: 0,
};

export const RUM_POINTS = 10;
export const FALLBACK_GRID_SIZE = 6;
