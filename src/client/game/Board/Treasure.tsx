import { TreasureKind } from '../../../shared/types/game';

interface TreasureProps {
  kind: TreasureKind;
}

export const Treasure = ({ kind }: TreasureProps) => {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url("/images/${kind}.png")`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};
