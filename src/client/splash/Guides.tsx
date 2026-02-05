import { ReactNode } from 'react';

export interface GuideProps {
  image: string;
  alt: string;
  children?: ReactNode;
}

const Guide = ({image, alt, children}: GuideProps) => {
  return (
    <article className="flex flex-row flex-nowrap items-center justify-start gap-2 w-full p-2">
      <div className="size-7">
        <img src={`/images/${image}.png`} alt={alt} className="w-full h-full object-contain" />
      </div>
      {/* Usunięto text-amber-950 */}
      <p className="text-base leading-4 font-bree font-normal">{children}</p>
    </article>
  );
}

export const Guides= () => {
  return (
    <section
      // Usunięto text-orange-900/70
      className="flex flex-col items-center justify-center gap-4 w-full px-3 py-1"
    >
      {/* Usunięto text-orange-900/70 */}
      <h2 className="font-pirate text-2xl drop-shadow-sm mb-0">
        Pirate Code
      </h2>
      {/* Usunięto bg-white/50, border-orange-200/60 */}
      <div className={'rounded-lg py-2 px-3 border'}>
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
    </section>
  )
}
