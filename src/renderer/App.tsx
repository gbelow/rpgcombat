import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { Creature, selectAllCreatures } from './app/creatureSlice';
import Card from './components/Card/Card';
import { useAppSelector } from './app/hooks';
import Clock from './components/Clock/Clock';
import TurnTracker from './components/TurnTracker/TurnTracker';
import Details from './components/Details/Details';
import MainMenu from './components/Menus/MainMenus';

function InitiativeTracker() {
  const creatures: Creature[] = useAppSelector(selectAllCreatures);
  const [turnTime, setTurnTime] = useState(60);

  return (
    <div className="app">
      <MainMenu />
      <div className="col">
        <div className="row">
          <div>
            <p>Turn Time</p>
            <input
              type="number"
              value={turnTime}
              className="time-input"
              onChange={({ target: { value } }) =>
                setTurnTime(parseInt(value, 10))
              }
            />
          </div>
          <Clock turnTime={turnTime} />
          <TurnTracker />
        </div>
        <div className="row" style={{ fontWeight: 'bold' }}>
          <p>name</p>
          <p>hp</p>
          <p>evasion</p>
          <p>deflection</p>
          <p>initiative</p>
        </div>
        <div className="list">
          {creatures.map((el, i) => (
            <Card key={el.id} id={el.id} last={creatures.length - 1 === i} />
          ))}
        </div>
      </div>
      <Details />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={InitiativeTracker()} />
      </Routes>
    </Router>
  );
}
