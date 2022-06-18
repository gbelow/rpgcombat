import { MouseEventHandler } from 'react';
import { Condition, MenuSelection, Spell } from 'renderer/app/controlSlice';

interface MenuListInterface {
  selectedOption: MenuSelection;
  handleOptionClick: MouseEventHandler<HTMLButtonElement>;
  data: Spell[] | Condition[];
}

export default function MenuList({
  selectedOption,
  handleOptionClick,
  data,
}: MenuListInterface) {
  return (
    <div className="menu-list">
      {data.map((el) => (
        <button
          type="button"
          onClick={handleOptionClick}
          value={JSON.stringify(el)}
          key={el.name}
          style={
            selectedOption.item.name === el.name
              ? { opacity: 1, backgroundColor: '#744B11' }
              : {}
          }
        >
          {el.name}
        </button>
      ))}
    </div>
  );
}
