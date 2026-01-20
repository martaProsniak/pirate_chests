import { useState, useEffect } from 'react';
import { colsCount, rowsCount, maxMoves, treasureCount } from './config';
import { requestExpandedMode } from '@devvit/web/client';
import { ChestIcon, GoldIcon } from './icons';

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
}

export interface BoardProps {
  fullScreenBtn?: boolean;
}

export const Board = ({ fullScreenBtn = false }: BoardProps) => {
  const [matrix, setMatrix] = useState<MatrixItem[][]>([]);
  const [moves, setMoves] = useState<number>(maxMoves);
  const [isEnd, setIsEnd] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState<number>(0);
  const [isWin, setIsWin] = useState(false);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const findNearestTreasure = (row: number, col: number, currentTreasures: Treasure[]) => {
    return currentTreasures.reduce(
      (
        acc: {
          minDistance: number;
          treasure: null | TreasureKind;
        },
        curr
      ) => {
        const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
        if (acc.minDistance > distance) {
          acc.minDistance = distance;
          acc.treasure = curr.kind;
        }
        return acc;
      },
      { minDistance: rowsCount + colsCount, treasure: null }
    );
  };

  const startGame = () => {
    const newTreasures: Treasure[] = [];
    const treasuresToPlace: TreasureKind[] = ['chest', 'gold', 'gold'];

    treasuresToPlace.forEach((kind) => {
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

        const fieldInfo = findNearestTreasure(rowIndex, colIndex, newTreasures);
        return {
          value: fieldInfo.minDistance.toString(),
          isRevealed: false,
          nearestTreasure: fieldInfo.treasure,
        };
      });
    });

    setMatrix(filledMatrix);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEnd) {
      return;
    }

    const currentCell: MatrixItem = matrix[rowIndex]?.[colIndex] as MatrixItem;

    if (currentCell.isRevealed) return;

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

      if (updatedFound === treasureCount) {
        setIsEnd(true);
        setIsWin(true);
      }
    }
    const leftMoves = moves - 1;
    if (leftMoves === 0) {
      setIsEnd(true);
    } else {
      setMoves(leftMoves);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-3">
      <div className="flex flex-col flex-nowrap gap-1 bg-gray-200 p-2 rounded-lg">
        {matrix.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex flex-row flex-nowrap gap-1">
              {row.map((cell, colIndex) => {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
    w-9 h-9 flex items-center justify-center 
    font-bold rounded-sm select-none transition-all duration-200
    ${
      cell.isRevealed
        ? 'bg-indigo-200 shadow-inner'
        : 'bg-indigo-500 cursor-pointer hover:bg-indigo-400 shadow-md'
    }
  `}
                  >
                    {cell.isRevealed && (
                      <>
                        {cell.value === 'chest' && <ChestIcon />}
                        {cell.value === 'gold' && <GoldIcon />}
                        {cell.value !== 'chest' && cell.value !== 'gold' && (
                          <span className="text-indigo-900 text-lg">{cell.value}</span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        {!isEnd && <span>Moves left: {moves}</span>}
        {isEnd && !isWin && <span>No more moves!</span>}
        {isEnd && isWin && <span>You got all the treasures!</span>}
      </div>
      <div className="flex flex-row gap-4">
        <button
          onClick={startGame}
          className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full shadow-md transition-colors duration-200 active:scale-95"
        >
          New Game
        </button>

        {fullScreenBtn && (
          <button
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-md transition-colors duration-200 active:scale-95"
          >
            Full Screen
          </button>
        )}
      </div>
    </div>
  );
};
