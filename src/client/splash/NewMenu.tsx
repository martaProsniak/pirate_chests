import { GuiButton } from '../UI/GUIButton';
import { requestExpandedMode } from '@devvit/web/client';
import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { DailyChallengeResponse } from '../../shared/types/api';
import { Guides } from './Guides';
import { SplashFooter } from './SplashFooter';


export const NewMenu = () => {

  const { getDailyChallenge } = usePirateChestAPI();
  const [dailyData, setDailyData] = useState<DailyChallengeResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDailyChallenge();
      if (data) {
        setDailyData(data);
      }
    };
    fetchData();
  }, [getDailyChallenge]);

  const totalGold = dailyData?.stats?.findings?.gold ?? 0;

  return (
    <main className="flex flex-col items-center justify-between min-h-screen h-auto p-0 pt-2 gap-2 w-full relative">
      <section className="flex flex-row items-center justify-center h-16 w-10/12 grow">
        <img src="/images/logo.png" alt="Pirate Chest" className="w-full h-full object-contain" />
      </section>
      <Guides />
      <section className="flex flex-col items-center justify-center w-full gap-2 grow">
        <GuiButton image="menu_btn" label="To the Seas!" variant="text" onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')} />
        <div className="flex flex-row items-center">
          <GuiButton image="leadership_btn" label="Leaders" variant="icon" onClick={() => console.log("Leaders")} />
        </div>
      </section>
      <SplashFooter totalGold={totalGold} username={dailyData?.username} />
    </main>
  )
}
