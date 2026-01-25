import { ReplayIcon, FullScreenIcon } from '../UI/icons';

interface ActionsProps {
  onRestart: () => void;
  onFullscreen?: (e: any) => void;
  showFullscreenButton?: boolean;
}

export const Actions = ({ onRestart, onFullscreen, showFullscreenButton = false }: ActionsProps) => {
  const btnClasses = `
    flex items-center justify-center
    w-8 h-8
    text-white cursor-pointer
    active:translate-y-1 active:mt-1
  `;

  return (
    <div className="flex items-end gap-2 mr-3"
    >
      {/* Replay Button */}
      <button
        onClick={onRestart}
        className={btnClasses}
        aria-label="Restart Game"
        style={{
          backgroundImage: 'url("/images/button_bg.png")',
          backgroundSize: '140% 140%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ReplayIcon className="w-4 h-4 mb-1 text-amber-900" />
      </button>

      {/* Fullscreen Button */}
      {showFullscreenButton && onFullscreen && (
        <button
          onClick={onFullscreen}
          className={btnClasses}
          aria-label="Full Screen"
          style={{
            backgroundImage: 'url("/images/button_bg.png")',
            backgroundSize: '140% 140%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <FullScreenIcon className="w-4 h-4 mb-1 text-amber-900" />
        </button>
      )}
    </div>
  );
};
