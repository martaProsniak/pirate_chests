import {useState, useEffect} from 'react';
import {colsCount, rowsCount} from './config';
import { requestExpandedMode } from '@devvit/web/client';

export type TreasureKind = 'chest' |'gold';

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

export const Board = ({fullScreenBtn = false}: BoardProps) => {
  const [matrix, setMatrix] = useState<MatrixItem[][]>([]);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const findNearestTreasure = (row: number, col: number, currentTreasures: Treasure[]) => {
    return currentTreasures.reduce((acc: { minDistance: number, treasure: null | TreasureKind }, curr) => {
      const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
      if (acc.minDistance > distance) {
        acc.minDistance = distance;
        acc.treasure = curr.kind;
      }
      return acc;
    }, { minDistance: rowsCount + colsCount, treasure: null });
  };

  const startGame = () => {
    const newTreasures: Treasure[] = [];
    const treasuresToPlace: TreasureKind[] = ['chest', 'gold', 'gold'];

    treasuresToPlace.forEach((kind) => {
      let placed = false;
      while (!placed) {
        const randomRow = getRandomInt(rowsCount);
        const randomCol = getRandomInt(colsCount);

        const isOccupied = newTreasures.some(
          (t) => t.row === randomRow && t.col === randomCol
        );

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
        const treasure = newTreasures.find(
          (t) => t.row === rowIndex && t.col === colIndex
        );

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
  };

  useEffect(() => {
    startGame();
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 p-4">
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
                      w-10 h-10 flex items-center justify-center 
                      font-bold rounded-sm select-none
                      ${cell.isRevealed ? 'bg-indigo-300' : 'bg-indigo-500 cursor-pointer hover:bg-indigo-400'}
                    `}
                  >
                    {cell.isRevealed ? cell.value : ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-4">
        <button
          onClick={startGame}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-md transition-colors duration-200 active:scale-95"
        >
          New Game
        </button>

        {fullScreenBtn && (
          <button
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-md transition-colors duration-200 active:scale-95"
          >
            Full Screen
          </button>
        )}
      </div>
    </div>
  )
}
