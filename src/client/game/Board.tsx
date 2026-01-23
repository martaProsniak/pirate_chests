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
      <div className="min-w-fit flex flex-col items-center gap-3 py-4 px-2">

        <div className="relative z-10 flex w-full items-end justify-between gap-x-3 px-6">
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

        <div className="relative z-10 p-10">
          <img
            src="/images/island.png"
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
                    onClick={() => handleCellClick(rowIndex, colIndex)}
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
