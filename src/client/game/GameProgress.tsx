import { ReactNode } from 'react';


interface ProgressSectionProps {
  label: string;
  value: ReactNode;
  iconSrc: string;
  classes?: string;
  imgClasses?: string;
}

const ProgressSection = ({ label, value, iconSrc, classes = '', imgClasses = '' }: ProgressSectionProps) => {
  return (
    <div className="flex items-center min-h-[44px]">
      <img
        src={iconSrc}
        alt={label}
        className={`object-contain w-14 h-14 select-none ${imgClasses}`}
      />

      <div className="flex flex-col gap-1 justify-center">
        <span className="text-stone-600 text-xs font-bold uppercase tracking-widest leading-tight">
          {label}
        </span>
        <span className={`text-xl font-pirate leading-none drop-shadow-sm ${classes}`}>
          {value}
        </span>
      </div>

    </div>
  );
};


interface GameProgressProps {
  moves: number;
  treasuresFound: number;
  totalTreasures: number;
}

export const GameProgress = ({ moves, treasuresFound, totalTreasures }: GameProgressProps) => {
  return (
    <div className="flex items-center gap-3 select-none">

      {/* RUM SECTION */}
      <ProgressSection
        label="Rum Left"
        iconSrc="/images/rum.png"
        value={moves}
        classes={moves <= 3 ? 'text-red-500 animate-pulse' : 'text-stone-800'}
      />

      {/* SEPARATOR */}
      <div className="w-[1px] bg-stone-600/40 h-8"></div>

      {/* TREASURES SECTION */}
      <ProgressSection
        label="Treasures"
        iconSrc="/images/gold.png"
        value={
          <>
            {treasuresFound} <span className="text-stone-600 text-xl leading-none">/</span> {totalTreasures}
          </>
        }
        classes="text-stone-800"
        imgClasses="-ml-3"
      />

    </div>
  );
};
