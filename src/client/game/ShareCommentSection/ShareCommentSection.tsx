import { useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { FindingsMap } from '../../../shared/types/game';
import { Button } from '../../UI/Button';

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
    if (isPosting) return 'Scribbling...';
    return 'Brag in the log';
  };

  if (hasPosted) {
    return (
      <div className="flex justify-center pt-2 border-t border-white/10">
        <p className="text-sm font-bold flex items-center gap-1 px-3 py-1 rounded-full border shadow-md">
          <span>✅</span> Scribbled in the Log!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center py-2 border-t border-white/10">
      <p className="text-xs italic">Show off yer loot to the crew!</p>
      <Button
        onClick={handleShare}
        label={'Comment'}
        disabled={isPosting}
        image={'green'}
        classes=""
      >
        <span className="px-4 py-1 text-lime-50 drop-shadow-xs drop-shadow-lime-900 font-pirate text-lg">{getButtonLabel()}</span>
      </Button>
    </div>
  );
};
