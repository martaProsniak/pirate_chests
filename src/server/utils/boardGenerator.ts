import { Treasure, TreasureKind } from '../../shared/types/game';

export type RandomGenerator = () => number;

interface NearestTreasure {
  minDistance: number;
  treasure: TreasureKind | null;
}

export const findNearestTreasure = (
  row: number,
  col: number,
  currentTreasures: Treasure[],
  initialDistance: number
): NearestTreasure => {
  return currentTreasures.reduce<NearestTreasure>(
    (acc, curr) => {
      if (curr.kind === 'bomb') {
        return acc;
      }

      const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
      if (acc.minDistance > distance) {
        return { minDistance: distance, treasure: curr.kind };
      }

      return acc;
    },
    { minDistance: initialDistance, treasure: null }
  );
};

export const countBombsNearby = (
  row: number,
  col: number,
  currentTreasures: Treasure[]
): number => {
  return currentTreasures
    .filter(({ kind }) => kind === 'bomb')
    .reduce((acc, curr) => {
      const isAdjacent =
        (curr.row === row + 1 && curr.col === col) ||
        (curr.row === row - 1 && curr.col === col) ||
        (curr.col === col + 1 && curr.row === row) ||
        (curr.col === col - 1 && curr.row === row);

      return isAdjacent ? acc + 1 : acc;
    }, 0);
};

export const shuffleArray = (array: number[], random: RandomGenerator): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = newArray[i]!;
    newArray[i] = newArray[j]!;
    newArray[j] = temp;
  }
  return newArray;
};

export const generateShuffledTreasures = (
  rowsCount: number,
  colsCount: number,
  treasuresConfig: Record<TreasureKind, number>,
  random: RandomGenerator
): Treasure[] => {
  const totalCells = rowsCount * colsCount;
  const allIndices = Array.from({ length: totalCells }, (_, i) => i);

  const shuffledIndices = shuffleArray(allIndices, random);

  const treasuresArray = (Object.keys(treasuresConfig) as TreasureKind[]).reduce(
    (acc: TreasureKind[], key: TreasureKind) => {
      const temp = Array.from({ length: treasuresConfig[key] }).fill(key) as TreasureKind[];
      return acc.concat(temp);
    },
    []
  );

  return treasuresArray.map((kind, index) => {
    const gridIndex = shuffledIndices[index]!;
    return {
      row: Math.floor(gridIndex / colsCount),
      col: gridIndex % colsCount,
      kind: kind,
    };
  });
};
