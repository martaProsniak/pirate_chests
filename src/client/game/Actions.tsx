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
          color="teal"
          variant="light"
          aria-label="Replay Level"
          className="w-[50px] h-[50px] !p-0 flex items-center justify-center rounded-none"
        >
          <ReplayIcon className="text-2xl" />
        </GameButton>
      )}
      {showModalBtn && (
        <GameButton
          onClick={onShowModal}
          color="teal"
          variant="light"
          aria-label="Open Modal"
          className="w-[50px] h-[50px] !p-0 flex items-center justify-center rounded-none"
        >
          <ReopenModalIcon className="text-2xl" />
        </GameButton>
      )}
    </div>
  );
};
