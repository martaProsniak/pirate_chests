import {Board} from './Board/Board';
import { Layout } from '../UI/Layout';
import { useGame } from '../hooks/useGame';
import { useEffect, useState } from 'react';
import { ShipLoader } from './ShipLoader/ShipLoader';
import { GameProgress } from './GameProgress';
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
    loading,
    findings,
    checkedMode
  } = useGame({mode: 'daily'});
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
      <div className="relative overflow-hidden">

        {loading && (
          <ShipLoader />
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

            <Board matrix={matrix} onClick={handleCellClick}  />
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
        />
        <Actions
          onRestart={startGame}
          mode={checkedMode}
          showModalBtn={(isEnd && !isModalOpen)}
          onShowModal={() => setIsModalOpen(true)}
        />
      </div>
    </Layout>
  );
};
