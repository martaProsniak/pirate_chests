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
    <div className="flex gap-x-2 items-center">
      <img
        src={iconSrc}
        alt={label}
        className={`object-contain h-12 select-none ${imgClasses}`}
      />

      <div className="flex flex-col gap-1 justify-center">
        <span className="text-stone-500 text-xs font-bold uppercase tracking-widest leading-tight">
          {label}
        </span>
        <span className={`text-lg font-pirate leading-none drop-shadow-sm ${classes}`}>
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
  bombs?: number;
}

export const GameProgress = ({ moves, treasuresFound, totalTreasures, bombs }: GameProgressProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-4 select-none py-3 px-12"
         style={{
           backgroundImage: 'url("/images/banner_paper_wide.png")',
           backgroundSize: '100% 400%',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
         }}
    >

      {/* RUM SECTION */}
      <ProgressSection
        label="Rum"
        iconSrc="/images/rum.png"
        value={moves}
        classes={moves <= 3 ? `text-red-500 ${moves > 0 && 'animate-pulse'}` : 'text-stone-600'}
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
        classes="text-stone-600"
      />

      {bombs ? (
        <ProgressSection
          label="Bombs"
          iconSrc="/images/bomb_hud.png"
          value={bombs}
          classes="text-stone-600"
          imgClasses="h-14"
        />
      ) : null}
    </div>
  );
};
