import { TreasureKind } from '../../shared/types/game';

export type Difficulty = 'base'

export type ConfigItem = {
  rowsCount: number;
  colsCount: number;
  maxMoves: number;
  treasures: {
    [key in TreasureKind]: number;
  };
}

export type Config = {
  [key in Difficulty]: ConfigItem;
};

export const config: Config = {
  base: {
    rowsCount: 6,
    colsCount: 6,
    maxMoves: 10,
    treasures: {
      chest: 1,
      gold: 2,
      bomb: 3
    }
  }
}
