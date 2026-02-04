import '../index.css';
import { StrictMode, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import { Layout } from '../UI/Layout';
import { useRealtimeUserData } from '../hooks/useRealtimeUserData';
import { CaptainsTable } from '../UI/CaptainsTable/CaptainsTable';
import { Navigation, ViewState } from './Navigation/Navigation';
import { HomeView } from './HomeView/HomeView';

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
          <HomeView username={username} mode={mode} onStart={handleStartGame} />
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

          <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 flex items-center justify-center h-full overflow-hidden text-stone-800">
            <div className="glassPanel w-full max-h-full overflow-y-auto custom-scrollbar p-6 flex flex-col items-center justify-center">
              {renderContent()}
            </div>
          </div>

          <Navigation currentView={currentView} onViewChange={setCurrentView} />

        </div>
      </div>
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
