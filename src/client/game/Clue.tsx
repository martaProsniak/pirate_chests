export interface ClueProps {
  value: string;
  bombs: number;
}

export const Clue = ({ value, bombs }: ClueProps) => {
  const hasBombs = bombs > 0;

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="relative size-9 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/images/steps.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <span className="relative z-10 text-xl font-bold text-stone-800">{value}</span>
      </div>

      {hasBombs && (
        <div
          className="
            absolute -bottom-1.5 -right-1.5
            size-6 pt-1 pl-1
            flex items-center justify-center
          "
          style={{
            backgroundImage: 'url("/images/bomb.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <span className="text-xs leading-2 font-bold text-slate-100">{bombs}</span>
        </div>
      )}
    </div>
  );
};
