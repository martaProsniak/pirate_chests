import { TreasureKind } from '../../shared/types/game';
import { useEffect, useState } from 'react';
import { EVENT_NAME, FeedbackDetail } from '../utils/feedbackEvent';
import { Feedback } from './Feedback';

interface TreasureProps {
  kind: TreasureKind;
  row: number;
  col: number;
}

export const Treasure = ({ kind, row, col }: TreasureProps) => {
  const [feedback, setFeedback] = useState<FeedbackDetail | null>(null);

  useEffect(() => {
    const handleFeedback = (e: Event) => {
      const detail = (e as CustomEvent<FeedbackDetail>).detail;
      if (detail.row === row && detail.col === col) {
        setFeedback(detail);
        setTimeout(() => setFeedback(null), 1500);
      }
    };

    window.addEventListener(EVENT_NAME, handleFeedback);
    return () => {
      window.removeEventListener(EVENT_NAME, handleFeedback)
    };
  }, [row, col]);

  return (
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url("/images/${kind}.png")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {(feedback && kind !== 'bomb') && (
          <Feedback score={feedback.score} rum={feedback.rum} />
        )}
      </div>
  );
};
