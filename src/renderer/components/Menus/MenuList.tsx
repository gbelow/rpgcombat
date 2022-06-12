import { Condition, MenuSelection, Spell } from 'renderer/app/controlSlice';

interface MenuListInterface {
  selectedOption: MenuSelection;
  handleOptionClick: (event: any) => void;
  data: Spell[] | Condition[];
  type: string;
  currentTab: string;
}

export default function MenuList({
  selectedOption,
  handleOptionClick,
  data,
  type,
  currentTab,
}: MenuListInterface) {
  return (
    <div
      className="menu-list"
      style={{
        position: 'absolute',
        width: '20%',
        marginTop: '1rem',
        visibility: type === currentTab ? 'visible' : 'hidden',
      }}
    >
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
