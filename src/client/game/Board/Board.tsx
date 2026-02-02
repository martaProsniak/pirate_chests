import { Tile } from '../Tile';
import { MatrixItem } from '../../../shared/types/game';

export interface BoardProps {
  matrix: MatrixItem[][],
  onClick: (row: number, col: number) => void,
}

export const Board = ({matrix, onClick}: BoardProps) => {
  return (
    <div className="relative z-10 p-10">
      <img
        src="/images/board.png"
        alt="Island map"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
      />

      <div className="relative flex flex-col gap-1">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                item={cell}
                onClick={() => onClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
