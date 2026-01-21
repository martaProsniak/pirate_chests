import { useState, useEffect } from 'react';
import { config } from '../game/config';
import { MatrixItem, Treasure, TreasureKind } from '../game/types';

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
    const totalCells = rowsCount * colsCount;
    const allIndices = Array.from({ length: totalCells }, (_, i) => i);

    const shuffledIndices = shuffleArray(allIndices);

    const newTreasures: Treasure[] = treasures.map((kind, index) => {
      const gridIndex = shuffledIndices[index]!;

      return {
        row: Math.floor(gridIndex / colsCount),
        col: gridIndex % colsCount,
        kind: kind
      };
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
            isTreasure: true
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

    if (currentCell.isTreasure) {
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
      revealTreasures();
      setIsEnd(true);
    }

    setMoves(leftMoves);
  };

  const revealTreasures = () =>{
    const newMatrix = matrix.map((row) => {
      return row.map((cell) => {
        if (cell.isTreasure) {
          return {...cell, isRevealed: true, isHighlighted: true };
        }
        return cell;
      })
    });

    setMatrix(newMatrix);
  }

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
    handleCellClick,
    totalTreasures: treasures.length,
  };
};
