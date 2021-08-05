import { useEffect, useRef, useState } from 'react';

const Timer = ({ time, interval = 1000, onEnd }: { time: number; interval?: number; onEnd: VoidFunction }) => {
  const [internalTime, setInternalTime] = useState(time);
  const timerRef = useRef<NodeJS.Timer>();
  const timeRef = useRef(time);

  useEffect(() => {
    if (internalTime === 0 && onEnd) onEnd();
  }, [internalTime, onEnd]);

  useEffect(() => {
    timerRef.current = setInterval(() => setInternalTime((timeRef.current -= interval)), interval);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [interval]);
  return <>{`${internalTime / 1000}`}</>;
};

export default Timer;
