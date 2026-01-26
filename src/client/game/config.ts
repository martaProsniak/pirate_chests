import { TreasureKind } from './types';

export type Difficulty = 'base'

export type ConfigItem = {
  rowsCount: number;
  colsCount: number;
  maxMoves: number;
  treasures: TreasureKind[];
  bombsCount: number;
}

export type Config = {
  [key in Difficulty]: ConfigItem;
};

export const config: Config = {
  base: {
    rowsCount: 6,
    colsCount: 6,
    maxMoves: 10,
    treasures: ['chest', 'gold', 'gold'],
    bombsCount: 0,
  }
}
