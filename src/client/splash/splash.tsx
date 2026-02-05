import '../index.css';
import { StrictMode, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import { Layout } from '../UI/Layout';
import { useRealtimeUserData } from '../hooks/useRealtimeUserData';
import { CaptainsTable } from '../UI/CaptainsTable/CaptainsTable';
import { Navigation, ViewState } from './Navigation/Navigation';
import { HomeView } from './HomeView/HomeView';
import { StatsView } from './StatsView/StatsView';
import { Guides } from './Guides';

export const Splash = () => {
  const { username, mode, loading } = useRealtimeUserData();
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleStartGame = (e: MouseEvent) => {
    requestExpandedMode(e.nativeEvent, 'game');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView username={username} loading={loading} mode={mode} onStart={handleStartGame} />
        );

      case 'leaderboard':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <CaptainsTable className="w-full" limit={10} />
          </div>
        );

      case 'stats':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <StatsView />
          </div>
        );
      case 'guides':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <Guides />
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
        style={{ backgroundImage: 'url("/images/pirate-land.jpg")' }}
      >
        <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] h-full pt-4 pb-0 gap-y-4">

          <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 flex justify-center items-center z-20">
            <img
              src="/images/logo.png"
              alt="Pirate Chest"
              className="max-h-20 object-contain drop-shadow-2xl animate-fade-in"
            />
          </div>

          {/* Removed text-stone-800 */}
          <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 flex items-center justify-center h-full overflow-hidden relative z-10">
            {/* Removed bg-orange-50/40 */}
            <div className="glassPanel w-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar p-4 flex flex-col items-center">
              {renderContent()}
            </div>
          </div>

          <div className="col-span-12 flex justify-center items-center z-50">
            <Navigation currentView={currentView} onViewChange={setCurrentView}/>
          </div>

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
