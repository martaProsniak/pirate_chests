import { MatrixClue, MatrixItem } from './types';
import { Treasure } from './Treasure';

interface TileProps {
  item: MatrixItem;
  onClick: () => void;
}

export const Tile = ({ item, onClick }: TileProps) => {
  const { isRevealed, value, isTreasure, isHighlighted, bombs } = item;

  const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold rounded-md select-none transition-all duration-75 border-dashed";

  const hiddenClasses = `
    text-transparent
    cursor-pointer 
    hover:border-1 hover:border-b-2 hover:border-green-900
    active:border-b-2 active:translate-y-[2px]
  `;

  const regularRevealedClasses = !isTreasure ? 'bg-stone-300 border-stone-800' : value !== 'bomb' ? 'border-yellow-600 bg-yellow-300' : 'bg-stone-300 border-stone-800';

  const revealedClasses = `shadow-inner border-1 ${isHighlighted ? 'border-red-600 bg-red-300' : regularRevealedClasses }`;

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${isRevealed ? revealedClasses : hiddenClasses}`}
      style={{
        backgroundImage: !isRevealed ? 'url("/images/tile.png")' : 'none',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {isRevealed && (
        <>
          {isTreasure && <Treasure kind={value} />}
          {!isTreasure && (
            <span className={`text-xl ${getValueColor(item)}`}>{value}{bombs > 0 && `/${bombs}`}</span>
          )}
        </>
      )}
    </div>
  );
};

const getValueColor = (item: MatrixClue) => {
  if (item.nearestTreasure=== 'bomb') {
    return "text-red-700 font-bold";
  }
  return "text-stone-800 font-bold";
};
