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
      <div className="flex flex-col gap-4 font-aladin justify-center items-center w-full h-full">
        <h1 className="text-xl md:text-2xl font-bold gap-0.5 text-amber-900 flex flex-row justify-center items-center w-full">
          <span>Ahoy,</span><span>{username}!</span>
        </h1>

          <div className="w-fit">
            <Button onClick={onStart} label={'Play'} image={mode === 'daily' ? 'red' : 'yellow'}>
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

        <div className="text-base md:text-lg text-orange-900 font-aladin">
          {loading ? (
            'Navigating...'
          ) : mode === 'daily' ? (
            <div className="w-full flex flex-row gap-2 items-center justify-center">
              <img className="w-10 object-contain" src="/images/spyglass.png" alt="Spyglass" />
              <span>New land on a horizon!</span>
            </div>
          ) : (
            <NextChallengeTimer />
          )}
        </div>

      </div>
    </ViewWrapper>
  );
};
