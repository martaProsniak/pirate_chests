import { Difficulty, MatrixItem } from '../../shared/types/game';
import { CONFIG } from './game-config';
import {
  generateShuffledTreasures,
  findNearestTreasure,
  countBombsNearby,
  RandomGenerator
} from '../utils/boardGenerator';

export const generateBoard = (difficulty: Difficulty = 'base', random: RandomGenerator = Math.random): MatrixItem[][] => {
  const { rowsCount, colsCount, treasures } = CONFIG[difficulty];

  const shuffledTreasures = generateShuffledTreasures(rowsCount, colsCount, treasures, random);

  const emptyMatrix = Array.from({ length: rowsCount }).map(() =>
    Array.from({ length: colsCount }).map(() => null)
  );

  let maxDistance = 0;
  let farItem = { row: 0, col: 0 };

  const filledMatrix: MatrixItem[][] = emptyMatrix.map((row, rowIndex) => {
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
        farItem = { row: rowIndex, col: colIndex };
      }

      return {
        value: fieldInfo.minDistance.toString(),
        isRevealed: false,
        nearestTreasure: fieldInfo.treasure!,
        bombs: bombs,
        isTreasure: false,
      };
    });
  });

  if (filledMatrix[farItem.row]?.[farItem.col]) {
    filledMatrix[farItem.row]![farItem.col]!.isRevealed = true;
  }

  return filledMatrix;
};
