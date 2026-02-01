import '../index.css';

// import { navigateTo } from '@devvit/web/client';
// import { context } from '@devvit/web/client';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Board} from '../game/Board';
import { Layout } from '../UI/Layout';
import { NewMenu } from './NewMenu';

export const Splash = () => {
  const [showWelcomeScreen, _setShowWelcomeScreen] = useState(true);
  return (
    <Layout className="overflow-y-auto">
      {showWelcomeScreen && (
        <NewMenu />
        )}
      {!showWelcomeScreen && (<Board mode="practice" initialData={null} fullScreenBtn={true} />)}
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
