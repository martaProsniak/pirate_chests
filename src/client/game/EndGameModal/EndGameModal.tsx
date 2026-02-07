import { FindingsMap } from '../../../shared/types/game';
import styles from './EndGameModal.module.css';
import { CaptainsTable } from '../../UI/CaptainsTable/CaptainsTable';
import { ShareCommentSection } from '../ShareCommentSection/ShareCommentSection';
import { Button } from '../../UI/Button';
import { Header } from '../../UI/ViewComponents';
import { useRef } from 'react';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins > 0 ? mins + 'm' : ''} ${secs}s`;
};

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
  time: number;
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
  time
}: EndGameModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose();
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }

  const getHeaderText = () => {
    if (isWin) {
      return {
        header: 'Yo Ho Ho!',
        paragraph: 'Ye found all the booty! The crew is rich!',
      };
    }
    if (wasBombed) {
      return {
        header: 'Blast it all!',
        paragraph: 'A bomb blew up right in yer face! All rum exploded!',
      };
    }
    return {
      header: 'Why is the Rum Gone?!',
      paragraph: 'The Cask is Empty! Yer mates refused to move!',
    };
  };

  const text = getHeaderText();

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center px-4 ${isOpen ? 'flex' : 'hidden'}`}
      onClick={handleClose}
    >
      <div className={`absolute inset-0 bg-stone-950/80 backdrop-blur-sm ${isOpen ? styles.fadeInAnimation : ''}`} />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        relative w-10/12 sm:w-9/12 md:w-8/12 max-w-md 
        flex flex-col
        max-h-[85vh] h-auto
        overflow-hidden
        rounded-lg
        border-[6px] border-[#3e2723]
        shadow-[0_0_25px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.7)]
        ${isOpen ? styles.slideDownAnimation : ''}
      `}
        style={{
          backgroundImage: `url("/images/wood.png")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px auto',
          backgroundColor: '#5d4037'
        }}
      >
        <div className="endModal flex-1 overflow-y-auto p-5 scrollbar-pirate"
             ref={contentRef}
        >
          <div className="flex flex-col gap-5 text-center">

            <div className="flex flex-col gap-3 py-2">
              <h3
                className={`
                font-pirate text-4xl tracking-wider
                ${isWin
                  ? 'text-[#fbbf24] drop-shadow-[2px_3px_0_rgba(66,32,6,1)]'
                  : 'text-rose-400 text-shadow-rose-900 text-shadow-sm'
                }
              `}
              >
                {text.header}
              </h3>

              <p className="text-amber-100 text-shadow-sm text-shadow-amber-950 text-lg px-2 font-indie leading-tight">
                {text.paragraph}
              </p>
            </div>

            <div className="overflow-hidden drop-shadow-lg"
                 style={{
                   borderImageSource: 'url("/images/banner_hud.png")',
                   borderImageSlice: '96 fill',
                   borderWidth: '20px',
                   borderStyle: 'solid',
                   background: 'none',
                   filter: 'sepia(0.2)'
                 }}
            >
              <div className="py-2">
                <Header>
                  Total Loot
                </Header>
                <div className="text-amber-600 text-shadow-amber-950 text-shadow-sm font-bree font-bold text-3xl block tracking-wider">
                  {points}
                </div>
              </div>

              <div className="p-3 flex justify-center gap-6 font-bree">

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/chest.png" alt="Chest" className="size-12 object-contain drop-shadow-sm opacity-90" />
                  <span className="font-bold text-[#5c3a21] text-lg leading-none">{findings.chest}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/gold.png" alt="Gold" className="size-12 object-contain drop-shadow-sm opacity-90" />
                  <span className="font-bold text-[#5c3a21] text-lg leading-none">{findings.gold}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img src="/images/fish.png" alt="Fish" className="size-12 object-contain drop-shadow-sm opacity-90" />
                  <span className="font-bold text-[#5c3a21] text-lg leading-none">{findings.fish}</span>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center gap-1 py-3">
                <div className="size-2">
                  <img className="w-full h-full object-contain" src="/images/hourglass.png" alt="Time" />
                </div>
                <div className="text-[#5c3a21] font-bree font-bold text-xl tracking-wider">
                  {formatTime(time)}
                </div>
              </div>
            </div>

            {mode === 'daily' && (
              <div className="">
                <ShareCommentSection
                  score={points}
                  isWin={isWin}
                  wasBombed={wasBombed}
                  moves={moves}
                  findings={findings}
                />
              </div>
            )}

            {mode === 'daily' && (
              <div className="overflow-hidden">
                <CaptainsTable variant="endgame" className="" />
              </div>
            )}

            <div className="h-2"></div>
          </div>
        </div>

        <div className="p-3 border-t-2 border-[#3e2723] bg-[#2a1a10]/30 flex justify-center items-center gap-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
          <Button image={'yellow'} label={'Replay'} onClick={onRestart}>
          <span
            className='px-8 py-2 text-[#422006] font-pirate text-xl font-bold tracking-wide'>
            Casual Raid
          </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
