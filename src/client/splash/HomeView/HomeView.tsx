import { MouseEvent } from 'react';
import { NextChallengeTimer } from './NextChallengeTimer';
import { ViewWrapper } from '../../UI/ViewComponents';
import { Button } from '../../UI/Button';

interface HomeViewProps {
  username: string;
  mode: 'daily' | 'practice';
  onStart: (e: MouseEvent) => void;
  loading?: boolean;
}

export const HomeView = ({ username, mode, loading, onStart }: HomeViewProps) => {
  return (
    <ViewWrapper>
      <div className="flex flex-col gap-2 font-bree justify-center items-center w-full">
        <h1 className="text-xl md:text-2xl font-bold text-amber-900">
          Ahoy, <span>{username}</span>!
        </h1>

        <div className="text-lg md:text-xl text-amber-800">
          {loading ? (
            'Navigating...'
          ) : mode === 'daily' ? (
            'New land on a horizon!'
          ) : (
            <NextChallengeTimer />
          )}
        </div>
        <div className="w-fit">
          <Button onClick={onStart} label={'Play'} image={'red'}>
            <span className="px-6 py-2 text-rose-50 drop-shadow-xs drop-shadow-rose-900 font-pirate text-lg shadow-md">
              {mode === 'daily' ? 'Daily Cruise' : 'Casual Cruise'}
            </span>
          </Button>
        </div>
      </div>
    </ViewWrapper>
  );
};
