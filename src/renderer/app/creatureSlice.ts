import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Creature {
  id: number;
  name: string;
  hp: number;
  deflection: number;
  evasion: number;
  initiative: number;
}

export function makeCreature({
  id = 0,
  name = '',
  hp = 0,
  initiative = 0,
  deflection = 0,
  evasion = 0,
}): Creature {
  return {
    id,
    name,
    hp,
    initiative,
    deflection,
    evasion,
  };
}

export interface CreatureState {
  creatures: Creature[];
}

const initialState: CreatureState = {
  creatures: [makeCreature({})],
};

const creatureSlice = createSlice({
  name: 'creature',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCreature: (state, action: PayloadAction<Creature>) => {
      state.creatures.push(makeCreature({ ...action.payload }));
    },
    removeCreature: (state, action: PayloadAction<number>) => {
      state.creatures = state.creatures.filter(
        (el) => action.payload !== el.id
      );
    },
    changeCreatureValue: (state, action) => {
      const creat = state.creatures.find((el) => el.id === action.payload.id);
      if (creat === undefined) return;
      const [key, val] = Object.entries(action.payload.value)[0];
      creat[key] = val;

      state.creatures = state.creatures.sort(
        (a, b) => b.initiative - a.initiative
      );
    },
  },
});

export const { addCreature, removeCreature, changeCreatureValue } =
  creatureSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCreature =
  (id: number) =>
  ({ creature }: RootState) =>
    creature.creatures.find((el) => id === el.id) ?? initialState.creatures[0];

export const selectAllCreatures = ({ creature }: RootState) =>
  creature.creatures;

export default creatureSlice.reducer;
