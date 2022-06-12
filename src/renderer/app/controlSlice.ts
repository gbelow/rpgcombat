import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import spells from '../img/spells.json';
import conditions from '../img/conditions.json';

export type Spell = typeof spells[0];
export type Condition = typeof conditions[0];

export type MenuSelection = {
  type: string;
  item: Spell | Condition;
};

export interface ControlState {
  currentSelection: MenuSelection;
}

const initialState: ControlState = {
  currentSelection: { type: 'spell', item: spells[0] },
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    changeSelectedItem: (state, action: PayloadAction<MenuSelection>) => {
      state.currentSelection = action.payload;
    },
  },
});

export const { changeSelectedItem } = controlSlice.actions;

export const selectCurrentSelection = ({
  control: { currentSelection },
}: RootState): MenuSelection => currentSelection;

export default controlSlice.reducer;
