import { useState, useEffect, useRef, useCallback } from 'react';
import { MatrixItem } from '../game/types';
import { FindingsMap, GameConfigItem } from '../../shared/types/game';
import { usePirateChestAPI } from './usePirateChestApi';
import { DailyChallengeResponse, PracticeGameResponse } from '../../shared/types/api';

const pointsMap: FindingsMap = {
  chest: 200,
  gold: 50,
  fish: 1,
  bomb: 0
}

const movesMap: FindingsMap = {
  chest: 3,
  gold: 1,
  fish: 0,
  bomb: 0
}

const RUM_POINTS = 10;
const FALLBACK_GRID_SIZE = 6;

interface UseGameProps {
  mode: 'daily' | 'practice';
  initialData?: DailyChallengeResponse | PracticeGameResponse | null;
}

export const useGame = ({ mode, initialData }: UseGameProps) => {
  const {
    getDailyChallenge,
    getPracticeChallenge,
    submitScore,
    loading: apiLoading
  } = usePirateChestAPI();

  const [gridSize, setGridSize] = useState({
    rows: initialData?.gameConfig?.rowsCount ?? FALLBACK_GRID_SIZE,
    cols: initialData?.gameConfig?.colsCount ?? FALLBACK_GRID_SIZE,
  });

  const [matrix, setMatrix] = useState<MatrixItem[][]>(initialData?.matrix ?? []);
  const [moves, setMoves] = useState<number>(10);
  const [isEnd, setIsEnd] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState<number>(0);
  const [isWin, setIsWin] = useState(false);
  const [points, setPoints] = useState(0);
  const [wasBombed, setWasBombed] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [findings, setFindings] = useState<FindingsMap>({
    chest: 0, gold: 0, fish: 0, bomb: 0
  });
  const [mapInfo, setMapInfo] = useState({
    bomb: 0, chest: 0, gold: 0, fish: 0, totalTreasures: 0
  });
  const loadedRef = useRef(false);

  const loadGameData = useCallback((dataMatrix: MatrixItem[][], dataConfig: GameConfigItem) => {
    setMatrix(dataMatrix);
    setGridSize({
      rows: dataConfig.rowsCount,
      cols: dataConfig.colsCount
    });
    resetState(dataConfig);
  }, []);

  const countTreasures = (treasures: FindingsMap) => {
    return treasures.gold + treasures.chest + treasures.fish;
  }

  const resetState = (config: GameConfigItem) => {
    setIsEnd(false);
    setIsWin(false);
    setMoves(config.maxMoves);
    setTreasuresFound(0);
    setPoints(0);
    setWasBombed(false);
    setFindings({ chest: 0, gold: 0, fish: 0, bomb: 0 });
    const newMapInfo = {...config.treasures, totalTreasures: countTreasures(config.treasures)}
    setMapInfo(newMapInfo);
  };

  const startGame = useCallback(async () => {
    if (mode === 'daily' && initialData && !loadedRef.current) {
      loadGameData(initialData.matrix, initialData.gameConfig);
      loadedRef.current = true;
      return;
    }

    setGameLoading(true);

    try {
      let data: DailyChallengeResponse | PracticeGameResponse | null = null;

      if (mode === 'daily') {
        data = await getDailyChallenge();
      } else {
        data = await getPracticeChallenge();
      }

      if (data) {
        loadGameData(data.matrix, data.gameConfig);
      }
    } catch (e) {
      console.error("Failed to start game", e);
    } finally {
      setGameLoading(false);
    }
  }, [mode, initialData, getDailyChallenge, getPracticeChallenge, loadGameData]);

  const finishGame = async (
    won: boolean,
    finalScore: number,
    finalFindings: FindingsMap,
    finalMoves: number
  ) => {
    setIsEnd(true);
    setIsWin(won);

    try {
      await submitScore({
        isDaily: mode === 'daily',
        isWin: won,
        score: finalScore,
        moves: finalMoves,
        findings: finalFindings,
        attempt: 1
      });
    } catch (e) {
      console.error("Failed to submit score", e);
    }
  };

  const handleCellClick = async (rowIndex: number, colIndex: number) => {
    if (isEnd || gameLoading || apiLoading) return;

    const currentCell = matrix[rowIndex]?.[colIndex];
    if (!currentCell || currentCell.isRevealed) return;

    const newMatrix = matrix.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;
      return row.map((cell, cIndex) => {
        if (cIndex !== colIndex) return cell;
        return { ...cell, isRevealed: true };
      });
    });

    setMatrix(newMatrix);

    if (currentCell.value === 'bomb') {
      setMoves(0);
      revealTreasures();
      setWasBombed(true);
      const newFindings = { ...findings, bomb: findings.bomb + 1 };
      setFindings(newFindings);

      await finishGame(false, points, newFindings, 0);
      return;
    }

    let bonusMoves = 0;

    if (currentCell.isTreasure) {
      const kind = currentCell.value;

      const updatedFound = treasuresFound + 1;
      setTreasuresFound(updatedFound);

      const newFindings = { ...findings, [kind]: findings[kind] + 1 };
      setFindings(newFindings);

      let newPoints = points + (pointsMap[kind] || 0);
      bonusMoves = movesMap[kind] || 0;

      if (updatedFound === mapInfo.totalTreasures) {
        const movesLeft = moves - 1 + bonusMoves
        newPoints = newPoints + (movesLeft * RUM_POINTS);
        setPoints(newPoints);
        setMoves(movesLeft);
        finishGame(true, newPoints, newFindings, movesLeft);
        return;
      }

      setPoints(newPoints);
    }

    const leftMoves = (moves - 1) + bonusMoves;

    if (leftMoves === 0) {
      revealTreasures();
      finishGame(false, points, findings, 0);
    }

    setMoves(leftMoves);
  };

  const revealTreasures = () =>{
    const newMatrix = matrix.map((row) => {
      return row.map((cell) => {
        if (cell.isTreasure) {
          const highlighted = !(cell.isRevealed || cell.value === 'bomb');
          return {...cell, isRevealed: true, isHighlighted: highlighted };
        }
        return cell;
      })
    });

    setMatrix(newMatrix);
  }

  useEffect(() => {
    startGame();
  }, []);

  return {
    matrix,
    gridSize,
    moves,
    isEnd,
    isWin,
    treasuresFound,
    startGame,
    handleCellClick,
    totalTreasures: mapInfo.totalTreasures,
    points,
    wasBombed,
    mapInfo,
    loading: gameLoading || apiLoading
  };
};
