import { Board } from './Board/Board';
import { Layout } from '../UI/Layout';
import { useGame } from '../hooks/useGame';
import { useEffect, useState } from 'react';
import { ShipLoader } from './ShipLoader/ShipLoader';
import { GameProgress } from './GameProgress/GameProgress';
import { EndGameModal } from './EndGameModal/EndGameModal';
import { Actions } from './Actions';

export const App = () => {
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
    findings,
    checkedMode,
    gameLoading,
    finalTime,
    leaderboardData,
  } = useGame({ mode: 'daily' });
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
    setIsModalOpen(false);
    startGame();
  };

  return (
    <Layout className="overflow-hidden" image="water">
      <div className="relative overflow-hidden w-full flex justify-center h-full">
        {!gameLoading && matrix && matrix.length > 0 && (
          <div className="absolute z-30 w-max pointer-events-none top-2 left-1/2 -translate-x-1/2">
            <div className="pointer-events-auto">
              <GameProgress
                moves={moves}
                treasuresFound={treasuresFound}
                totalTreasures={totalTreasures}
                bombs={mapInfo.bomb}
                points={points}
              />
            </div>
          </div>
        )}

        {gameLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <ShipLoader />
          </div>
        )}

        {!gameLoading && matrix && matrix.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-1 px-2 max-w-[1000px]">
            <Board matrix={matrix} onClick={handleCellClick} />
          </div>
        ) : null}

        <EndGameModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onRestart={handleRestart}
          mode={checkedMode}
          isWin={isWin}
          wasBombed={wasBombed}
          points={points}
          findings={findings}
          moves={moves}
          time={finalTime}
          leaderboard={leaderboardData}
        />

        {!gameLoading ? <Actions
          onRestart={startGame}
          mode={checkedMode}
          showModalBtn={isEnd && !isModalOpen}
          onShowModal={() => setIsModalOpen(true)}
          isEnd={isEnd}
        /> : null}
      </div>
    </Layout>
  );
};
