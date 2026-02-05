import { ButtonHTMLAttributes, ReactNode } from 'react';

export type GameButtonColor =
  | 'amber'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'sky'
  | 'orange'
  | 'lime'
  | 'teal';

export type GameButtonVariant = 'light' | 'dark';

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: GameButtonColor;
  variant?: GameButtonVariant;
}

export const GameButton = ({
   children,
   color = 'amber',
   variant = 'light',
   className = '',
   ...props
 }: GameButtonProps) => {

  const lightColors: Record<GameButtonColor, string> = {
    amber: 'from-amber-300 to-amber-500 border-amber-100 text-amber-900',
    cyan: 'from-cyan-300 to-cyan-500 border-cyan-100 text-cyan-900',
    emerald: 'from-emerald-300 to-emerald-500 border-emerald-100 text-emerald-900',
    rose: 'from-rose-300 to-rose-500 border-rose-100 text-rose-900',
    sky: 'from-sky-300 to-sky-500 border-sky-100 text-sky-900',
    orange: 'from-orange-300 to-orange-500 border-orange-100 text-orange-900',
    lime: 'from-lime-300 to-lime-500 border-lime-100 text-lime-900',
    teal: 'from-teal-300 to-teal-500 border-teal-100 text-teal-900',
  };

  const darkColors: Record<GameButtonColor, string> = {
    amber: 'from-amber-500 to-amber-700 border-amber-300 text-amber-50',
    cyan: 'from-cyan-500 to-cyan-700 border-cyan-300 text-cyan-50',
    emerald: 'from-emerald-500 to-emerald-700 border-emerald-300 text-emerald-50',
    rose: 'from-rose-500 to-rose-700 border-rose-300 text-rose-50',
    sky: 'from-sky-500 to-sky-700 border-sky-300 text-sky-50',
    orange: 'from-orange-500 to-orange-700 border-orange-300 text-orange-50',
    lime: 'from-lime-500 to-lime-700 border-lime-300 text-lime-50',
    teal: 'from-teal-500 to-teal-700 border-teal-300 text-teal-50',
  };

  const colorClasses = variant === 'dark' ? darkColors[color] : lightColors[color];

  return (
    <button
      className={`
        cursor-pointer relative group
        font-pirate text-xl tracking-wider
        rounded-full
        bg-gradient-to-b
        border-2
        shadow-md
        transition-all duration-150
        hover:brightness-110 hover:-translate-y-1 hover:shadow-lg
        active:translate-y-0 active:shadow-sm
        ${colorClasses}
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10 flex justify-center items-center">
        {children}
      </div>

      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
    </button>
  );
};
