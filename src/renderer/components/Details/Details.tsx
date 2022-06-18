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
    <div className="leftSidebar">
      {currentSelectedItem.type === 'spells' ? (
        <SpellDetails details={currentSelectedItem.item} />
      ) : (
        ''
      )}
      {currentSelectedItem.type === 'conditions' ? (
        <ConditionDetails details={currentSelectedItem.item} />
      ) : (
        ''
      )}
    </div>
  );
}
