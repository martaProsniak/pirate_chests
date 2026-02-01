import { requestExpandedMode } from '@devvit/web/client';
import { Tile } from './Tile';
import { useGame } from '../hooks/useGame';
import { Modal } from '../UI/Modal/Modal';
import { useEffect, useState } from 'react';
import { GameProgress } from './GameProgress';
import { Actions } from './Actions';
import { DailyChallengeResponse, PracticeGameResponse } from '../../shared/types/api';

export interface BoardProps {
  mode: 'daily' | 'practice';
  initialData?: DailyChallengeResponse | PracticeGameResponse | null;
  fullScreenBtn?: boolean;
}

export const Board = ({ mode = 'practice', initialData = null, fullScreenBtn = false }: BoardProps) => {
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
    mapInfo,
    points,
    loading
  } = useGame({ mode, initialData });
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
            bombs={mapInfo.bomb}
            points={points}
          />
        </div>

        <div className="relative z-10 p-10">
          <img
            src="/images/board.png"
            alt="Island map"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
          />

          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-stone-900/60 backdrop-blur-sm rounded-xl">
              <svg className="animate-spin h-10 w-10 text-amber-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-pirate text-amber-100 text-lg tracking-widest">
                Loading Map...
              </span>
            </div>
          )}

          <div className="relative flex flex-col gap-1">
            {matrix && matrix.length > 0 ? (
              matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {row.map((cell, colIndex) => (
                    <Tile
                      key={`${rowIndex}-${colIndex}`}
                      item={cell}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                  ))}
                </div>
            ))
            ) : null}
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
          {wasBombed && "Bloody rats! Bomb exploded right to yarrrgh face! Better luck next time."}
          {(!isWin && !wasBombed) && (
            "Out of rum! Other pirates found the treasures!"
          )}
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
