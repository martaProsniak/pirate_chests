export type TreasureKind = 'chest' | 'gold';

export interface Treasure {
  row: number;
  col: number;
  kind: TreasureKind;
}

export interface MatrixItem {
  value: string;
  isRevealed: boolean;
  nearestTreasure?: TreasureKind | null;
  isTreasure?: boolean;
  isHighlighted?: boolean;
}
