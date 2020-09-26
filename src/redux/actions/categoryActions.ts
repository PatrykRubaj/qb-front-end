import { Category } from "../state";
import * as categoryTypes from "../types/categoryTypes";

const deleteCategory = (
  incomeToDelete: Category
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.DELETE_CATEGORY,
    id: incomeToDelete.id,
  };
};

const deleteCategoryFinished = (
  id: string
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.DELETE_CATEGORY_FINISHED,
    id,
  };
};

const addCategory = (income: Category): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.ADD_CATEGORY,
    payload: income,
  };
};

const addCategoryFinished = (
  income: Category
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.ADD_CATEGORY_FINISHED,
    payload: income,
  };
};

const editCategory = (income: Category): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.EDIT_CATEGORY,
    payload: income,
  };
};

const editCategoryFinished = (
  income: Category
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.EDIT_CATEGORY_FINISHED,
    payload: income,
  };
};

const setCategoryFormValues = (
  income: Category
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.SET_CATEGORY_FORM,
    payload: income,
  };
};

const setCategoryFormValuesFinished = (
  income: Category
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.SET_CATEGORY_FORM_FINISHED,
    payload: income,
  };
};

const setCategoryPromptVisibility = (
  isVisible: boolean
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.SET_CATEGORY_PROMPT_VISIBILITY,
    isVisible,
  };
};

const setCategoryPromptVisibilityFinished = (
  isVisible: boolean
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.SET_CATEGORY_PROMPT_VISIBILITY_FINISHED,
    isVisible,
  };
};

const moveCategory = (
  startIndex: number,
  endIndex: number,
  id: string
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.MOVE_CATEGORY,
    startIndex,
    endIndex,
    id,
  };
};
const moveCategoryFinished = (
  startIndex: number,
  endIndex: number,
  id: string
): categoryTypes.CategoryActionTypes => {
  return {
    type: categoryTypes.MOVE_CATEGORY_FINISHED,
    startIndex,
    endIndex,
    id,
  };
};

export default {
  deleteCategory,
  deleteCategoryFinished,
  addCategory,
  addCategoryFinished,
  editCategory,
  editCategoryFinished,
  setCategoryFormValues,
  setCategoryFormValuesFinished,
  setCategoryPromptVisibility,
  setCategoryPromptVisibilityFinished,
  moveCategory,
  moveCategoryFinished,
};
