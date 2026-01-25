import { GuiButton } from '../UI/GUIButton';

interface ActionsProps {
  onRestart: () => void;
  onFullscreen?: (e: any) => void;
  showFullscreenButton?: boolean;
}

export const Actions = ({ onRestart, onFullscreen, showFullscreenButton = false }: ActionsProps) => {

  return (
    <div className="fixed bottom-2 right-4 flex md:flex-col items-end gap-2 z-20">
      <GuiButton onClick={onRestart} label="Restart Game" image="replay_btn" />

      {showFullscreenButton && onFullscreen && (
        <GuiButton onClick={onFullscreen} label="Full screen" image="fullscreen_btn" />
      )}
    </div>
  );
};
