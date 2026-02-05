import { Mode } from '../../shared/types/game';
import { GameButton } from '../UI/GameButton';
import { ReopenModalIcon, ReplayIcon } from '../UI/icons';

export interface ActionsProps {
  onRestart: () => void;
  mode?: Mode;
  showModalBtn?: boolean;
  onShowModal?: () => void;
  isEnd?: boolean;
}

export const Actions = ({ onRestart, mode = 'practice', showModalBtn = false, onShowModal, isEnd = false }: ActionsProps) => {
  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      {(mode === 'practice' || (mode === 'daily' && isEnd)) && (
        <GameButton
          onClick={onRestart}
          color="cyan"
          variant="light"
          aria-label="Replay Level"
          className="p-2 flex items-center justify-center rounded-md shadow-md"
        >
          <ReplayIcon className="text-2xl fot-bold" />
        </GameButton>
      )}
      {showModalBtn && (
        <GameButton
          onClick={onShowModal}
          color="cyan"
          variant="light"
          aria-label="Open Modal"
          className="w-[50px] h-[50px] flex items-center justify-center rounded-md shadow-md"
        >
          <ReopenModalIcon className="text-2xl rotate-y-180" />
        </GameButton>
      )}
    </div>
  );
};
