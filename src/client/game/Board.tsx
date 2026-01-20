import {useState, useEffect} from 'react';
import {colsCount, rowsCount} from './config';

export const Board = () => {
  const [matrix, setMatrix] = useState<string[][]>([]);

  const treasures = [
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
      return treasures.reduce((acc, curr) => {
        const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
        if (acc.minDistance > distance) {
          acc.minDistance = distance;
          acc.treasure = curr;
        }
        return acc;
      }, {minDistance: rowsCount + 1, treasure: {}});
  }

  useEffect(() => {
    const createMatrix = () => {
      const empty_matrix = Array.from(Array(rowsCount).keys()).map(() => Array.from(Array(colsCount).keys()).map(() => null));
      const filledMatrix = empty_matrix.map((row, rowIndex) => {
        return row.map((_cell, colIndex) => {
          const treasure = treasures.find((treasure) => treasure.row === rowIndex && treasure.col === colIndex);
          if (treasure) {
            return treasure.kind;
          }
          const fieldInfo = findNearestTreasure(rowIndex, colIndex);
          return `${fieldInfo.minDistance}`;
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
            return <div className="w-10 bg-pink-500">{cell}</div>;
          })}
        </div>
      })}
    </div>
  )
}
