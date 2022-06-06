import { selectCurrentTurn } from 'renderer/app/combatSlice';
import {
  selectCreature,
  removeCreature,
  Creature,
  changeCreatureValue,
  addCreature,
  makeCreature,
} from '../../app/creatureSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Card.module.css';

interface Props {
  id: number;
  last: boolean | undefined;
}

function generateId() {
  const d = new Date();
  return d.getTime();
}

export default function Card({ id = 0, last = true }: Props) {
  const crit: Creature = useAppSelector(selectCreature(id));
  const dispatch = useAppDispatch();
  const isTurn = useAppSelector(selectCurrentTurn) === id;

  return (
    <div
      className={styles.card}
      style={{
        borderColor: isTurn ? '#ff0000' : '#000',
        borderWidth: isTurn ? 3 : 1,
      }}
    >
      <div className={styles.row}>
        <input
          type="text"
          value={crit.name}
          onChange={({ target }) =>
            dispatch(
              changeCreatureValue({
                id: crit.id,
                value: { name: target.value },
              })
            )
          }
        />
        <input
          type="number"
          value={crit.hp}
          onChange={({ target }) =>
            dispatch(
              changeCreatureValue({
                id: crit.id,
                value: { hp: target.value },
              })
            )
          }
        />
        <input
          type="number"
          value={crit.evasion}
          onChange={({ target }) =>
            dispatch(
              changeCreatureValue({
                id: crit.id,
                value: { evasion: target.value },
              })
            )
          }
        />
        <input
          type="number"
          value={crit.deflection}
          onChange={({ target }) =>
            dispatch(
              changeCreatureValue({
                id: crit.id,
                value: { deflection: target.value },
              })
            )
          }
        />
        <input
          type="number"
          value={crit.initiative}
          onChange={({ target }) =>
            dispatch(
              changeCreatureValue({
                id: crit.id,
                value: { initiative: target.value },
              })
            )
          }
        />
        {!last ? (
          <button
            className={styles.btn}
            type="button"
            onClick={() => dispatch(removeCreature(crit.id))}
          >
            -
          </button>
        ) : (
          <button
            className={styles.btn}
            type="button"
            onClick={() =>
              dispatch(addCreature(makeCreature({ id: generateId() })))
            }
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
