import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import creatureReducer from './creatureSlice';
import combatReducer from './combatSlice';

export const store = configureStore({
  reducer: {
    creature: creatureReducer,
    combat: combatReducer,
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
