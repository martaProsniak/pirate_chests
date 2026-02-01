import { GuiButton } from '../UI/GUIButton';
import { Guides } from './Guides';
import { SplashFooter } from './SplashFooter';
import { MouseEvent } from 'react';

export interface NewMenuProps {
  score?: number;
  username?: string;
  mode?: 'daily' | 'practice',
  handleStart?: (e: MouseEvent) => void;
}

export const NewMenu = ({score = 0, username = 'Anonymus', mode = 'practice', handleStart}: NewMenuProps) => {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen h-auto p-0 pt-2 gap-2 w-full relative">
      <div className="flex flex-row items-center justify-center h-16 w-10/12 grow">
        <img src="/images/logo.png" alt="Pirate Chest" className="w-full h-full object-contain" />
      </div>
      <Guides />
      <div className="flex flex-col items-center justify-center w-full gap-2 grow">
        <GuiButton image="menu_btn" label={mode === 'daily' ? 'Daily Adventure' : 'Casual Adventure'} variant="text" onClick={(e) => handleStart && handleStart(e)} />
        <div className="flex flex-row items-center">
          <GuiButton image="leadership_btn" label="Leaders" variant="icon" onClick={() => console.log("Leaders")} />
        </div>
      </div>
      <SplashFooter totalGold={score} username={username} />
    </main>
  )
}
