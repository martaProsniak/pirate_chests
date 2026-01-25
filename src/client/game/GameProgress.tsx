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
        className={`object-contain w-12 h-12 select-none ${imgClasses}`}
      />

      <div className="flex flex-col gap-1 justify-center">
        <span className="text-orange-100 text-xs font-bold uppercase tracking-widest leading-tight">
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
        label="Rum"
        iconSrc="/images/rum.png"
        value={moves}
        classes={moves <= 3 ? 'text-red-300 animate-pulse' : 'text-orange-200'}
      />

      {/* TREASURES SECTION */}
      <ProgressSection
        label="Treasures"
        iconSrc="/images/gold-hud.png"
        value={
          <>
            {treasuresFound} <span className="text-xl leading-none">/</span> {totalTreasures}
          </>
        }
        classes="text-orange-200"
      />

    </div>
  );
};
