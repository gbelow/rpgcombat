import { useEffect } from 'react';
import {
  passTurn,
  selectCurrentRound,
  selectNextTurn,
  startCombat,
} from 'renderer/app/combatSlice';
import { selectAllCreatures } from 'renderer/app/creatureSlice';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';

export default function TurnTracker() {
  const dispatch = useAppDispatch();
  const creatures = useAppSelector(selectAllCreatures);
  const nextTurn = useAppSelector(selectNextTurn);

  const handleNDown = (event: KeyboardEvent) => {
    if (event.code === 'KeyN') {
      dispatch(passTurn(nextTurn));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleNDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleNDown);
    };
  });

  return (
    <div>
      <button
        type="button"
        style={{ marginRight: '3px' }}
        onClick={() => dispatch(startCombat(creatures[0].id))}
      >
        start combat
      </button>
      <button type="button" onClick={() => dispatch(passTurn(nextTurn))}>
        next turn
      </button>
      <h2>round:{useAppSelector(selectCurrentRound)}</h2>
    </div>
  );
}
