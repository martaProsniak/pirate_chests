import '../index.css';
import { StrictMode, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import { Layout } from '../UI/Layout';
import { useRealtimeUserData } from '../hooks/useRealtimeUserData';
import { CaptainsTable } from '../UI/CaptainsTable/CaptainsTable';

type ViewState = 'home' | 'stats' | 'leaderboard' | 'guides' | 'settings';

export const Splash = () => {
  const { username, mode } = useRealtimeUserData();
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleStartGame = (e: MouseEvent) => {
    requestExpandedMode(e.nativeEvent, 'game');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center text-center gap-8 w-full animate-fade-in py-4">
            <h1 className="text-3xl md:text-4xl text-sky-100 font-pirate drop-shadow-md">
              Ahoy <span className="text-yellow-400">{username}</span>,
              <br />
              new loot is waiting!
            </h1>

            <button
              onClick={handleStartGame}
              className={`
                font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg
                ${mode === 'daily'
                ? 'bg-yellow-500 hover:bg-yellow-400 text-stone-900 text-2xl py-4 px-12 rounded-xl border-b-4 border-yellow-700'
                : 'bg-sky-600 hover:bg-sky-500 text-stone-50 text-lg py-3 px-8 rounded-lg border-b-4 border-sky-800'
              }
              `}
            >
              {mode === 'daily' ? 'Daily Cruise' : 'Casual Cruise'}
            </button>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <CaptainsTable className="w-full" limit={10} />
          </div>
        );

      case 'stats':
      case 'guides':
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center w-full animate-fade-in py-10">
            <div className="p-8 border-2 border-dashed border-sky-500/30 rounded-xl">
              <p className="text-sky-200/60 italic text-xl font-pirate">Work in progress, Matey!</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden relative"
        style={{ backgroundImage: 'url("/images/splash_bg.jpg")' }}
      >
        <div className="grid grid-cols-12 grid-rows-[1fr_auto] h-full pb-24 pt-6">

          <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 flex items-center justify-center h-full overflow-hidden">
            <div className="glassPanel w-full max-h-full overflow-y-auto custom-scrollbar p-6 flex flex-col items-center justify-center">
              {renderContent()}
            </div>
          </div>

          <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
            <div className="grid grid-cols-5 w-11/12 max-w-2xl bg-stone-900/95 backdrop-blur-xl rounded-2xl border border-sky-900/50 shadow-2xl overflow-hidden ring-1 ring-sky-500/20">
              <NavButton
                active={currentView === 'home'}
                onClick={() => setCurrentView('home')}
                label="Home"
                icon="/images/rum.png"
              />
              <NavButton
                active={currentView === 'stats'}
                onClick={() => setCurrentView('stats')}
                label="Stats"
                icon="/images/rum.png"
              />
              <NavButton
                active={currentView === 'leaderboard'}
                onClick={() => setCurrentView('leaderboard')}
                label="Rank"
                icon="/images/rum.png"
              />
              <NavButton
                active={currentView === 'guides'}
                onClick={() => setCurrentView('guides')}
                label="Guide"
                icon="/images/rum.png"
              />
              <NavButton
                active={currentView === 'settings'}
                onClick={() => setCurrentView('settings')}
                label="Gear"
                icon="/images/rum.png"
              />
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}

const NavButton = ({ active, onClick, label, icon }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`
      font-bree flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 relative overflow-hidden group
      ${active
      ? 'text-sky-300 bg-sky-900/40'
      : 'text-sky-700/60 hover:text-sky-200 hover:bg-sky-900/20'
    }
    `}
  >
    {active && (
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
    )}

    <img
      src={icon}
      alt={label}
      className={`h-6 w-6 object-contain mb-1 transition-transform duration-300 ${active ? 'scale-110 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]' : 'opacity-50 group-hover:opacity-100 group-hover:scale-105'}`}
    />

    <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
  </button>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
