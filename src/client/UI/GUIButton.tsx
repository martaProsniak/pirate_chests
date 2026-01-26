export interface IGuiButtonProps {
  onClick: (args: any) => void;
  image: string;
  label: string;
  classes?: string;
  variant?: 'icon' | 'text'
}

export const GuiButton = ({onClick, classes, label = '', image, variant = 'icon'}: IGuiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer ${classes}`}
      aria-label={label}
      style={{
        backgroundImage: `url("/images/${image}.png")`,
        backgroundSize: variant === 'icon' ? '140% 140%' : '280% 140%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {variant === 'text' && (
        <span>{label}</span>
      )}
    </button>
  )
}
