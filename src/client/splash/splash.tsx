import '../index.css';
import { StrictMode, useState, MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { requestExpandedMode } from '@devvit/web/client';
import { Layout } from '../UI/Layout';
import { useRealtimeUserData } from '../hooks/useRealtimeUserData';
import { CaptainsTable } from '../UI/CaptainsTable/CaptainsTable';
import { Navigation, ViewState } from './Navigation/Navigation';
import { HomeView } from './HomeView/HomeView';
import { Guides } from './GuidesView/Guides';

export const Splash = () => {
  const { username, mode, loading } = useRealtimeUserData();
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleStartGame = (e: MouseEvent) => {
    void requestExpandedMode(e.nativeEvent, 'game');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView username={username} loading={loading} mode={mode} onStart={handleStartGame} />
        );

      case 'weekly-rank':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <CaptainsTable period="weekly" className="w-full" limit={10} />
          </div>
        );

      case 'daily-rank':
        return (
          <div className="w-full flex flex-col animate-fade-in">
            <CaptainsTable period="daily" className="w-full" limit={10} />
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
              className="max-h-20 object-contain animate-fade-in"
            />
          </div>

          <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 flex items-center justify-center h-full overflow-hidden relative z-10">
            <div className="glassPanel--blur-lg bg-amber-200/70 border-2 border-amber-200 rounded-xl w-full max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar p-4 flex flex-col items-center shadow-xl">
              {renderContent()}
            </div>
          </div>

          <div className="col-span-12 flex justify-center items-center z-50">
            <Navigation currentView={currentView} onViewChange={setCurrentView} />
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
