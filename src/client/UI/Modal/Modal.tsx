import styles from './Modal.module.css';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  handleRestart: () => void;
}

export const Modal = ({ isOpen, onClose, children, handleRestart }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">

      <div
        className={`
          relative w-full max-w-md 
          text-oragne-200 py-6 px-10
          overflow-hidden
          pointer-events-auto
          ${styles.slideUpAnimation}
        `}
        style={{
          backgroundImage: 'url("/images/wooden_banner_wide.png")',
          backgroundSize: '142% 280%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="pb-2 text-sm sm:text-base font-medium leading-snug"
        >
          {children}
        </div>
        <div className="pt-2  border-t-2  flex justify-between items-center gap-4">
          <button
            onClick={onClose}
            className="
              px-4 py-0.5
              text-orange-100 hover:text-orange-300
              font-pirate text-base tracking-wider
              border-2 border-transparent hover:border-amber-800/30
              rounded transition-all
            "
          >
            Close
          </button>
          <button
            onClick={handleRestart}
            className="
        px-4 py-0.5
        bg-green-600 hover:bg-green-500
        text-white font-pirate text-base tracking-wider
        border-b-4 border-green-800 active:border-b-0 active:translate-y-1
        rounded shadow-md transition-all
      "
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
