import '../index.css';

// import { navigateTo } from '@devvit/web/client';
// import { context } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Board} from '../game/Board';

export const Splash = () => {
  return (
    <div className="flex relative flex-col items-center min-h-screen gap-4 bg-stone-950 text-white">
      <Board fullScreenBtn={true} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
