import { Mode } from '../../shared/types/game';
import { Button } from '../UI/Button';

export interface ActionsProps {
  onRestart: () => void;
  mode?: Mode;
  showModalBtn?: boolean;
  onShowModal?: () => void;
  isEnd?: boolean;
}

export const Actions = ({
  onRestart,
  mode = 'practice',
  showModalBtn = false,
  onShowModal,
  isEnd = false,
}: ActionsProps) => {
  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      {(mode === 'practice' || (mode === 'daily' && isEnd)) && (
        <Button onClick={onRestart} image={'water'} label="Replay Level" classes="">
          <span className="px-4 py-1 w-[20ch] text-sky-900 text-shadow-xs text-shadow-sky-600 font-pirate text-base sm:text-lg">
            {!isEnd ? 'Reload!' : 'One more!'}
          </span>
        </Button>
      )}
      {showModalBtn && (
        <Button onClick={onShowModal!} label="Open Modal" image={'water'} classes="">
          <span className="px-4 py-1 w-[20ch] text-sky-900 text-shadow-xs text-shadow-sky-600 font-pirate text-base sm:text-lg">
            Captains Log
          </span>
        </Button>
      )}
    </div>
  );
};
