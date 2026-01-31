import { GuiButton } from '../UI/GUIButton';
import { requestExpandedMode } from '@devvit/web/client';
import { ReactNode, useEffect, useState } from 'react';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { DailyChallengeResponse } from '../../shared/types/api';

export interface GuideProps {
  image: string;
  alt: string;
  children?: ReactNode;
}

const Guide = ({image, alt, children}: GuideProps) => {
  return (
    <article className="flex flex-row flex-nowrap items-center justify-start gap-1 w-full">
      <div className="w-6 h-6">
        <img src={`/images/${image}.png`} alt={alt} className="w-full h-full object-contain" />
      </div>
      <p className="text-lg leading-5 text-stone-800 font-indie font-bold">{children}</p>
    </article>
  );
}


export const NewMenu = () => {

  const { getDailyChallenge, loading } = usePirateChestAPI();
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
    <main className="flex flex-col items-center justify-between min-h-screen max-h-screen p-0 pt-4 gap-2 w-full relative"
         style={{
           backgroundImage: 'url("/images/wood.png")',
           backgroundRepeat: 'repeat',
           backgroundSize: '512px auto',
         }}
    >
      <section className="flex flex-col items-center w-full">
        <div className="h-[80px] w-full"
             style={{
               backgroundImage: 'url("/images/logo.png")',
               backgroundSize: 'contain',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
             }}
             aria-label="Pirate Chest"
        >
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-2 max-w-[70%] min-w-[320px] w-full drop-shadow-2xl drop-shadow-amber-950"
        style={{
          borderImageSource: 'url("/images/banner_hud.png")',
          borderImageSlice: '96 fill',
          borderWidth: '34px',
          borderStyle: 'solid',
          background: 'none'
        }}
      >

        <Guide image="steps" alt="steps">
            Count steps to find treasures!
        </Guide>
        <Guide image="bomb" alt="bomb">
            Be careful of surrounding bombs!
        </Guide>
        <Guide image="rum" alt="rum">
            Moves costs rum. Don't run dry!
        </Guide>
        <Guide image="money" alt="money">
            Treasures and rum are sold for gold!
        </Guide>


      </section>
      <section className="flex flex-col items-center justify-center w-full gap-2">
        <GuiButton image="menu_btn" label="Start digging!" variant="text" onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')} />
        <div className="flex flex-row items-center">
          <GuiButton image="leadership_btn" label="Leaders" variant="icon" onClick={() => console.log("Leaders")} />
        </div>
      </section>
      <footer className="text-amber-100 text-center w-full  p-1 bg-amber-950/60">
      {dailyData ? (
          <p>Ahoy, {dailyData?.username}! Yer total loot is {totalGold}</p>
      ) : <p>
        Ahoy, Matey!
      </p>}
      </footer>
    </main>
  )
}
