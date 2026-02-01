import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { FindingsMap } from '../../../shared/types/game';
import { GuiButton } from '../../UI/GUIButton';
import styles from './EndGameModal.module.css';

interface EndGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  mode: 'daily' | 'practice';
  isWin: boolean;
  wasBombed: boolean;
  points: number;
  findings: FindingsMap;
  moves: number;
}

export const EndGameModal = ({
                               isOpen,
                               onClose,
                               onRestart,
                               mode,
                               isWin,
                               wasBombed,
                               points,
                               findings,
                               moves,
                             }: EndGameModalProps) => {
  const { getLeaderboard, postComment } = usePirateChestAPI();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLB, setLoadingLB] = useState(false);

  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);

  // Reset stanu po otwarciu
  useEffect(() => {
    if (isOpen) {
      setHasPosted(false);
      setIsPosting(false);
    }
  }, [isOpen]);

  // Pobieranie leaderboardu (Tylko dla Daily)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (isOpen && mode === 'daily') {
        setLoadingLB(true);
        try {
          const data = await getLeaderboard();
          if (data && data.entries) {
            setLeaderboard(data.entries.slice(0, 5));
          }
        } catch (e) {
          console.error("Failed to load leaderboard", e);
        } finally {
          setLoadingLB(false);
        }
      }
    };

    fetchLeaderboard();
  }, [isOpen, mode, getLeaderboard]);

  const handleShareComment = async () => {
    if (isPosting || hasPosted) return;

    setIsPosting(true);
    try {
      await postComment({
        score: points,
        isWin,
        wasBombed,
        moves,
        findings
      });
      setHasPosted(true);
    } catch (e) {
      console.error("Failed to share result", e);
    } finally {
      setIsPosting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-full max-w-md 
          flex flex-col
          max-h-[85vh] h-auto
          text-stone-100 
          border-amber-900 border-4 rounded-lg drop-shadow-2xl
          overflow-hidden
          ${styles.slideDownAnimation}
        `}
        style={{
          backgroundImage: `url("/images/wood.png")`,
          backgroundRepeat: 'repeat',
          backgroundSize: `512px auto`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
      >
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <div className="flex flex-col gap-5 text-center">

            <div>
              <h3 className={`font-pirate text-4xl mb-2 drop-shadow-sm ${isWin ? 'text-emerald-300' : 'text-red-300'}`}>
                {isWin ? "Victory!" : "Game Over!"}
              </h3>

              <p className="text-stone-200 text-sm sm:text-base px-2 font-indie font-bold">
                {isWin && "Ye found all the treasures! The crew is rich!"}
                {wasBombed && "Blimey! A bomb blew up right in yer face!"}
                {(!isWin && !wasBombed) && (
                  "Arrr! Out of rum! The lazy crew refused to move!"
                )}
              </p>
            </div>

            <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden shadow-inner">

              <div className="bg-black/20 p-3 border-b border-white/10">
                 <span className="text-emerald-400 font-bold text-3xl block font-pirate tracking-wider drop-shadow-md">
                    {points}
                 </span>
                <span className="text-xs uppercase text-stone-300 font-bold">
                    Total Loot
                 </span>
              </div>

              <div className="p-3 flex justify-center gap-6">

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/chest.png" alt="Chest" className="w-8 h-8 object-contain drop-shadow-md" />
                  <span className="font-bold text-stone-100 text-lg leading-none drop-shadow">x{findings.chest}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/gold.png" alt="Gold" className="w-8 h-8 object-contain drop-shadow-md" />
                  <span className="font-bold text-stone-100 text-lg leading-none drop-shadow">x{findings.gold}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/fish.png" alt="Fish" className="w-8 h-8 object-contain drop-shadow-md" />
                  <span className="font-bold text-stone-100 text-lg leading-none drop-shadow">x{findings.fish}</span>
                </div>
              </div>
            </div>

            {(mode === 'daily' || mode === 'practice') && (
              <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                <h4 className="text-amber-200 font-pirate text-xl mb-2 border-b border-white/10 pb-1">
                  Captains Table
                </h4>

                {loadingLB ? (
                  <div className="text-stone-400 text-xs py-2 animate-pulse italic">Scouting results...</div>
                ) : leaderboard.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {leaderboard.map((entry, index) => (
                      <div key={`${entry.username}-${index}`} className="flex justify-between items-center text-xs sm:text-sm px-2 py-1 odd:bg-white/5 rounded">
                        <div className="flex gap-2 items-center">
                          <span className="text-amber-500 font-bold w-4 text-right">{index + 1}.</span>
                          <span className="text-stone-300 font-bold truncate max-w-[120px]">{entry.username}</span>
                        </div>
                        <span className="text-amber-400 font-mono font-bold">{entry.score}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-stone-300 text-xs py-2 italic">Be the first captain today!</div>
                )}
              </div>
            )}

            {(mode === 'daily' || mode === 'practice') && (
              <div className="flex flex-col gap-2 items-center justify-center pt-2 border-t border-white/10">
                {!hasPosted ? (
                  <>
                    <p className="text-stone-300 text-xs italic">Show off yer loot to the crew!</p>
                    <GuiButton
                      variant="text"
                      onClick={handleShareComment}
                      image="menu_btn"
                      label={isPosting ? 'Scribbling...' : 'Share results!'}
                      disabled={isPosting}
                    />
                  </>
                ) : (
                  <p className="text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-500/30 shadow-md">
                    <span>✅</span> Posted to comments!
                  </p>
                )}
              </div>
            )}

            <div className="h-2"></div>
          </div>
        </div>

        <div className="p-3 border-t border-white/10 bg-black/40 flex justify-between items-center gap-4 shrink-0 backdrop-blur-sm shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
          <GuiButton onClick={onClose} variant="icon" image="close" label="Close" classes="size-10" />

          <GuiButton
            variant="text"
            onClick={onRestart}
            image="menu_btn_arrow"
            label="New Adventure"
          />
        </div>

      </div>
    </div>
  );
};
