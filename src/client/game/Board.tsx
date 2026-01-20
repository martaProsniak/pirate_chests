import {useState, useEffect} from 'react';
import {colsCount, rowsCount} from './config';

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

export const Board = () => {
  const [matrix, setMatrix] = useState<MatrixItem[][]>([]);

  const treasures: Treasure[] = [
    {
      row: 2,
      col: 0,
      kind: 'chest'
    },
    {
      row: 4,
      col: 2,
      kind: 'gold'
    },
    {
      row: 1,
      col: 3,
      kind: 'gold'
    }
  ];

  const findNearestTreasure = (row: number, col: number) => {
      return treasures.reduce((acc: {minDistance: number, treasure: null | TreasureKind}, curr) => {
        const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
        if (acc.minDistance > distance) {
          acc.minDistance = distance;
          acc.treasure = curr.kind;
        }
        return acc;
      }, {minDistance: rowsCount + colsCount, treasure: null});
  }

  useEffect(() => {
    const createMatrix = () => {
      const empty_matrix = Array.from(Array(rowsCount).keys()).map(() => Array.from(Array(colsCount).keys()).map(() => null));
      const filledMatrix: MatrixItem[][] = empty_matrix.map((row, rowIndex) => {
        return row.map((_cell, colIndex) => {
          const treasure = treasures.find((treasure) => treasure.row === rowIndex && treasure.col === colIndex);
          if (treasure) {
            return {
              value: (treasure.kind as string),
              isRevealed: false,
              nearestTreasure: treasure.kind
            };
          }
          const fieldInfo = findNearestTreasure(rowIndex, colIndex);
          return {
            value: fieldInfo.minDistance.toString(),
            isRevealed: false,
            nearestTreasure: fieldInfo.treasure,
          };
        })
      });

      setMatrix(filledMatrix);
    }

    createMatrix();
  }, [])

  return (
    <div className="flex flex-col flex-nowrap gap-1">
      {matrix.map((row) => {
        return <div className="flex flex-row flex-nowrap gap-1">
          {row.map((cell) => {
            return <div className="w-10 bg-pink-500">{cell.value}</div>;
          })}
        </div>
      })}
    </div>
  )
}
