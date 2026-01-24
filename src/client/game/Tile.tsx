import { MatrixItem } from './types';
import { GoldIcon } from '../UI/icons';

interface TileProps {
  item: MatrixItem;
  onClick: () => void;
}

export const Tile = ({ item, onClick }: TileProps) => {
  const { isRevealed, value, isTreasure, isHighlighted } = item;

  const baseClasses = "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold rounded-md select-none transition-all duration-75";

  const hiddenClasses = `
    border-1 border-b-2 border-green-700 border-dashed
    text-transparent
    cursor-pointer 
    hover:bg-green-400/60 hover:border-b-3 hover:border-green-900
    active:border-b-2 active:translate-y-[2px]
  `;

  const borderColorClass = isTreasure ? 'border-emerald-700' : 'border-green-700';

  const revealedClasses = `shadow-inner border-1 ${isTreasure ? '' : 'bg-transparent'} ${!isHighlighted ? borderColorClass : 'border-red-600/80'}`;

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
          {value === 'chest' && <div className="w-full h-full" style={{
            backgroundImage: 'url("/images/chest.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}></div>}
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
  return "text-green-900/60 font-bold";
};
