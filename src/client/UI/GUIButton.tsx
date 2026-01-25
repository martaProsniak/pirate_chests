export interface IGuiButtonProps {
  onClick: (args: any) => void;
  image: string;
  label: string;
  classes?: string;
}

export const GuiButton = ({onClick, classes, label = '', image}: IGuiButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer ${classes}`}
      aria-label={label}
      style={{
        backgroundImage: `url("/images/${image}.png")`,
        backgroundSize: '140% 140%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    </button>
  )
}
