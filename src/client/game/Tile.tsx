import { MatrixItem } from './types';
import { ChestIcon, GoldIcon } from '../UI/icons';

interface TileProps {
  item: MatrixItem;
  onClick: () => void;
}

export const Tile = ({ item, onClick }: TileProps) => {
  const { isRevealed, value } = item;

  const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold rounded-md select-none transition-all duration-75";

  const hiddenClasses = `
    bg-amber-500 
    border-2 border-b-4 border-amber-700 
    text-transparent
    cursor-pointer 
    hover:bg-amber-400 hover:border-amber-600
    active:border-b-2 active:translate-y-[2px]
  `;

  const revealedClasses = "bg-amber-100 shadow-inner border-2 border-amber-900/20";

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
  return "text-amber-900/60 font-bold";
};
