import { requestExpandedMode } from '@devvit/web/client';
import { Tile } from './Tile';
import { useGame } from './useGame';
import { Modal } from '../UI/Modal/Modal';

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

  const handleRestart = () => {
    startGame();
  };

  const modalFooterButton = (
    <button
      onClick={handleRestart}
      className="
        px-8 py-3
        bg-emerald-600 hover:bg-emerald-500
        text-white font-black uppercase tracking-wider
        border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1
        rounded-lg shadow-lg
        transition-all
      "
    >
      Play Again
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-6 p-4 relative">
      {/* Moves counter */}
      <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200 font-medium text-gray-700">
        Moves left: <span className={`font-bold ${moves <= 3 ? 'text-red-500' : 'text-indigo-600'}`}>{moves}</span>
      </div>

      {/* Board */}
      <div className="flex flex-col flex-nowrap gap-1 bg-gray-200 p-2 rounded-xl shadow-inner border border-gray-300">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row flex-nowrap gap-1">
            {row.map((cell, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                item={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-4 mt-2">
        {fullScreenBtn && (
          <button
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-sm transition-colors duration-200 flex items-center gap-2"
          >
            Full Screen
          </button>
        )}
      </div>

      <Modal
        isOpen={isEnd}
        onClose={handleRestart}
        title={isWin ? "🎉 Victory!" : "☠️ Game Over"}
        footer={modalFooterButton}
      >
        {isWin ? (
          <p>
            Congratulations! You found all the treasures using only your wits (and a metal detector).
            The island is clean!
          </p>
        ) : (
          <p>
            You ran out of moves! The treasure is still out there, hidden beneath the sand.
            Want to try another location?
          </p>
        )}
      </Modal>
    </div>
  );
};
