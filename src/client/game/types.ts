export type TreasureKind = 'chest' | 'gold' | 'bomb';

export interface Treasure {
  row: number;
  col: number;
  kind: TreasureKind;
}

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
} & (
  | MatrixClue
  | MatrixTreasure
  );
