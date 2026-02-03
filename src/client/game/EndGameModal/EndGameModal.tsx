import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { PostCommentResponse } from '../../../shared/types/api';
import { FindingsMap } from '../../../shared/types/game';
import { GuiButton } from '../../UI/GUIButton';
import styles from './EndGameModal.module.css';
import { CaptainsTable } from '../../UI/CaptainsTable/CaptainsTable';

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
  const { postComment } = usePirateChestAPI();

  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [commentId, setCommentId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setHasPosted(false);
      setIsPosting(false);
    }
  }, [isOpen]);

  const handleShareComment = async () => {
    if (isPosting || hasPosted) return;

    setIsPosting(true);
    try {
      const comment: PostCommentResponse | null = await postComment({
        score: points,
        isWin,
        wasBombed,
        moves,
        findings
      });
      setHasPosted(true);
      setCommentId(comment?.commentId || '');
    } catch (e) {
      console.error("Failed to share result", e);
    } finally {
      setIsPosting(false);
    }
  };

  if (!isOpen) return null;

  const getHeaderText = () => {
    if (isWin) {
      return {
        header: 'Yo Ho Ho!',
        paragraph: 'Ye found all the booty! The crew is rich!'
      }
    }
    if (wasBombed) {
      return {
        header: 'Blast it all!',
        paragraph: 'A bomb blew up right in yer face! All rum exploded!'
      }
    }
    return {
      header: 'Why is the Rum Gone?!',
      paragraph: 'The Cask is Empty! Yer mates refused to move!'
    }
  }

  const text = getHeaderText();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 transition-opacity" />
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
                {text.header}
              </h3>

              <p className="text-stone-200 text-sm sm:text-base px-2 font-indie font-bold">
                {text.paragraph}
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

            {mode === 'daily' && (
              <CaptainsTable />
            )}

            {(mode === 'daily' && !commentId) && (
              <div className="flex flex-col gap-2 items-center justify-center pt-2 border-t border-white/10">
                {(!hasPosted) ? (
                  <>
                    <p className="text-stone-300 text-xs italic">Show off yer loot to the crew!</p>
                    <GuiButton
                      variant="text"
                      onClick={handleShareComment}
                      image="menu_btn_emerald"
                      label={isPosting ? 'Scribbling...' : 'Brag in the Log'}
                      disabled={isPosting}
                    />
                  </>
                ) : (
                  <p className="text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-500/30 shadow-md">
                    <span>✅</span> Scribbled in the Log!
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
            label="One more Adventure"
          />
        </div>
      </div>
    </div>
  );
};
