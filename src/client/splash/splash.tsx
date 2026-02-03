import '../index.css';
import { StrictMode, useEffect, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from '../UI/Layout';
import { Menu } from './Menu';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { context, requestExpandedMode } from '@devvit/web/client';

export const Splash = () => {
  const { getDailyChallenge } = usePirateChestAPI();
  const { username } = context;

  const [menuData, setMenuData] = useState({
    username: username ?? 'Matey',
    score: 0,
    mode: 'practice' as 'daily' | 'practice'
  });

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const data = await getDailyChallenge();

        if (data) {
          const determinedMode = data.hasPlayed ? 'practice' : 'daily';

          console.log(determinedMode);
          setMenuData({
            username: data.username,
            score: data.stats.score,
            mode: determinedMode,
          });
        }
      } catch (e) {
        console.error("Failed to fetch menu data", e);
      }
    };

    checkUserStatus();
  }, [getDailyChallenge]);

  const handleStart = (e: MouseEvent) => {
    requestExpandedMode(e.nativeEvent, 'game');
  };

  return (
    <Layout className="overflow-y-auto">
      <Menu handleStart={handleStart} mode={menuData.mode} username={menuData.username} score={menuData.score} />
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
