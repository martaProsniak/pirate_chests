import { requestExpandedMode } from '@devvit/web/client';
import { Tile } from './Tile';
import { useGame } from '../hooks/useGame';
import { Modal } from '../UI/Modal/Modal';
import { FullScreenIcon } from '../UI/icons';
import { useEffect, useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isEnd) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isEnd]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRestart = () => {
    startGame();
  };

  return (
    <div className="font-pirate flex flex-col items-center justify-center min-h-[500px] w-full gap-5 py-4 px-2 bg-slate-800 rounded-xl relative overflow-hidden">

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative z-10 flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-4 py-1.5 rounded-lg cursor-default">
        <span className="text-slate-400 text-lg font-bold uppercase tracking-widest">Rum Left</span>
        <div className={`text-xl font-black ${moves <= 3 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
          {moves}
        </div>
      </div>

      <div className="relative z-10 p-3 bg-amber-200 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-4 border-amber-800/50">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 sm:gap-1.5">
              {row.map((cell, colIndex) => (
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  item={cell}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  highlighted={cell.isHighlighted}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-1">
        {fullScreenBtn && (
          <button
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            className="
              flex items-center gap-2 px-4 py-2
              bg-cyan-600 hover:bg-cyan-500
              text-white font-bold text-xs uppercase tracking-wider
              border-b-4 border-cyan-800 active:border-b-0 active:translate-y-1
              rounded-lg shadow-md transition-all
            "
          >
            <FullScreenIcon />
            Full Screen
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleRestart={handleRestart}
      >
        <h3 className={`font-pirate text-base mb-1 drop-shadow-sm ${isWin ? 'text-emerald-700' : 'text-red-800'}`}>
          {isWin ? "Victory!" : "Game Over"}
        </h3>
        <p className="opacity-90">
          {isWin
            ? "You found all the treasures! You'rrgh rich!"
            : "Out of rum! Other pirates found the treasures!"
          }
        </p>
      </Modal>
    </div>
  );
};
