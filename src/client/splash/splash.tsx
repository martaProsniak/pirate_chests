import '../index.css';

// import { navigateTo } from '@devvit/web/client';
// import { context } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Board} from '../game/Board';
import { Layout } from '../UI/Layout';

export const Splash = () => {
  return (
    <Layout>
      <Board fullScreenBtn={true} />
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
