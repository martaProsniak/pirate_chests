import React, { useEffect, useState } from 'react';
import { requestExpandedMode } from '@devvit/web/client';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { DailyChallengeResponse } from '../../shared/types/api';
import { TrophyIcon, ScrollIcon } from '../UI/icons';
import { GuiButton } from '../UI/GUIButton';

interface MenuProps {
  onStart?: (mode?: 'daily' | 'practice', seed?: string) => void;
  onShowLeaderboard?: () => void;
  onShowGuides?: () => void;
}

export const Menu = ({ onStart, onShowLeaderboard, onShowGuides }: MenuProps) => {
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

  const handlePlay = (e: React.MouseEvent, mode: 'daily' | 'practice') => {
    requestExpandedMode(e.nativeEvent, 'game');

    // 2. Start gry
    // Jeśli daily, przekazujemy seed z API. Jeśli practice, seed undefined (losowy)
    const seed = mode === 'daily' ? dailyData?.seed : undefined;
    if (onStart) {
      onStart(mode, seed);
    }
  };

  const hasPlayedDaily = dailyData ? dailyData.attempts > 0 : false;
  const totalGold = dailyData?.stats?.findings?.gold ?? 0;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full text-amber-950 font-sans relative overflow-hidden"
    >
      {/* Kontener ograniczający szerokość (100% mobile, 70% tablet+) */}
      <div className="w-full h-full max-h-screen flex flex-col items-center justify-center gap-2 px-6 py-4 relative z-10">

        {/* --- LOGO --- */}
        <div className="drop-shadow-2xl filter animate-fade-in flex items-center">
          <img
            src="/images/logo.png"
            alt="Pirate Sweeper Logo"
            className="h-32 w-36 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* --- GŁÓWNE PRZYCISKI (Obrazkowe Tło) --- */}
        <div className="flex flex-col gap-2 w-[220px]">

          {/* 1. DAILY CHALLENGE */}
          <button
            onClick={(e) => handlePlay(e, 'daily')}
            disabled={loading || hasPlayedDaily}
            className={`
              relative group flex flex-col items-center justify-center
              h-14 w-full
              text-amber-100 font-pirate text-2xl tracking-widest uppercase
              transition-all duration-150 active:scale-95
              drop-shadow-lg hover:drop-shadow-xl
              ${(loading || hasPlayedDaily) ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:brightness-110'}
            `}
            style={{
              backgroundImage: 'url("/images/menu_btn.png")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {loading ? (
              <span className="text-sm font-sans animate-pulse">Loading Map...</span>
            ) : hasPlayedDaily ? (
              <div className="flex flex-col items-center leading-none mt-[-4px]">
                <span className="text-gray-300 text-xl">Daily Done</span>
                <span className="text-[10px] font-sans text-gray-400 normal-case tracking-normal opacity-80 mt-1">
                  Come back tomorrow!
                </span>
              </div>
            ) : (
              <span className="mt-[-4px] drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
                Daily Run
              </span>
            )}
          </button>

          {/* 2. PRACTICE MODE */}
          <button
            onClick={(e) => handlePlay(e, 'practice')}
            disabled={loading}
            className="
              relative group flex items-center justify-center
              h-14 w-full
              text-amber-100 font-pirate text-xl tracking-wider uppercase
              transition-all duration-150 active:scale-95
              drop-shadow-lg hover:drop-shadow-xl hover:brightness-110
            "
            style={{
              backgroundImage: 'url("/images/menu_btn.png")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              filter: 'hue-rotate(-15deg) sepia(0.3)' // Lekka zmiana odcienia dla odróżnienia
            }}
          >
            <span className="mt-[-4px] drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
              Practice
            </span>
          </button>
        </div>

        {/* --- DRUGI RZĄD (GUI BUTTONS) --- */}
        <div className="flex gap-4 w-full max-w-xs justify-center mt-2">

          <GuiButton
            variant="svg"
            onClick={onShowLeaderboard}
            // classes="w-14 h-14"
            image="empty_btn"
            label={"Leaderboard"}
            svgIcon={<TrophyIcon className="w-4 h-4 text-yellow-500 drop-shadow-md" />}
          >

          </GuiButton>

          <GuiButton
            variant="svg"
            onClick={onShowGuides}
            // classes="w-14 h-14"
            image="empty_btn"
            label={"Guides"}
            svgIcon={<ScrollIcon className="w-4 h-4 text-amber-100 drop-shadow-md" />}
          >
          </GuiButton>

        </div>

        {dailyData && (
          <div className="mt-8 flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-amber-100 font-mono text-xs border border-white/10 shadow-lg">
            <span className="opacity-80">Lifetime Loot:</span>
            <span className="text-yellow-400 font-bold text-sm">{totalGold}</span>
          </div>
        )}

      </div>

      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />
    </div>
  );
};
