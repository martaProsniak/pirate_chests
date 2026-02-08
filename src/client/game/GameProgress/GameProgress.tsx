import { ReactNode } from 'react';

interface ProgressSectionProps {
  label: string;
  value: ReactNode;
  iconSrc: string;
  classes?: string;
  imgClasses?: string;
}

const ProgressSection = ({
  label,
  value,
  iconSrc,
  classes = '',
  imgClasses = '',
}: ProgressSectionProps) => {
  return (
    <div className="flex gap-x-1 items-center justify-center w-full">
      <img src={iconSrc} alt={label} className={`object-contain h-6 select-none ${imgClasses}`} />
      <div className={`text-2xl leading-5 font-bold font-bree  drop-shadow-sm ${classes}`}>
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

export const GameProgress = ({
  moves,
  treasuresFound,
  totalTreasures,
  bombs,
  points,
}: GameProgressProps) => {
  return (
    <div
      className="flex w-full items-center justify-evenly gap-5 select-none px-5 py-1"
      style={{
        borderImageSource: 'url("/images/banner_hud.png")',
        borderImageSlice: '96 fill',
        borderWidth: '16px',
        borderStyle: 'solid',
        background: 'none',
      }}
    >
      {/* RUM SECTION */}
      <ProgressSection
        label="Rum"
        iconSrc="/images/rum.png"
        value={moves}
        classes={moves <= 3 ? `text-rose-800 ${moves > 0 && 'animate-pulse'}` : 'text-amber-900'}
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
        classes="text-amber-900"
      />

      {bombs ? (
        <ProgressSection
          label="Bombs"
          iconSrc="/images/bomb.png"
          value={bombs}
          classes="text-amber-900"
        />
      ) : null}

      <ProgressSection
        label="Gold"
        iconSrc="/images/money.png"
        value={<>{points}</>}
        classes="text-amber-900"
      />
    </div>
  );
};
