import { GuiButton } from '../UI/GUIButton';
import { Guides } from './Guides';
import { SplashFooter } from './SplashFooter';
import { MouseEvent, useState } from 'react';
import { CaptainsTable } from '../UI/CaptainsTable/CaptainsTable';

export interface MenuProps {
  score?: number;
  username?: string;
  mode?: 'daily' | 'practice',
  handleStart: (e: MouseEvent) => void;
}

type View = 'splash' | 'leaderboard'

export const Menu = ({score = 0, username = 'Anonymus', mode = 'practice', handleStart}: MenuProps) => {
  const [view, setView] = useState<View>('splash');

  return (
    <main className="flex flex-col items-center justify-between min-h-screen h-auto p-0 pt-2 gap-2 w-full relative">
      <div className="flex flex-row items-center justify-center h-16 w-10/12 grow">
        <img src="/images/logo.png" alt="Pirate Chest" className="w-full h-full object-contain" />
      </div>
      {view === 'splash' && (
        <Guides />
      )}
      {view === 'leaderboard' && (
        <div className="flex flex-col items-center justify-center gap-2 max-w-[70%] min-w-[320px] w-full shrink-0">
          <CaptainsTable className='w-full' />
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full gap-2 grow">
        <GuiButton image="menu_btn" label={mode === 'daily' ? 'Daily Adventure' : 'Casual Adventure'} variant="text" onClick={(e) => handleStart(e)} />
        <div className="flex flex-col items-center">
          {view === 'splash' && (
            <GuiButton image="leadership_btn" label="Leaders" variant="icon" onClick={() => setView('leaderboard')} />
          )}
          {view === 'leaderboard' && (
            <GuiButton image="home_btn" label="Home" variant="icon" onClick={() => setView('splash')} />
          )}
        </div>
      </div>
      <SplashFooter totalGold={score} username={username} />
    </main>
  )
}
