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
      <div className="flex flex-col gap-4 font-bree justify-center items-center w-full h-full">
        <h1 className="text-xl md:text-2xl font-bold text-amber-900">
          Ahoy, <span>{username}</span>!
        </h1>

          <div className="w-fit">
            <Button onClick={onStart} label={'Play'} classes={loading ? 'opacity-0' : 'opacity-100'} image={mode === 'daily' ? 'red' : 'yellow'}>
              {mode === 'daily' && (
                <span className="px-9 py-3 text-rose-50 text-shadow-xs text-shadow-rose-900 font-pirate text-xl">
                Daily Raid
              </span>
              )}
              {mode === 'practice' && (
                <span
                  className='px-8 py-2 text-[#422006] font-pirate text-xl font-bold tracking-wide'>
                  Casual Raid
              </span>
              )}
            </Button>
          </div>

        <div className="text-lg md:text-xl text-amber-800 text-shadow-xs">
          {loading ? (
            'Navigating...'
          ) : mode === 'daily' ? (
            'New land on a horizon!'
          ) : (
            <NextChallengeTimer />
          )}
        </div>

      </div>
    </ViewWrapper>
  );
};
