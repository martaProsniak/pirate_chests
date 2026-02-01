import { ReactNode } from 'react';

export interface GuideProps {
  image: string;
  alt: string;
  children?: ReactNode;
}

const Guide = ({image, alt, children}: GuideProps) => {
  return (
    <article className="flex flex-row flex-nowrap items-center justify-start gap-2 w-full">
      <div className="size-7">
        <img src={`/images/${image}.png`} alt={alt} className="w-full h-full object-contain" />
      </div>
      <p className="text-lg leading-5 text-stone-800 font-indie font-bold">{children}</p>
    </article>
  );
}

export const Guides= () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-2 max-w-[70%] min-w-[320px] w-full drop-shadow-md drop-shadow-amber-950 shrink-0"
      style={{
        borderImageSource: 'url("/images/banner_hud.png")',
        borderImageSlice: '96 fill',
        borderWidth: '28px',
        borderStyle: 'solid',
        background: 'none'
      }}
    >
      <Guide image="steps" alt="steps">
        Count steps to find the Booty!
      </Guide>
      <Guide image="bomb" alt="bomb">
        Watch for Bombs next to yer foot!
      </Guide>
      <Guide image="rum" alt="rum">
        Walkin' takes Rum. Don't run dry!
      </Guide>
      <Guide image="money" alt="money">
        Loot and Rum sells for Gold!
      </Guide>
    </section>
  )
}
