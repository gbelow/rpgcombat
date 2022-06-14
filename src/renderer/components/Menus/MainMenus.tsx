import { MouseEventHandler, useCallback, useReducer } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import {
  changeSelectedItem,
  selectCurrentSelection,
} from 'renderer/app/controlSlice';
import './Menu.css';
import MenuList from './MenuList';
import conditions from '../../img/conditions.json';
import spells from '../../img/spells.json';

const initialFilterState = {
  str: '',
  data: conditions,
  tab: 'conditions',
};

type FilterAction = {
  type: string;
  payload: string;
};

const filterReducer = (
  state: typeof initialFilterState,
  action: FilterAction
) => {
  let dataset = [];
  switch (action.type) {
    case 'spells':
      dataset = spells;
      break;
    case 'conditions':
      dataset = conditions;
      break;
    default:
      dataset = conditions;
  }
  const f = action.payload ?? state.str;
  const data = [...dataset].filter((el) => {
    const regexp = new RegExp(f, 'i');
    return regexp.test(el.name);
  });
  return { str: f, data, tab: action.type };
};

export default function MainMenu() {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector(selectCurrentSelection);

  const [filter, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  const handleOptionClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      dispatch(
        changeSelectedItem({ type: filter.tab, item: JSON.parse(target.value) })
      );
    },
    [dispatch, filter.tab]
  );

  const handleTabClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      filterDispatch({ type: target.value, payload: '' });
    },
    []
  );

  return (
    <div
      style={{
        width: '22vw',
        fontSize: '0.75rem',
        borderRight: 'solid',
        borderRightWidth: 3,
        borderColor: '#555555',
        padding: '5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          fontWeight: 'bold',
          fontSize: '1rem',
          flexGrow: 1,
        }}
      >
        <button type="button">Characters</button>
        <button type="button" value="spells" onClick={handleTabClick}>
          Spells
        </button>
        <button type="button" value="conditions" onClick={handleTabClick}>
          Effects
        </button>
        <button type="button">Info</button>
      </div>
      <input
        value={filter.str}
        onChange={({ target }) =>
          filterDispatch({ type: filter.tab, payload: target.value })
        }
      />
      <div className="list" style={{ marginTop: '1rem' }}>
        <MenuList
          handleOptionClick={handleOptionClick}
          selectedOption={selectedOption}
          data={filter.data}
        />
      </div>
    </div>
  );
}
