import { MatrixItem } from './types';
import { ChestIcon, GoldIcon } from '../UI/icons';

interface TileProps {
  item: MatrixItem;
  onClick: () => void;
}

export const Tile = ({ item, onClick }: TileProps) => {
  const { isRevealed, value, isTreasure, isHighlighted } = item;

  const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold rounded-md select-none transition-all duration-75";

  const hiddenClasses = `
    border-2 border-stone-700 border-dashed
    text-transparent
    cursor-pointer 
    hover:bg-stone-400 hover:border-stone-600
    active:border-b-2 active:translate-y-[2px]
  `;

  const borderColorClass = isTreasure ? 'border-emerald-600' : 'border-stone-600';

  const revealedClasses = `shadow-inner border-2 ${isTreasure ? 'bg-yellow-100' : 'bg-transparent'} ${!isHighlighted ? borderColorClass : 'border-red-600/80'}`;

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${isRevealed ? revealedClasses : hiddenClasses}`}
    >
      {isRevealed && (
        <>
          {value === 'chest' && <ChestIcon />}
          {value === 'gold' && <GoldIcon />}
          {value !== 'chest' && value !== 'gold' && (
            <span className={`text-xl ${getValueColor()}`}>{value}</span>
          )}
        </>
      )}
    </div>
  );
};

const getValueColor = () => {
  // const num = parseInt(val);
  // if (num === 1) return "text-green-500 font-black";
  // if (num === 2) return "text-green-700 font-extrabold";
  return "text-stone-900/60 font-bold";
};
