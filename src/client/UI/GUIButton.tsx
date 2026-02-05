import { ReactNode } from 'react';

export interface IGuiButtonProps {
  onClick: (() => void) | ((e: any) => void);
  label: string;
  classes?: string | ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

export const GuiButton = ({
  onClick,
  classes,
  label = '',
  disabled = false,
  children,
}: IGuiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`glassPanel cursor-pointer flex items-center justify-center ${classes}`}
      aria-label={label}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
