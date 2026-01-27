import { useState, useEffect } from 'react';
import { config } from '../game/config';
import { MatrixItem, Treasure, TreasureKind } from '../game/types';

type TreasureInfo = {
  [key in TreasureKind]: number
}

interface NearestTreasure {
  minDistance: number;
  treasure: TreasureKind
}

const pointsMap: TreasureInfo = {
  chest: 200,
  gold: 50,
  bomb: 0
}

const movesMap: TreasureInfo = {
  chest: 2,
  gold: 1,
  bomb: 0
}

const RUM_POINTS = 10;

const shuffleArray = (array: number[]): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i]!;
    newArray[i] = newArray[j]!;
    newArray[j] = temp;
  }
  return newArray;
};

const findNearestTreasure = (row: number, col: number, currentTreasures: Treasure[], initialDistance: number): NearestTreasure => {
  return <NearestTreasure>currentTreasures.reduce(
    (acc: { minDistance: number; treasure: TreasureKind | null }, curr) => {
      if (curr.kind === 'bomb') {
        return acc;
      }

      const distance = Math.abs(curr.row - row) + Math.abs(curr.col - col);
      if (acc.minDistance > distance) {
        acc.minDistance = distance;
        acc.treasure = curr.kind;
      }

      return acc;
    },
    { minDistance: initialDistance, treasure: null }
  );
};

const countBombsNearby = (row: number, col: number, currentTreasures: Treasure[]) => {
  return currentTreasures.filter(({kind}) => kind === 'bomb').reduce((acc, curr) => {
    if ((curr.row === row + 1) && (curr.col === col)) {
      acc++;
    }
    if ((curr.row === row - 1) && (curr.col === col)) {
      acc++;
    }
    if ((curr.col === col + 1) && (curr.row === row)) {
      acc++;
    }
    if ((curr.col === col - 1) && (curr.row === row)) {
      acc++;
    }
    return acc;
  }, 0)
}

export const useGame = (initialDifficulty: 'base' = 'base') => {
  const [difficulty] = useState(initialDifficulty);
  const { rowsCount, colsCount, maxMoves, treasures } = config[difficulty];

  const [matrix, setMatrix] = useState<MatrixItem[][]>([]);
  const [moves, setMoves] = useState<number>(maxMoves);
  const [isEnd, setIsEnd] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState<number>(0);
  const [isWin, setIsWin] = useState(false);
  const [points, setPoints] = useState(0);
  const [wasBombed, setWasBombed] = useState(false);

  const countTreasures = () => {
    return (Object.keys(treasures) as TreasureKind[]).reduce((acc, key) => {
      if (key === 'bomb') {
        return acc;
      }
      return acc + (treasures[key] ?? 0);
    }, 0);
  }

  const mapInfo = {
    bombs: treasures.bomb,
    chests: treasures.chest,
    gold: treasures.gold,
    totalTreasures: countTreasures()
  }

  const resetState = () => {
    setIsEnd(false);
    setIsWin(false);
    setMoves(maxMoves);
    setTreasuresFound(0);
    setPoints(0);
    setWasBombed(false);
  };

  const getShuffledTreasures = () : Treasure[] => {
    const totalCells = rowsCount * colsCount;
    const allIndices = Array.from({ length: totalCells }, (_, i) => i);

    const shuffledIndices = shuffleArray(allIndices);

    const treasuresArray = (Object.keys(treasures) as TreasureKind[]).reduce((acc: TreasureKind[], key: TreasureKind) => {
      const temp = Array.from({length: treasures[key]}).fill(key) as TreasureKind[];
      return acc.concat(temp);
    }, []);

    return treasuresArray.map((kind, index) => {
      const gridIndex = shuffledIndices[index]!;
      return {
        row: Math.floor(gridIndex / colsCount),
        col: gridIndex % colsCount,
        kind: kind
      };
    });
  }

  const startGame = () => {
    const shuffledTreasures = getShuffledTreasures();

    const empty_matrix = Array.from(Array(rowsCount).keys()).map(() =>
      Array.from(Array(colsCount).keys()).map(() => null)
    );

    const filledMatrix: MatrixItem[][] = empty_matrix.map((row, rowIndex) => {
      return row.map((_cell, colIndex) => {
        const treasure = shuffledTreasures.find((t) => t.row === rowIndex && t.col === colIndex);

        if (treasure) {
          return {
            isTreasure: true,
            value: treasure.kind,
            isRevealed: false,
            bombs: 0
          };
        }

        const fieldInfo = findNearestTreasure(rowIndex, colIndex, shuffledTreasures, rowsCount + colsCount);
        return {
          value: fieldInfo.minDistance.toString(),
          isRevealed: false,
          nearestTreasure: fieldInfo.treasure,
          bombs: countBombsNearby(rowIndex, colIndex, shuffledTreasures),
          isTreasure: false,
        };
      });
    });

    setMatrix(filledMatrix);
    resetState();
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEnd) return;

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
      setIsEnd(true);
      return;
    }

    if (currentCell.isTreasure) {
      const updatedFound = treasuresFound + 1;
      setTreasuresFound(updatedFound);
      let newPoints = points + pointsMap[(currentCell.value)];
      const newMoves = moves + movesMap[(currentCell.value)];
      setMoves(newMoves);

      if (updatedFound === mapInfo.totalTreasures) {
        setIsEnd(true);
        setIsWin(true);
        newPoints = newPoints + moves * RUM_POINTS
        setPoints(newPoints);
        return;
      }

      setPoints(newPoints);
    }

    const leftMoves = moves - 1;

    if (leftMoves === 0) {
      revealTreasures();
      setIsEnd(true);
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
    moves,
    isEnd,
    isWin,
    treasuresFound,
    startGame,
    handleCellClick,
    totalTreasures: mapInfo.totalTreasures,
    points,
    wasBombed,
    mapInfo
  };
};
