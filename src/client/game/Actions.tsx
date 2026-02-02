import { GuiButton } from '../UI/GUIButton';
import { Mode } from '../../shared/types/game';

export interface ActionsProps {
  onRestart: () => void;
  mode?: Mode;
  showModalBtn?: boolean;
  onShowModal?: () => void;
}

export const Actions = ({ onRestart, mode = 'practice', showModalBtn = false, onShowModal }: ActionsProps) => {

  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      {mode === 'practice' && (
        <GuiButton onClick={onRestart} label="Restart Game" image="replay_btn" />
      )}
      {showModalBtn && (
        <GuiButton onClick={onShowModal!} label="Show Modal" image="fullscreen_btn" />
      )}
    </div>
  );
};
