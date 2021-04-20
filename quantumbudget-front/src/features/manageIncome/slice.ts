import { v4 as uuidv4 } from 'uuid';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/reducers';
import * as appTypes from '../../redux/types/appTypes';
import * as budgetTypes from '../../redux/types/budgetTypes';
import { EntityStatus, Income, ReadState } from '../../redux/state';
import arrayMove from 'array-move';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

const budgetReadFromDatabase = createAction<ReadState>(
  budgetTypes.REQUEST_BUDGET_READ_FINISHED
);

export const slice = createSlice({
  name: 'income',
  initialState: {
    formValues: {
      id: uuidv4(),
      name: '',
      amount: undefined,
      status: EntityStatus.New,
    },
    incomes: [
      {
        id: uuidv4(),
        amount: 1500,
        name: 'Starbucks',
        status: EntityStatus.Saved,
      },
      {
        id: uuidv4(),
        amount: 500,
        name: "McDonald's",
        status: EntityStatus.Saved,
      },
    ],
    onlyOneEditAllowedPrompt: false,
  },
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      return {
        ...state,
        incomes: [
          ...state.incomes,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
        ],
      };
    },
    editIncome: (state, action: PayloadAction<Income>) => {
      return {
        ...state,
        incomes: state.incomes.map((stateIncome) => {
          if (stateIncome.id !== action.payload.id) {
            return stateIncome;
          }

          return {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          };
        }),
      };
    },
    deleteIncome: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        incomes: state.incomes.filter((x) => x.id !== action.payload),
      };
    },
    setIncomeForm: (state, action: PayloadAction<Income>) => {
      return {
        ...state,
        formValues: action.payload,
        incomes: state.incomes.map((stateIncome) => {
          if (stateIncome.id !== action.payload.id) {
            return stateIncome;
          }

          return { ...action.payload, status: EntityStatus.Editing };
        }),
      };
    },
    setIncomePromptVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        onlyOneEditAllowedPrompt: action.payload,
      };
    },
    moveIncome: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      return {
        ...state,
        incomes: arrayMove(
          state.incomes,
          action.payload.startIndex,
          action.payload.endIndex
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateLoaded, (state, action) => {
        return {
          ...state,
          ...action.payload.incomeSection,
        };
      })
      .addCase(budgetReadFromDatabase, (state, action) => {
        return {
          ...state,
          incomes: action.payload.incomes,
        };
      });
  },
});

export const {
  addIncome,
  editIncome,
  deleteIncome,
  setIncomeForm,
  setIncomePromptVisibility,
  moveIncome,
} = slice.actions;
export default slice.reducer;
