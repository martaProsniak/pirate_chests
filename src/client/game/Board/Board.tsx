import { Tile } from './Tile';
import { MatrixItem } from '../../../shared/types/game';

export interface BoardProps {
  matrix: MatrixItem[][];
  onClick: (row: number, col: number) => void;
}

export const Board = ({ matrix, onClick }: BoardProps) => {
  return (
    <div
      className="relative z-10 flex flex-col gap-1 shrink-0"
      style={{
        borderImageSource: 'url("/images/board.png")',
        borderImageSlice: '200 fill',
        borderWidth: '36px',
        borderStyle: 'solid',
        background: 'none',
      }}
    >
      <div className="w-full">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                item={cell}
                row={rowIndex}
                col={colIndex}
                onClick={() => onClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
