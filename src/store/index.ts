import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import vocabularyReducer from './vocabularySlice';

export const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
