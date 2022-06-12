import { selectCurrentSelection } from 'renderer/app/controlSlice';
import { useAppSelector } from 'renderer/app/hooks';
import ConditionDetails from './ConditionDetails';
import SpellDetails from './SpellDetails';
import type { Spell, Condition } from '../../app/controlSlice';
import './Details.css';

export interface SpellDetailsInterface {
  details: Spell;
}

export interface ConditionDetailsInterface {
  details: Condition;
}

export default function Details() {
  const currentSelectedItem = useAppSelector(selectCurrentSelection);

  return (
    <div
      className="list"
      style={{
        width: '25vw',
        fontSize: '1rem',
        borderLeft: 'solid',
        borderLeftWidth: 3,
        borderColor: '#555555',
        padding: '5px',
        height: '85vh',
      }}
    >
      <SpellDetails details={currentSelectedItem.item} />
      <ConditionDetails details={currentSelectedItem.item} />
    </div>
  );
}
