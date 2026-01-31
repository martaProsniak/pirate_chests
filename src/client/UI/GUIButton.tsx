import { ReactNode } from 'react';

export type GuiBtnVariant = 'icon' | 'text' | 'svg';

export interface IGuiButtonProps {
  onClick: (args: any) => void;
  image: string;
  label: string;
  classes?: string | ReactNode;
  variant?: GuiBtnVariant,
  svgIcon?: ReactNode,
}

export const GuiButton = ({onClick, classes, label = '', image, variant = 'icon', svgIcon}: IGuiButtonProps) => {
  const size = variant !== 'text' ? 'w-8 h-8' : 'h-12 w-36 p-2';

  return (
    <button
      onClick={onClick}
      className={`${size} cursor-pointer flex items-center justify-center ${classes}`}
      aria-label={label}
      style={{
        backgroundImage: `url("/images/${image}.png")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {variant === 'text' && (
        <span className="text-[#A04623] text-shadow-2xs text-shadow-[#A2FFB6] text-base leading-4b mb-1">{label}</span>
      )}
      {variant === 'svg' && (
        <div className="h-full w-full flex items-center justify-center">
          {svgIcon}
        </div>
      )}
    </button>
  )
}
