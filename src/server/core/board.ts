import { Difficulty, MatrixItem, TreasureKind } from '../../shared/types/game';
import { Treasure } from '../../shared/types/game';
import { CONFIG } from './game-config';

interface NearestTreasure {
  minDistance: number;
  treasure: TreasureKind
}

const findNearestTreasure = (row: number, col: number, currentTreasures: Treasure[], initialDistance: number): NearestTreasure => {
  return <NearestTreasure>currentTreasures.reduce(
    (acc: { minDistance: number; treasure: TreasureKind | null }, curr) => {
      if (curr.kind === 'bomb') {
        return acc;
      }

      const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
      if (acc.minDistance > distance) {
        acc.minDistance = distance;
        acc.treasure = curr.kind;
      }

      return acc;
    },
    { minDistance: initialDistance, treasure: null }
  );
};

const countBombsNearby = (row: number, col: number, currentTreasures: Treasure[]) => {
  return currentTreasures.filter(({kind}) => kind === 'bomb').reduce((acc, curr) => {
    if ((curr.row === row + 1) && (curr.col === col)) {
      acc++;
    }
    if ((curr.row === row - 1) && (curr.col === col)) {
      acc++;
    }
    if ((curr.col === col + 1) && (curr.row === row)) {
      acc++;
    }
    if ((curr.col === col - 1) && (curr.row === row)) {
      acc++;
    }
    return acc;
  }, 0)
}

const shuffleArray = (array: number[]): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i]!;
    newArray[i] = newArray[j]!;
    newArray[j] = temp;
  }
  return newArray;
};

export const generateBoard = (difficulty: Difficulty = 'base'): MatrixItem[][] => {
  const { rowsCount, colsCount, treasures } = CONFIG[difficulty];

  const getShuffledTreasures = () : Treasure[] => {
    const totalCells = rowsCount * colsCount;
    const allIndices = Array.from({ length: totalCells }, (_, i) => i);

    const shuffledIndices = shuffleArray(allIndices);

    const treasuresArray = (Object.keys(treasures) as TreasureKind[]).reduce((acc: TreasureKind[], key: TreasureKind) => {
      const temp = Array.from({length: treasures[key]}).fill(key) as TreasureKind[];
      return acc.concat(temp);
    }, []);

    return treasuresArray.map((kind, index) => {
      const gridIndex = shuffledIndices[index]!;
      return {
        row: Math.floor(gridIndex / colsCount),
        col: gridIndex % colsCount,
        kind: kind
      };
    });
  }

  const shuffledTreasures = getShuffledTreasures();

  const empty_matrix = Array.from(Array(rowsCount).keys()).map(() =>
    Array.from(Array(colsCount).keys()).map(() => null)
  );

  let maxDistance = 0;
  let farItem = {row: 0, col: 0};

  const filledMatrix: MatrixItem[][] = empty_matrix.map((row, rowIndex) => {
    return row.map((_cell, colIndex) => {
      const treasure = shuffledTreasures.find((t) => t.row === rowIndex && t.col === colIndex);

      if (treasure) {
        return {
          isTreasure: true,
          value: treasure.kind,
          isRevealed: false,
          bombs: 0
        };
      }

      const fieldInfo = findNearestTreasure(rowIndex, colIndex, shuffledTreasures, rowsCount + colsCount);
      const bombs = countBombsNearby(rowIndex, colIndex, shuffledTreasures);

      if (fieldInfo.minDistance >= maxDistance && bombs === 0) {
        maxDistance = fieldInfo.minDistance;
        farItem = {row: rowIndex, col: colIndex};
      }

      return {
        value: fieldInfo.minDistance.toString(),
        isRevealed: false,
        nearestTreasure: fieldInfo.treasure,
        bombs: bombs,
        isTreasure: false,
      };
    });
  });

  filledMatrix[farItem.row]![farItem.col]!.isRevealed = true;

  return filledMatrix;
}
