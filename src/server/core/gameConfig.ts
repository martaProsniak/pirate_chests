import { GameConfig } from '../../shared/types/game';

export const CONFIG: GameConfig = {
  base: {
    rowsCount: 6,
    colsCount: 6,
    maxMoves: 9,
    treasures: {
      chest: 1,
      gold: 3,
      bomb: 1,
      coconut: 1,
    },
  },
};
