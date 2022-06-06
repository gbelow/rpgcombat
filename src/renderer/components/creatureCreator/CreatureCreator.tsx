import { useState } from 'react';
import { addCreature, makeCreature } from '../../app/creatureSlice';
import { useAppDispatch } from '../../app/hooks';
import styles from './CreatureCreator.module.css';

export default function CreatureCreator() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  return (
    <div className={styles.row}>
      <span>Create your character</span>
      <input
        type="text"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <button
        className={styles.btn}
        type="button"
        onClick={() => dispatch(addCreature(makeCreature({ name })))}
      >
        +
      </button>
    </div>
  );
}
