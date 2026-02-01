import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  image?: string;
}

export const Layout = ({ children, className = '', image = 'wood' }: LayoutProps) => {
  return (
    <div className={`font-pirate flex flex-col items-center min-h-screen w-full h-full  relative ${className}`}
         style={{
           backgroundImage: `url("/images/${image}.png")`,
           backgroundRepeat: 'repeat',
           backgroundSize: `${image === 'wood' ? '512px' : '128px'} auto`,
           backgroundBlendMode: 'cover',
         }}
    >

      {/*<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>*/}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow">
        {children}
      </div>
    </div>
  );
};
