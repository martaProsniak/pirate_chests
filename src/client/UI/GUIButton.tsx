import { ReactNode } from 'react';

export type GuiBtnVariant = 'icon' | 'text' | 'svg';

export interface IGuiButtonProps {
  onClick: (args: any) => void;
  image: string;
  label: string;
  classes?: string;
  variant?: GuiBtnVariant,
  svgIcon?: ReactNode,
}

export const GuiButton = ({onClick, classes, label = '', image, variant = 'icon', svgIcon}: IGuiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer ${classes}`}
      aria-label={label}
      style={{
        backgroundImage: `url("/images/${image}.png")`,
        backgroundSize: variant === 'text' ? '92px 48px' : '48px 48px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {variant === 'text' && (
        <span>{label}</span>
      )}
      {variant === 'svg' && (
        <div className="h-full w-full flex items-center justify-center">
          {svgIcon}
        </div>
      )}
    </button>
  )
}
