import { useEffect, useState } from 'react';

export const useMatchTimer = (startedAt, status, duration) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const isActive = status === 'Ongoing';
  const isFinished = status === 'Finished';

  useEffect(() => {
    if (isFinished) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setElapsedSeconds(Number(duration) || 0);
      return;
    }

    //  Если матч ИДЕТ — считаем секунды от startedAt
    if (isActive && startedAt) {
      const calculateElapsed = () => {
        const startMs = new Date(startedAt).getTime();
        if (isNaN(startMs)) return;

        const diffInSeconds = Math.max(
          0,
          Math.floor((Date.now() - startMs) / 1000),
        );
        setElapsedSeconds(diffInSeconds);
      };

      calculateElapsed();
      const interval = setInterval(calculateElapsed, 1000);
      return () => clearInterval(interval);
    }

    //  Если матч еще не начался
    setElapsedSeconds(0);
  }, [startedAt, status, duration, isActive, isFinished]);

  // Форматирование ММ:СС / ЧЧ:ММ:СС
  const safeSeconds = isNaN(elapsedSeconds) ? 0 : elapsedSeconds;
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const pad = (num) => String(num).padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};
