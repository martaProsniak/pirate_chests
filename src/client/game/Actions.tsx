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
        <Button
          onClick={onRestart}
          image={'wood'}
          label="Replay Level"
          classes=""
        >
          <span className="px-4 py-1 text-amber-50 drop-shadow-xs drop-shadow-amber-900 font-pirate text-base">{!isEnd ? 'Reload!' : 'One more!'}</span>
        </Button>
      )}
      {showModalBtn && (
        <Button
          onClick={onShowModal!}
          label="Open Modal"
          image={'wood'}
          classes=""
        >
          <span className="px-4 py-1 text-white drop-shadow-xs drop-shadow-yellow-950 font-pirate text-base">Captains Log</span>
        </Button>
      )}
    </div>
  );
};
