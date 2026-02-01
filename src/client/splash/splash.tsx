import '../index.css';
import { StrictMode, useEffect, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from '../UI/Layout';
import { NewMenu } from './NewMenu';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { requestExpandedMode } from '@devvit/web/client';

export const Splash = () => {
  const { getDailyChallenge } = usePirateChestAPI();

  const [menuData, setMenuData] = useState({
    username: 'Cpt. Stranger',
    score: 0,
    mode: 'practice' as 'daily' | 'practice'
  });

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const data = await getDailyChallenge();

        if (data) {
          const determinedMode = data.attempts === 0 ? 'daily' : 'practice';

          console.log(determinedMode);
          setMenuData({
            username: data.username,
            score: data.stats.score,
            mode: 'practice',
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
      <NewMenu handleStart={handleStart} mode={menuData.mode} username={menuData.username} score={menuData.score} />
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
