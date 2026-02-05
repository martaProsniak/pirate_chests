import { ReactNode } from 'react';

interface ViewWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ViewWrapper = ({ children, className = '' }: ViewWrapperProps) => {
  return (
    <div className={`flex flex-col justify-start items-center w-full gap-4 py-2 ${className}`}>
      {children}
    </div>
  );
};

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className = '' }: HeaderProps) => {
  return (
    <h2 className={`font-pirate text-2xl text-amber-900 text-center mb-2 ${className}`}>
      {children}
    </h2>
  );
};
