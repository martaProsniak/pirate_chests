import { ReactNode, CSSProperties } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  image?: string;
}

export const Layout = ({ children, className = '', image }: LayoutProps) => {
  const backgroundStyles: CSSProperties = image ? {
    backgroundImage: `url("/images/${image}.png")`,
    backgroundRepeat: 'repeat',
    backgroundSize: image === 'wood' ? '512px auto' : '128px auto',
  } : {};

  const backgroundClass = image ? '' : 'bg-sky-500';

  return (
    <div
      className={`font-pirate flex flex-col items-center min-h-screen w-full h-full relative scrollbar-pirate ${backgroundClass} ${className}`}
      style={backgroundStyles}
    >
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow">
        {children}
      </div>
    </div>
  );
};
