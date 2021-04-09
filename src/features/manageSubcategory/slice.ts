import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/reducers';
import {
  Country,
  EntityStatus,
  ReadState,
  Subcategory,
  SubcategorySection,
} from '../../redux/state';
import * as appTypes from '../../redux/types/appTypes';
import * as budgetTypes from '../../redux/types/budgetTypes';
import { v4 as uuidv4 } from 'uuid';
import arrayMove from 'array-move';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

const budgetReadFromDatabase = createAction<ReadState>(
  budgetTypes.REQUEST_BUDGET_READ_FINISHED
);

export const slice = createSlice({
  name: 'subcategory',
  initialState: {
    formValues: {
      id: uuidv4(),
      categoryId: '',
      name: '',
      status: EntityStatus.New,
      amount: null,
    },
    onlyOneEditAllowedPrompt: false,
    subcategories: [
      {
        id: 'd6fe654c-3976-4e16-8b25-e4c4a03b5e72',
        name: 'Home',
        categoryId: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        amount: null,
        status: EntityStatus.Saved,
      },
      {
        id: 'fb893109-860f-4f04-8319-3cab83812aab',
        name: 'Takeout',
        categoryId: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        amount: null,
        status: EntityStatus.Saved,
      },
    ],
  } as SubcategorySection,
  reducers: {
    addSubcategory: (state, action: PayloadAction<Subcategory>) => {
      return {
        ...state,
        subcategories: [
          ...state.subcategories,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
        ],
      };
    },
    editSubcategory: (state, action: PayloadAction<Subcategory>) => {
      return {
        ...state,
        subcategories: state.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.payload.id) {
              return stateSubcategory;
            }

            return {
              ...action.payload,
              status: EntityStatus.Saved,
              name: action.payload.name.trim(),
            };
          }
        ),
      };
    },
    deleteSubcategory: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        subcategories: state.subcategories.filter(
          (x) => x.id !== action.payload
        ),
      };
    },
    setSubcategoryForm: (state, action: PayloadAction<Subcategory>) => {
      return {
        ...state,
        formValues: action.payload,
        subcategories: state.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.payload.id) {
              return stateSubcategory;
            }

            return { ...action.payload, status: EntityStatus.Editing };
          }
        ),
      };
    },
    setSubcategoryPromptVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        onlyOneEditAllowedPrompt: action.payload,
      };
    },
    enterSubcategoryAmount: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      return {
        ...state,
        subcategories: state.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.payload.id) {
              return stateSubcategory;
            }

            return { ...stateSubcategory, amount: action.payload.amount };
          }
        ),
      };
    },
    moveSubcategory: (
      state,
      action: PayloadAction<{
        id: string;
        startIndex: number;
        endIndex: number;
      }>
    ) => {
      const subcategory = state.subcategories.find(
        (x) => x.id === action.payload.id
      );

      const subcategoriesFromDifferentCategory = state.subcategories.filter(
        (x) => x.categoryId !== subcategory?.categoryId
      );
      const subcategoriesFromSametCategory = state.subcategories.filter(
        (x) => x.categoryId === subcategory?.categoryId
      );

      return {
        ...state,
        subcategories: [
          ...subcategoriesFromDifferentCategory,
          ...arrayMove(
            subcategoriesFromSametCategory,
            action.payload.startIndex,
            action.payload.endIndex
          ),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateLoaded, (state, action) => {
        return action.payload.subcategorySection;
      })
      .addCase(budgetReadFromDatabase, (state, action) => {
        return {
          ...state,
          subcategories: action.payload.subcategories,
        };
      });
  },
});

export const {
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
  setSubcategoryForm,
  setSubcategoryPromptVisibility,
  enterSubcategoryAmount,
  moveSubcategory,
} = slice.actions;
export default slice.reducer;
