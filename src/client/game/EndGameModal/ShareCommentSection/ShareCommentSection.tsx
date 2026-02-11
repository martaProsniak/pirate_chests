import { useState } from 'react';
import { usePirateChestAPI } from '../../../hooks/usePirateChestApi';
import { FindingsMap } from '../../../../shared/types/game';
import { Button } from '../../../UI/Button';

interface ShareCommentSectionProps {
  score: number;
  isWin: boolean;
  wasBombed: boolean;
  moves: number;
  findings: FindingsMap;
}

export const ShareCommentSection = ({
  score,
  isWin,
  wasBombed,
  moves,
  findings,
}: ShareCommentSectionProps) => {
  const { postComment } = usePirateChestAPI();
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);

  const handleShare = async () => {
    if (isPosting || hasPosted) return;

    setIsPosting(true);
    try {
      await postComment({
        score,
        isWin,
        wasBombed,
        moves,
        findings,
      });
      setHasPosted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  const getButtonLabel = () => {
    if (isPosting) return 'Telling Tales...';
    if (wasBombed) return 'Rant in the Tavern';
    return isWin ? 'Brag in the Tavern' : 'Whine in the Tavern';
  };

  if (hasPosted) {
    return (
      <div className="flex flex-row flex-nowrap gap-1 items-center justify-center p-2 h-full">
        <div className="size-12">
          <img className="w-full h-full object-contain" src="/images/mug.png" alt="Mug" />
        </div>
        <p className="text-xl font-bold text-amber-200 text-shadow-amber-950 font-aladin text-shadow-xs leading-[35px] h-[30px]">
          Mugs Raised!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center py-2 h-full">
      <Button
        onClick={handleShare}
        label={'Comment'}
        disabled={isPosting}
        image={'royal'}
        classes=""
      >
        <span className="px-7 py-3 text-yellow-200 text-shadow-md text-shadow-blue-950 font-pirate text-lg">
          {getButtonLabel()}
        </span>
      </Button>
    </div>
  );
};
