export type TreasureKind = 'chest' | 'gold' | 'bomb';

export type FindingsMap = {
  [key in TreasureKind]: number;
};
