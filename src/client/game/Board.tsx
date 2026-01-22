import { requestExpandedMode } from '@devvit/web/client';
import { Tile } from './Tile';
import { useGame } from '../hooks/useGame';
import { Modal } from '../UI/Modal/Modal';
import { useEffect, useState } from 'react';
import { GameProgress } from './GameProgress';
import { Actions } from './Actions';

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
    handleCellClick,
    totalTreasures,
    treasuresFound
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
    <div className="relative overflow-hidden">
      <div className="max-w-[368px] md:max-w-[440px] flex flex-col items-center gap-5 py-4 px-2">
        <div className="relative z-10 flex w-full items-end justify-between gap-x-3">
          <GameProgress
            moves={moves}
            treasuresFound={treasuresFound}
            totalTreasures={totalTreasures}
          />

          <Actions
            onRestart={startGame}
            onFullscreen={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            showFullscreenButton={fullScreenBtn}
          />
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
