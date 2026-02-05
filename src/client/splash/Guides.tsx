import { ReactNode } from 'react';
import { Header, ViewWrapper } from '../UI/ViewComponents';

export interface GuideProps {
  image: string;
  alt: string;
  children?: ReactNode;
}

const Guide = ({ image, alt, children }: GuideProps) => {
  return (
    <article className="flex flex-row flex-nowrap items-center justify-start gap-3 w-full p-2 bg-white rounded-md border border-amber-100 shadow-sm">
      <div className="size-8 shrink-0">
        <img src={`/images/${image}.png`} alt={alt} className="w-full h-full object-contain" />
      </div>
      <p className="text-base leading-tight font-bree font-normal text-amber-900">{children}</p>
    </article>
  );
};

export const Guides = () => {
  return (
    <ViewWrapper>
      <Header>Pirate Code</Header>
      <div className="flex flex-col gap-2 w-full">
        <Guide image="steps" alt="steps">
          Count steps to find the Booty!
        </Guide>
        <Guide image="bomb" alt="bomb">
          Watch for Bombs next to yer foot!
        </Guide>
        <Guide image="rum" alt="rum">
          Walkin' takes Rum. Don't run dry!
        </Guide>
      </div>
    </ViewWrapper>
  );
};
