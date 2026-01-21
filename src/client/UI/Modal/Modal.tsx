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
          border-4 border-amber-900 
          shadow-2xl
          rounded-lg
          text-amber-900
          overflow-hidden
          pointer-events-auto
          ${styles.slideUpAnimation}
        `}
      >
        <div className="bg-amber-100/90 backdrop-blur-sm px-5 pt-3 pb-2 text-sm sm:text-base font-medium leading-snug">
          {children}
        </div>
        <div className="px-4 pb-3 pt-2 bg-amber-100 border-t-2 border-amber-800/20 flex justify-between items-center gap-4">
          <button
            onClick={onClose}
            className="
              px-4 py-0.5
              text-amber-900/70 hover:text-amber-900 hover:bg-amber-200/50
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
        bg-emerald-600 hover:bg-emerald-500
        text-white font-pirate text-base tracking-wider
        border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1
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
