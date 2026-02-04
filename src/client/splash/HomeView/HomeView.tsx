import { MouseEvent } from 'react';
import { NextChallengeTimer } from './NextChallengeTimer';

interface HomeViewProps {
  username: string;
  mode: 'daily' | 'practice';
  onStart: (e: MouseEvent) => void;
}

export const HomeView = ({ username, mode, onStart }: HomeViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full animate-fade-in py-4">

      {/* Greetings Block */}
      <div className="flex flex-col gap-2 font-pirate">
        <h1 className="text-xl md:text-2xl text-sky-800 font-bold drop-shadow-sm">
          Ahoy, <span>{username}</span>!
        </h1>
        <div className="text-lg md:text-xl text-sky-700 font-bold font-indie">
          {mode === 'daily' ? (
            'New land on a horizon!'
          ) : (
            <NextChallengeTimer />
          )}
        </div>
      </div>

      {/* Game Action Button */}
      <button
        onClick={onStart}
        className={`
          cursor-pointer relative group
          font-pirate text-white text-xl tracking-wider
          px-10 py-4 rounded-2xl
          bg-gradient-to-b from-cyan-400 to-cyan-600
          border-b-[6px] border-cyan-800
          shadow-[0_4px_0_0_rgba(21,94,117,0.5),0_10px_10px_rgba(0,0,0,0.15)]
          transition-all duration-150
          hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgba(21,94,117,0.5),0_15px_15px_rgba(0,0,0,0.2)]
          active:border-b-0 active:translate-y-2 active:shadow-none
        `}
      >
        <span className="drop-shadow-md">
          {mode === 'daily' ? 'Daily Cruise' : 'Casual Cruise'}
        </span>

        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
      </button>
    </div>
  );
};
