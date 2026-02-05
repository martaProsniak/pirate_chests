import { ReactNode } from 'react';

export interface ButtonProps {
  onClick: (() => void )| ((e: any) => void);
  label: string;
  classes?: string | ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  image?: string;
}

export const Button = ({onClick, classes, label = '', disabled = false, children, image = 'yellow'}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-center ${classes}`}
      aria-label={label}
      disabled={disabled}
      style={{
        borderImageSource: `url("/images/buttons/btn_${image}.png")`,
        borderImageSlice: '18 fill',
        borderWidth: '4px',
        borderStyle: 'solid',
        background: 'none'
      }}
    >
      {children}
    </button>
  )
}
