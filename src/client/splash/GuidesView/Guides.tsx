import { Header, ViewWrapper } from '../../UI/ViewComponents';
import { Clue } from '../../game/Clue';
import { Treasure } from '../../game/Treasure';

export const Guides = () => {
  return (
    <ViewWrapper>
      <Header>Pirate Code</Header>
      <div className="flex flex-col gap-2 w-full">
        <article className="flex flex-row flex-nowrap items-center justify-start gap-3 w-full p-2 bg-white rounded-md border border-amber-100 shadow-sm">
          <div className="relative size-10 border-yellow-600 bg-yellow-300 border-dashed rounded-md border-1">
            <Treasure kind={'chest'} />
          </div>
          <p className="text-base leading-tight font-aladin font-normal text-amber-900">
            Dig to discover all loot!
          </p>
        </article>
        <article className="flex flex-row flex-nowrap items-center justify-start gap-3 w-full p-2 bg-white rounded-md border border-amber-100 shadow-sm">
          <div className="relative size-10 bg-stone-300 border-stone-800 border-dashed rounded-md border-1">
            <Clue value={'4'} bombs={0} />
          </div>
          <p className="text-base leading-tight font-aladin font-normal text-amber-900">
            Count steps to find treasures (only straight lines, matey)!
          </p>
        </article>
        <article className="flex flex-row flex-nowrap items-center justify-start gap-3 w-full p-2 bg-white rounded-md border border-amber-100 shadow-sm">
          <div className="relative size-10 bg-stone-300 border-stone-800 border-dashed rounded-md border-1">
            <Clue value={'4'} bombs={1} />
          </div>
          <p className="text-base leading-tight font-aladin font-normal text-amber-900">
            Mind the Bomb! The detector only scans adjacent lands!
          </p>
        </article>
        <article className="flex flex-row flex-nowrap items-center justify-start gap-3 w-full p-2 bg-white rounded-md border border-amber-100 shadow-sm">
          <div className="size-8 shrink-0">
            <img src={`/images/rum.png`} alt={'Rum'} className="w-full h-full object-contain" />
          </div>
          <p className="text-base leading-tight font-aladin font-normal text-amber-900">
            Walkin' takes Rum. Don't run dry!
          </p>
        </article>
      </div>
    </ViewWrapper>
  );
};
