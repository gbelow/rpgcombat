import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/app/hooks';
import {
  changeSelectedItem,
  selectCurrentSelection,
} from 'renderer/app/controlSlice';
import './Menu.css';
import MenuList from './MenuList';
import conditions from '../../img/conditions.json';
import spells from '../../img/spells.json';

export default function MainMenu() {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<string>('conditions');
  const selectedOption = useAppSelector(selectCurrentSelection);

  const handleOptionClick = useCallback(
    ({ target: { value } }: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        changeSelectedItem({ type: currentTab, item: JSON.parse(value) })
      );
    },
    [dispatch, currentTab]
  );

  const handleTabClick = useCallback(({ target: { value } }: MouseEvent) => {
    setCurrentTab(value);
  }, []);

  return (
    <div
      style={{
        width: '20vw',
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
      <div className="list" style={{ marginTop: '1rem' }}>
        <MenuList
          handleOptionClick={handleOptionClick}
          selectedOption={selectedOption}
          data={spells}
          type="spells"
          currentTab={currentTab}
        />
        <MenuList
          handleOptionClick={handleOptionClick}
          selectedOption={selectedOption}
          data={conditions}
          type="conditions"
          currentTab={currentTab}
        />
      </div>
    </div>
  );
}
