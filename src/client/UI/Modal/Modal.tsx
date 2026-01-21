import { ReactNode, useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '../icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.gameDialog}
      onCancel={handleCancel}
      onClick={(e) => {
        const dialogDimensions = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative w-[90vw] max-w-md
          bg-amber-100
          border-4 border-amber-900
          shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]
          rounded-lg
          text-amber-900
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 p-1
            text-amber-800 hover:text-red-700 hover:bg-amber-200
            border-2 border-transparent hover:border-amber-800 rounded
            transition-colors
          "
        >
          <CloseIcon />
        </button>

        {title && (
          <div className="bg-amber-200/50 px-6 pt-5 pb-3 border-b-2 border-amber-800/20">
            <h2 className="text-2xl font-black uppercase tracking-wide text-amber-900 drop-shadow-sm">
              {title}
            </h2>
          </div>
        )}

        <div className="px-6 py-6 text-lg font-medium leading-relaxed">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 bg-amber-200/30 border-t-2 border-amber-800/20 flex justify-center">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
};
