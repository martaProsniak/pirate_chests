export type TreasureKind = 'chest' | 'gold' | 'fish' | 'bomb';

export type FindingsMap = {
  [key in TreasureKind]: number;
};

export interface Treasure {
  row: number;
  col: number;
  kind: TreasureKind;
}

/**
 * MATRIX
 */
export interface MatrixClue {
  isTreasure: false;
  nearestTreasure: TreasureKind;
  value: string;
  isHighlighted?: false;
  bombs: number;
}

export interface MatrixTreasure {
  isTreasure: true;
  isHighlighted?: boolean;
  value: TreasureKind;
  bombs: 0;
}

export type MatrixItem = {
  isRevealed: boolean;
} & (MatrixClue | MatrixTreasure);


/**
 * CONFIG
 */
export type Difficulty = 'base'

export type GameConfigItem = {
  rowsCount: number;
  colsCount: number;
  maxMoves: number;
  treasures: {
    [key in TreasureKind]: number;
  };
}

export type GameConfig = {
  [key in Difficulty]: GameConfigItem;
};
