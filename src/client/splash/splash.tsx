import '../index.css';

// import { navigateTo } from '@devvit/web/client';
// import { context } from '@devvit/web/client';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Board} from '../game/Board';
import { Layout } from '../UI/Layout';
import { GuiButton } from '../UI/GUIButton';
import { Menu } from './Menu';

export const Splash = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  return (
    <Layout>
      {showWelcomeScreen && (
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="h-40 w-40">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <Menu />
          <div
            className="p-8"
            style={{
              backgroundImage: 'url("/images/wooden_banner_long.png")',
              backgroundSize: '200% 280%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <GuiButton onClick={() => setShowWelcomeScreen(false)} variant="text" image={'gui_btn_wide_green'} label={'Play'} />
          </div>
        </div>
        )}
      {!showWelcomeScreen && (<Board fullScreenBtn={true} />)}
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
