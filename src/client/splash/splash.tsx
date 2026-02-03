import '../index.css';
import { StrictMode, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from '../UI/Layout';
import { Menu } from './Menu';
import { requestExpandedMode } from '@devvit/web/client';
import { useRealtimeUserData } from '../hooks/useRealtimeUserData';

export const Splash = () => {

  const { username, score, mode } = useRealtimeUserData();

  const handleStart = (e: MouseEvent) => {
    requestExpandedMode(e.nativeEvent, 'game');
  };

  return (
    <Layout className="overflow-y-auto">
      <Menu handleStart={handleStart} mode={mode} username={username} score={score} />
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
