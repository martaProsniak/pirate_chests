export type TreasureKind = 'chest' | 'gold' | 'fish' | 'bomb';

export type FindingsMap = {
  [key in TreasureKind]: number;
};
