import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import creatureReducer from './creatureSlice';
import combatReducer from './combatSlice';
import controlReducer from './controlSlice';

export const store = configureStore({
  reducer: {
    creature: creatureReducer,
    combat: combatReducer,
    control: controlReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
