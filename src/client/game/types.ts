export type TreasureKind = 'chest' | 'gold' | 'bomb';

export interface Treasure {
  row: number;
  col: number;
  kind: TreasureKind;
}

export interface MatrixClue {
  isTreasure: false;
  nearestTreasure: TreasureKind | null;
  value: string;
  isHighlighted?: false;
}

export interface MatrixTreasure {
  isTreasure: true;
  isHighlighted?: boolean;
  value: TreasureKind;
}

export type MatrixItem = {
  isRevealed: boolean;
} & (
  | MatrixClue
  | MatrixTreasure
  );
