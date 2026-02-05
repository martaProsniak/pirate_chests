import { MouseEvent } from 'react';
import { NextChallengeTimer } from './NextChallengeTimer';

import { Button } from '../../UI/Button';

interface HomeViewProps {
  username: string;
  mode: 'daily' | 'practice';
  onStart: (e: MouseEvent) => void;
  loading?: boolean;
}

export const HomeView = ({ username, mode, onStart, loading }: HomeViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 w-full animate-fade-in py-4">

      <div className="flex flex-col gap-2 font-bree">
        <h1 className="text-xl md:text-2xl font-bold">
          Ahoy, <span>{username}</span>!
        </h1>
        <div className="text-lg md:text-xl">
          {loading
            ? 'Navigating...'
            : mode === 'daily' ? 'New land on a horizon!' : <NextChallengeTimer />
          }
        </div>
      </div>

      <Button onClick={onStart} label={'Play'} image={'royal'}>
        <span className="px-6 py-2">{mode === 'daily' ? 'Daily Cruise' : 'Casual Cruise'}</span>
      </Button>
    </div>
  );
};
