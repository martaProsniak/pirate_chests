import { useEffect, useState } from 'react';

export const NextChallengeTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(now);

      target.setUTCHours(8, 0, 0, 0);

      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return <span className="text-inherit">Next Island Raid: {timeLeft}</span>;
};
