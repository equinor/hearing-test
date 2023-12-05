import { useEffect, useRef, useState } from "react";

const initialTimer = 0;
const interval = 100;

export const useTimer = (
  dependencyToResetTimer: unknown,
  disabled: boolean,
  duration: number,
  timeout: number
) => {
  const [timer, setTimer] = useState(initialTimer);
  const timerRef = useRef(timer);

  useEffect(() => {
    if (disabled) return;
    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const nextTimerValue = timerRef.current + interval;
        if (nextTimerValue <= duration) {
          timerRef.current = nextTimerValue;
          setTimer(nextTimerValue);
        } else if (nextTimerValue > duration) {
          timerRef.current = duration;
          setTimer(duration);
          clearInterval(intervalId);
        }
      }, interval);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [disabled, dependencyToResetTimer]);

  useEffect(() => {
    timerRef.current = initialTimer;
    setTimer(initialTimer);
  }, [dependencyToResetTimer]);

  return { timer };
};
