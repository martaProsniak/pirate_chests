import { FindingsMap } from '../../../shared/types/game';
import styles from './EndGameModal.module.css';
import { CaptainsTable } from '../../UI/CaptainsTable/CaptainsTable';
import { ShareCommentSection } from '../ShareCommentSection/ShareCommentSection';
import { Button } from '../../UI/Button';

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
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-sm ${isOpen ? styles.fadeInAnimation : ''}`}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          glassPanel bg-white/80
          relative w-10/12 sm:w-9/12 md: w-8/12 max-w-md 
          flex flex-col
          max-h-[85vh] h-auto
          overflow-hidden
          ${isOpen ? styles.slideDownAnimation : ''}
        `}
      >
        <div className="endModal flex-1 overflow-y-auto p-5 scrollbar-pirate">
          <div className="flex flex-col gap-5 text-center">
            <div>
              <h3 className={`font-pirate text-xl mb-2`}>{text.header}</h3>

              <p className="text-base px-2 font-bree">{text.paragraph}</p>
            </div>

            <div className="rounded-lg border overflow-hidden shadow-sm">
              <div className="p-3 border-b">
                <span className="font-bree font-bold text-2xl block tracking-wider drop-shadow-xs">
                  {points}
                </span>
                <span className="text-xs uppercase font-pirate font-bold">Total Loot</span>
              </div>

              <div className="p-3 flex justify-center gap-6 font-bree">
                <div className="flex flex-col items-center gap-1">
                  <img
                    src="/images/chest.png"
                    alt="Chest"
                    className="w-8 h-8 object-contain drop-shadow-md"
                  />
                  <span className="font-bold text-lg leading-none">x{findings.chest}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img
                    src="/images/gold.png"
                    alt="Gold"
                    className="w-8 h-8 object-contain drop-shadow-md"
                  />
                  <span className="font-bold text-lg leading-none">x{findings.gold}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <img
                    src="/images/fish.png"
                    alt="Fish"
                    className="w-8 h-8 object-contain drop-shadow-md"
                  />
                  <span className="font-bold text-lg leading-none">x{findings.fish}</span>
                </div>
              </div>
            </div>

            {mode === 'practice' && (
              <ShareCommentSection
                score={points}
                isWin={isWin}
                wasBombed={wasBombed}
                moves={moves}
                findings={findings}
              />
            )}

            {mode === 'practice' && (
              <div className="rounded-xl overflow-hidden border">
                <CaptainsTable variant="endgame" className="border-none" />
              </div>
            )}

            <div className="h-2"></div>
          </div>
        </div>

        <div className="p-2 border-t flex justify-center items-center gap-4 shrink-0 backdrop-blur-sm shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <Button image={'water'} label={'Replay'} onClick={onRestart}>
            <span
              className={
                'px-6 py-2 text-rose-50 drop-shadow-xs drop-shadow-rose-900 font-pirate text-lg shadow-md'
              }
            >
              Casual Raid
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
