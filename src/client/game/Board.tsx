import { requestExpandedMode } from '@devvit/web/client';
import { Tile } from './Tile';
import { useGame } from './useGame';

export interface BoardProps {
  fullScreenBtn?: boolean;
}

export const Board = ({ fullScreenBtn = false }: BoardProps) => {
  const {
    matrix,
    moves,
    isEnd,
    isWin,
    startGame,
    handleCellClick
  } = useGame('base');

  return (
    <div className="flex flex-col items-center gap-4 p-3">
      <div className="flex flex-col flex-nowrap gap-1 bg-gray-200 p-2 rounded-lg">
        {matrix.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex flex-row flex-nowrap gap-1">
              {row.map((cell, colIndex) => {
                return <Tile key={`${rowIndex}-${colIndex}`} item={cell} onClick={() => handleCellClick(rowIndex, colIndex)} />;
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
