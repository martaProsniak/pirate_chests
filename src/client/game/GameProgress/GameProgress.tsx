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
    <div className="flex gap-x-2 items-center justify-center w-full">
      <img
        src={iconSrc}
        alt={label}
        className={`object-contain h-6 select-none ${imgClasses}`}
      />
      <div className={`text-xl leading-5 font-bold drop-shadow-sm ${classes}`}>
        {value}
      </div>
    </div>
  );
};


interface GameProgressProps {
  moves: number;
  treasuresFound: number;
  totalTreasures: number;
  bombs?: number;
  points: number;
}

export const GameProgress = ({ moves, treasuresFound, totalTreasures, bombs, points }: GameProgressProps) => {
  return (
    <div className={`flex items-center justify-center gap-4 select-none font-bree p-3 glassPanel`}>

      {/* RUM SECTION */}
      <ProgressSection
        label="Rum"
        iconSrc="/images/rum.png"
        value={moves}
        classes={moves <= 3 ? `text-pink-600 ${moves > 0 && 'animate-pulse'}` : 'text-stone-600'}
      />

      {/* TREASURES SECTION */}
      <ProgressSection
        label="Treasures"
        iconSrc="/images/gold.png"
        value={
          <span>
            {treasuresFound}/{totalTreasures}
          </span>
        }
        classes="text-stone-600"
      />

      {bombs ? (
        <ProgressSection
          label="Bombs"
          iconSrc="/images/bomb.png"
          value={bombs}
          classes="text-stone-600"
        />
      ) : null}

      <ProgressSection
        label="Gold"
        iconSrc="/images/money.png"
        value={
          <>
            {points}
          </>
        }
        classes="text-stone-600"
      />
    </div>
  );
};
