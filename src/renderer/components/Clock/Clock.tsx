import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Clock.module.css';

function tick(t: number) {
  return t === 0 ? t : t - 1;
}

interface Props {
  turnTime: number;
}

export default function Clock({ turnTime }: Props): ReactElement {
  const [time, setTime] = useState(turnTime);
  const timer = useRef<NodeJS.Timer>();
  const [timerOn, setTimerOn] = useState(false);

  const pause = useCallback(() => {
    if (timerOn) {
      clearInterval(timer.current);
      setTimerOn(false);
    } else {
      timer.current = setInterval(() => setTime(tick), 1000);
      setTimerOn(true);
    }
  }, [timerOn]);

  const reset = useCallback(() => {
    setTime(turnTime);
    clearInterval(timer.current);
    timer.current = setInterval(() => setTime(tick), 1000);
    setTimerOn(true);
  }, [turnTime]);

  const handleCDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyC') {
        pause();
      }
    },
    [pause]
  );

  const handleRDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'KeyR') {
        reset();
      }
    },
    [reset]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCDown);
    window.addEventListener('keydown', handleRDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleCDown);
      window.removeEventListener('keydown', handleRDown);
    };
  });

  return (
    <div className={styles.row}>
      <h2>clock: {time}</h2>
      <button type="button" onClick={pause} disabled>
        {timerOn ? `pause` : 'start'}
      </button>
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
