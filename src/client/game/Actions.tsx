import { GuiButton } from '../UI/GUIButton';
import { Mode } from '../../shared/types/game';

interface ActionsProps {
  onRestart: () => void;
  mode?: Mode
}

export const Actions = ({ onRestart, mode = 'practice' }: ActionsProps) => {

  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      {mode === 'practice' && (
        <GuiButton onClick={onRestart} label="Restart Game" image="replay_btn" />
      )}
    </div>
  );
};
