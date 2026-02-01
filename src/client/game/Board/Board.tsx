import { Tile } from '../Tile';
import { useGame } from '../../hooks/useGame';
import { useEffect, useState } from 'react';
import { GameProgress } from '../GameProgress';
import { Actions } from '../Actions';
import { EndGameModal } from '../EndGameModal/EndGameModal';
import styles from './Board.module.css';

export interface BoardProps {
  mode: 'daily' | 'practice';
}

// TODO:
//
// - wydzielić modal do osobnego komponentu (EndGameModal)
//
// - modal musi przyjmować propsy: isOpen, onClose, handleRestart, mode, a także inne, które okażą się potrzebne
//
// - jeśli mode jest daily, chcemy widzieć tablicę leaderboard

export const Board = ({ mode = 'practice' }: BoardProps) => {
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
    loading,
    findings
  } = useGame({ mode });
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

      {loading && (
        <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-6">
          <div className="relative">
            <img
              src="/images/ship.png"
              alt="Loading..."
              className={`w-32 h-32 sm:w-40 sm:h-40 object-contain ${styles.animateRock} drop-shadow-xl`}
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 blur-md rounded-[100%]"></div>
          </div>
          <span className="font-pirate text-stone-100 text-2xl tracking-widest animate-pulse drop-shadow-md">
            Loading Map...
          </span>
        </div>
      )}

      {!loading && (matrix && matrix.length > 0) ? (
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
      ) : null}

      <EndGameModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRestart={handleRestart}
        mode={mode}
        isWin={isWin}
        wasBombed={wasBombed}
        points={points}
        findings={findings}
        moves={moves}
      />

      <Actions
        onRestart={startGame}
      />

    </div>
  );
};
