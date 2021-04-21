import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import arrayMove from 'array-move';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../redux/reducers';
import {
  Category,
  CategorySection,
  EntityStatus,
  ReadState,
} from '../../redux/state';
import * as appTypes from '../../redux/types/appTypes';
import * as budgetTypes from '../../redux/types/budgetTypes';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

const budgetReadFromDatabase = createAction<ReadState>(
  budgetTypes.REQUEST_BUDGET_READ_FINISHED
);

export const slice = createSlice({
  name: 'category',
  initialState: {
    formValues: {
      id: uuidv4(),
      name: '',
      status: EntityStatus.New,
    },
    categories: [
      {
        id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        name: 'Food',
        status: EntityStatus.Saved,
      },
      {
        id: '1e987730-c0b1-4850-b06e-7c3612393254',
        name: 'Utilities',
        status: EntityStatus.Saved,
      },
    ],
    onlyOneEditAllowedPrompt: false,
  } as CategorySection,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
        ],
      };
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      return {
        ...state,
        categories: state.categories.map((stateCategory: Category) => {
          if (stateCategory.id !== action.payload.id) {
            return stateCategory;
          }

          return {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          };
        }),
      };
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        categories: state.categories.filter((x) => x.id !== action.payload),
      };
    },
    setCategoryForm: (state, action: PayloadAction<Category>) => {
      return {
        ...state,
        formValues: action.payload,
        categories: state.categories.map((stateCategory: Category) => {
          if (stateCategory.id !== action.payload.id) {
            return stateCategory;
          }

          return { ...action.payload, status: EntityStatus.Editing };
        }),
      };
    },
    setCategoryPromptVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        onlyOneEditAllowedPrompt: action.payload,
      };
    },
    moveCategory: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      return {
        ...state,
        categories: arrayMove(
          state.categories,
          action.payload.startIndex,
          action.payload.endIndex
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateLoaded, (state, action) => {
        return action.payload.categoriesSection;
      })
      .addCase(budgetReadFromDatabase, (state, action) => {
        return {
          ...state,
          categories: action.payload.categories,
        };
      });
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  moveCategory,
  setCategoryForm,
  setCategoryPromptVisibility,
} = slice.actions;
export default slice.reducer;
