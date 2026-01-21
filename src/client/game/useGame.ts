import { useState, useEffect } from 'react';
import { config } from './config';
import { MatrixItem, Treasure, TreasureKind } from './types';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const findNearestTreasure = (row: number, col: number, currentTreasures: Treasure[], rows: number, cols: number) => {
  return currentTreasures.reduce(
    (acc: { minDistance: number; treasure: null | TreasureKind }, curr) => {
      const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
      if (acc.minDistance > distance) {
        acc.minDistance = distance;
        acc.treasure = curr.kind;
      }
      return acc;
    },
    { minDistance: rows + cols, treasure: null }
  );
};

export const useGame = (initialDifficulty: 'base' = 'base') => {
  // State
  const [difficulty] = useState(initialDifficulty);
  const { rowsCount, colsCount, maxMoves, treasures } = config[difficulty];

  const [matrix, setMatrix] = useState<MatrixItem[][]>([]);
  const [moves, setMoves] = useState<number>(maxMoves);
  const [isEnd, setIsEnd] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState<number>(0);
  const [isWin, setIsWin] = useState(false);

  // Actions
  const resetState = () => {
    setIsEnd(false);
    setIsWin(false);
    setMoves(maxMoves);
    setTreasuresFound(0);
  };

  const startGame = () => {
    const newTreasures: Treasure[] = [];

    treasures.forEach((kind) => {
      let placed = false;
      while (!placed) {
        const randomRow = getRandomInt(rowsCount);
        const randomCol = getRandomInt(colsCount);
        const isOccupied = newTreasures.some((t) => t.row === randomRow && t.col === randomCol);

        if (!isOccupied) {
          newTreasures.push({ row: randomRow, col: randomCol, kind });
          placed = true;
        }
      }
    });

    const empty_matrix = Array.from(Array(rowsCount).keys()).map(() =>
      Array.from(Array(colsCount).keys()).map(() => null)
    );

    const filledMatrix: MatrixItem[][] = empty_matrix.map((row, rowIndex) => {
      return row.map((_cell, colIndex) => {
        const treasure = newTreasures.find((t) => t.row === rowIndex && t.col === colIndex);

        if (treasure) {
          return {
            value: treasure.kind as string,
            isRevealed: false,
            nearestTreasure: treasure.kind,
          };
        }

        const fieldInfo = findNearestTreasure(rowIndex, colIndex, newTreasures, rowsCount, colsCount);
        return {
          value: fieldInfo.minDistance.toString(),
          isRevealed: false,
          nearestTreasure: fieldInfo.treasure,
        };
      });
    });

    setMatrix(filledMatrix);
    resetState();
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEnd) return;

    const currentCell = matrix[rowIndex]?.[colIndex];
    if (!currentCell || currentCell.isRevealed) return;

    const newMatrix = matrix.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;
      return row.map((cell, cIndex) => {
        if (cIndex !== colIndex) return cell;
        return { ...cell, isRevealed: true };
      });
    });

    setMatrix(newMatrix);

    if (currentCell.value === 'chest' || currentCell.value === 'gold') {
      const updatedFound = treasuresFound + 1;
      setTreasuresFound(updatedFound);

      if (updatedFound === treasures.length) {
        setIsEnd(true);
        setIsWin(true);
        return;
      }
    }

    const leftMoves = moves - 1;
    if (leftMoves === 0) {
      setIsEnd(true);
    }
    setMoves(leftMoves);
  };

  useEffect(() => {
    startGame();
  }, []);

  return {
    matrix,
    moves,
    isEnd,
    isWin,
    treasuresFound,
    startGame,
    handleCellClick
  };
};
