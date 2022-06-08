import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { selectCurrentTurn } from 'renderer/app/combatSlice';
import { useAppSelector } from 'renderer/app/hooks';
import styles from './Clock.module.css';
import countdown from '../../img/male-deep-voice-countdown.wav';

function tick(t: number) {
  return t === 0 ? t : t - 1;
}

interface Props {
  turnTime: number;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Clock({ turnTime }: Props): ReactElement {
  const [time, setTime] = useState(turnTime);
  const timer = useRef<NodeJS.Timer>();
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [timerOn, setTimerOn] = useState(false);
  const turn = useAppSelector(selectCurrentTurn);
  const prevTurn = usePrevious(turn);

  const pause = useCallback(() => {
    if (timerOn) {
      clearInterval(timer.current);
      setTimerOn(false);
      audioRef.current?.pause();
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

  useEffect(() => {
    if (time === 10) {
      audioRef.current?.load();
    }
    if (time < 11) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [time, timerOn]);

  useEffect(() => {
    if (prevTurn !== turn) {
      setTime(turnTime);
      audioRef.current?.load();
      audioRef.current?.pause();
    }
  }, [turn, turnTime, prevTurn]);

  return (
    <div className={styles.row}>
      <h2>clock: {time}</h2>
      {/* <button type="button" onClick={pause} disabled>
        {timerOn ? `pause` : 'start'}
      </button>
      <button type="button" onClick={reset}>
        reset
      </button> */}
      <audio ref={audioRef} src={countdown}>
        <track kind="captions" />
      </audio>
    </div>
  );
}
