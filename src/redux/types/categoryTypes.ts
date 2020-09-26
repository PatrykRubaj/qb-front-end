import { Category } from "../state";
export const SET_CATEGORY_FORM = "SET_CATEGORY_FORM";
export const SET_CATEGORY_FORM_FINISHED = "SET_CATEGORY_FORM_FINISHED";
export const SET_CATEGORY_PROMPT_VISIBILITY = "SET_CATEGORY_PROMPT_VISIBILITY";
export const SET_CATEGORY_PROMPT_VISIBILITY_FINISHED =
  "SET_CATEGORY_PROMPT_VISIBILITY_FINISHED";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_CATEGORY_FINISHED = "ADD_CATEGORY_FINISHED";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const EDIT_CATEGORY_FINISHED = "EDIT_CATEGORY_FINISHED";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_CATEGORY_FINISHED = "DELETE_CATEGORY_FINISHED";
export const MOVE_CATEGORY = "MOVE_CATEGORY";
export const MOVE_CATEGORY_FINISHED = "MOVE_CATEGORY_FINISHED";

interface SetCategoryPromptVisibilityAction {
  type: typeof SET_CATEGORY_PROMPT_VISIBILITY;
  isVisible: boolean;
}

interface SetCategoryPromptVisibilityFinishedAction {
  type: typeof SET_CATEGORY_PROMPT_VISIBILITY_FINISHED;
  isVisible: boolean;
}

interface SetCategoryFormAction {
  type: typeof SET_CATEGORY_FORM;
  payload: Category;
}

interface SetCategoryFormFinishedAction {
  type: typeof SET_CATEGORY_FORM_FINISHED;
  payload: Category;
}

interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

interface AddCategoryFinishedAction {
  type: typeof ADD_CATEGORY_FINISHED;
  payload: Category;
}

interface DeleteCategoryAction {
  type: typeof DELETE_CATEGORY;
  id: string;
}

interface DeleteCategoryFinishedAction {
  type: typeof DELETE_CATEGORY_FINISHED;
  id: string;
}

interface EditCategoryAction {
  type: typeof EDIT_CATEGORY;
  payload: Category;
}

interface EditCategoryFinishedAction {
  type: typeof EDIT_CATEGORY_FINISHED;
  payload: Category;
}

interface MoveCategoryAction {
  type: typeof MOVE_CATEGORY;
  startIndex: number;
  endIndex: number;
  id: string;
}

interface MoveCategoryFinishedAction {
  type: typeof MOVE_CATEGORY_FINISHED;
  startIndex: number;
  endIndex: number;
  id: string;
}

export type CategoryActionTypes =
  | SetCategoryPromptVisibilityAction
  | SetCategoryPromptVisibilityFinishedAction
  | SetCategoryFormAction
  | SetCategoryFormFinishedAction
  | AddCategoryAction
  | AddCategoryFinishedAction
  | DeleteCategoryAction
  | DeleteCategoryFinishedAction
  | EditCategoryAction
  | EditCategoryFinishedAction
  | MoveCategoryAction
  | MoveCategoryFinishedAction;
