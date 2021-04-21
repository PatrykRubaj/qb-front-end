import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/reducers';
import { Country, ReadState } from '../../redux/state';
import * as appTypes from '../../redux/types/appTypes';
import * as budgetTypes from '../../redux/types/budgetTypes';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

const budgetReadFromDatabase = createAction<ReadState>(
  budgetTypes.REQUEST_BUDGET_READ_FINISHED
);

export const slice = createSlice({
  name: 'country',
  initialState: null as Country,
  reducers: {
    setCountry: (state, action: PayloadAction<Country>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateLoaded, (state, action) => {
        return action.payload.country;
      })
      .addCase(budgetReadFromDatabase, (state, action) => {
        return action.payload.country;
      });
  },
});

export const { setCountry } = slice.actions;
export default slice.reducer;
