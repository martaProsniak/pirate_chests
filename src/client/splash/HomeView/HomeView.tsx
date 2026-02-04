import { MouseEvent } from 'react';
import { NextChallengeTimer } from './NextChallengeTimer';
import { GameButton } from '../../UI/GameButton';

export type Color =
  | 'amber'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'sky'
  | 'orange'
  | 'lime'
  | 'teal'

interface HomeViewProps {
  username: string;
  mode: 'daily' | 'practice';
  onStart: (e: MouseEvent) => void;
}

export const HomeView = ({ username, mode, onStart }: HomeViewProps) => {
  const color = mode === 'daily' ? 'amber' : 'orange';
  const padding = mode === 'daily' ? 'p-1' : 'p-0';

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full animate-fade-in py-4">
      {/* Greetings Block */}
      <div className="flex flex-col gap-2 font-pirate">
        <h1 className={`text-xl md:text-2xl font-bold text-orange-800`}>
          Ahoy, <span>{username}</span>!
        </h1>
        <div className={`text-lg md:text-xl  font-bold font-indie text-orange-950`}>
          {mode === 'daily' ? 'New land on a horizon!' : <NextChallengeTimer />}
        </div>
      </div>

      {/* Game Action Button */}
      <GameButton onClick={onStart} color={color}>
        <span className={`${padding}`}>{mode === 'daily' ? 'Daily Cruise' : 'Casual Cruise'}</span>
      </GameButton>
    </div>
  );
};
