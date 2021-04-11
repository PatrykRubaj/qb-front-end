import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/reducers';
import * as appTypes from '../../redux/types/appTypes';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

export const slice = createSlice({
  name: 'month',
  initialState: new Date().getMonth() + 1,
  reducers: {
    setMonth: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(stateLoaded, (state, action) => {
      return action.payload.month || 1;
    });
  },
});

export const { setMonth } = slice.actions;
export default slice.reducer;
