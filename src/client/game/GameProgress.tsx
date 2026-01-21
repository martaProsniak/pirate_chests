interface GameProgressProps {
  moves: number;
  treasuresFound: number;
  totalTreasures: number;
}

export const GameProgress = ({ moves, treasuresFound, totalTreasures }: GameProgressProps) => {
  return (
    <div className="flex gap-4 select-none">

      {/* Rum Left */}
      <div className="flex flex-col items-center gap-y-1">
        <span className="text-slate-400 text-sm tracking-widest uppercase">
          Rum Left
        </span>
        <span className={`text-xl leading-none drop-shadow-md ${moves <= 3 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
          {moves}
        </span>
      </div>

      {/* Separator */}
      <div className="w-[1px] bg-slate-600/50 self-center h-8 mx-1"></div>

      {/* Treasures */}
      <div className="flex flex-col items-center gap-y-1">
        <span className="text-slate-400 text-sm tracking-widest uppercase">
          Treasures
        </span>
        <span className="text-xl leading-none text-emerald-400 drop-shadow-md">
          {treasuresFound}<span className="text-slate-500 text-lg">&nbsp;/&nbsp;</span>{totalTreasures}
        </span>
      </div>
    </div>
  );
};
