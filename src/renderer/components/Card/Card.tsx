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
    <tr
      className={styles.card}
      style={{
        borderColor: isTurn ? '#c85533' : '#000',
        borderWidth: isTurn ? 3 : 1,
      }}
    >
      <td>
        <input
          type="text"
          className={styles.txtIn}
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
      </td>
      <td>
        <input
          type="number"
          min={-99}
          max={999}
          className={styles.numIn}
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
      </td>
      <td>
        <input
          type="number"
          min={-99}
          max={999}
          className={styles.numIn}
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
      </td>
      <td>
        <input
          type="number"
          min={-99}
          max={999}
          className={styles.numIn}
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
      </td>
      <td>
        <input
          type="number"
          min={-99}
          max={999}
          className={styles.numIn}
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
      </td>
      {!last ? (
        <td>
          <button
            className={styles.btn}
            type="button"
            onClick={() => dispatch(removeCreature(crit.id))}
          >
            -
          </button>
        </td>
      ) : (
        <td>
          <button
            className={styles.btn}
            type="button"
            onClick={() =>
              dispatch(addCreature(makeCreature({ id: generateId() })))
            }
          >
            +
          </button>
        </td>
      )}
    </tr>
  );
}
