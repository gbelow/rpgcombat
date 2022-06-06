import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CombatState {
  round: number;
  inCombat: boolean;
  turn: number;
}

const initialState: CombatState = {
  round: 0,
  inCombat: false,
  turn: 0,
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    startCombat: (state, action: PayloadAction<number>) => {
      state.round = 1;
      state.inCombat = true;
      state.turn = action.payload;
    },
    endCombat: (state, action: PayloadAction<number>) => {
      state.round = 0;
      state.inCombat = false;
      state.turn = action.payload;
    },
    passTurn: (state, action) => {
      // eslint-disable-next-line prefer-destructuring
      state.turn = action.payload[0];
      if (action.payload[1]) {
        state.round += 1;
      }
    },
  },
});

export const { startCombat, endCombat, passTurn } = combatSlice.actions;

export const selectCurrentRound = (state: RootState) => state.combat.round;
export const selectCurrentTurn = (state: RootState) => state.combat.turn;
export const selectNextTurn = (state: RootState) => {
  let resp = 0;
  for (let i = 0; i < state.creature.creatures.length; i += 1) {
    if (state.creature.creatures[i].id === state.combat.turn) {
      resp = i;
    }
  }

  return state.creature.creatures[resp + 1]
    ? [state.creature.creatures[resp + 1].id, false]
    : [state.creature.creatures[0].id, true];
};

export default combatSlice.reducer;
