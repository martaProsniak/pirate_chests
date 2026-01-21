import { MatrixItem } from './types';
import { ChestIcon, GoldIcon } from '../UI/icons';

interface FieldProps {
  item: MatrixItem;
  onClick: () => void;
}

export const Tile = ({ item, onClick }: FieldProps) => {
  const { isRevealed, value } = item;

  const baseClasses =
    'w-10 h-10 flex items-center justify-center font-bold rounded-sm select-none transition-all duration-200 cursor-pointer';

  const revealedClasses = 'bg-amber-200 shadow-inner';
  const hiddenClasses = 'bg-amber-500 cursor-pointer hover:bg-amber-400 shadow-md';

  const classes = `${baseClasses} ${isRevealed ? revealedClasses : hiddenClasses}`;

  return (
    <div onClick={onClick} className={classes}>
      {isRevealed && (
        <>
          {value === 'chest' && <ChestIcon />}
          {value === 'gold' && <GoldIcon />}
          {value !== 'chest' && value !== 'gold' && (
            <span className="text-amber-900 text-lg">{value}</span>
          )}
        </>
      )}
    </div>
  );
};
