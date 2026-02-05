import { Mode } from '../../shared/types/game';
import { GuiButton } from '../UI/GUIButton';

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
        <GuiButton
          onClick={onRestart}
          label="Replay Level"
          classes="py-1 px-3 text-sky-800 font-pirate font-bold tracking-wide w-32 bg-white/20"
        >
          <span className="text-base">{!isEnd ? 'Reload!' : 'One more!'}</span>
        </GuiButton>
      )}
      {showModalBtn && (
        <GuiButton
          onClick={onShowModal!}
          label="Open Modal"
          classes="py-1 px-3 text-sky-800 font-pirate font-bold tracking-wide w-32 bg-white/20"
        >
          <span className="text-base">Captains Log</span>
        </GuiButton>
      )}
    </div>
  );
};
