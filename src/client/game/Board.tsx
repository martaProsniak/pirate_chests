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
    treasuresFound,
    wasBombed,
    bombsCount
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
      <div className="min-w-fit flex flex-col items-center gap-4 py-1 px-2">
        <div className="relative z-10 flex w-full items-center justify-center gap-x-1 px-4">
          <GameProgress
            moves={moves}
            treasuresFound={treasuresFound}
            totalTreasures={totalTreasures}
            bombs={bombsCount}
          />
        </div>

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
        <h3 className={`font-pirate text-lg mb-1 drop-shadow-sm ${isWin ? 'text-green-300' : 'text-red-300'}`}>
          {isWin ? "Victory!" : "Game Over!"}
        </h3>
        <p className="text-orange-200 text-base">
          {isWin && "You found all the treasures! You'rrgh rich!"}
          {wasBombed ?
            "Bloody rats! Bomb exploded right to yarrrgh face! Better luck next time."
            :
            "Out of rum! Other pirates found the treasures!"
          }
        </p>
      </Modal>

      <Actions
        onRestart={startGame}
        onFullscreen={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        showFullscreenButton={fullScreenBtn}
      />

    </div>
  );
};
