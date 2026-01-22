import { ReplayIcon, FullScreenIcon } from '../UI/icons';

interface ActionsProps {
  onRestart: () => void;
  onFullscreen?: (e: any) => void;
  showFullscreenButton?: boolean;
}

export const Actions = ({ onRestart, onFullscreen, showFullscreenButton = false }: ActionsProps) => {
  const btnClasses = `
    flex items-center justify-center
    w-10 h-10
    bg-emerald-600 hover:bg-emerald-500
    text-white cursor-pointer
    border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 active:mt-1
    rounded-lg shadow-md transition-all
  `;

  return (
    <div className="flex items-end gap-3">
      {/* Replay Button */}
      <button
        onClick={onRestart}
        className={btnClasses}
        aria-label="Restart Game"
      >
        <ReplayIcon />
      </button>

      {/* Fullscreen Button */}
      {showFullscreenButton && onFullscreen && (
        <button
          onClick={onFullscreen}
          className={btnClasses}
          aria-label="Full Screen"
        >
          <FullScreenIcon />
        </button>
      )}
    </div>
  );
};
