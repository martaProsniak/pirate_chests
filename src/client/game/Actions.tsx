import { GuiButton } from '../UI/GUIButton';

interface ActionsProps {
  onRestart: () => void;
}

export const Actions = ({ onRestart }: ActionsProps) => {

  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      <GuiButton onClick={onRestart} label="Restart Game" image="replay_btn" />
    </div>
  );
};
