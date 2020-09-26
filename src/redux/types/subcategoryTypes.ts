import { Subcategory } from "../state";
export const SET_SUBCATEGORY_FORM = "SET_SUBCATEGORY_FORM";
export const SET_SUBCATEGORY_FORM_FINISHED = "SET_SUBCATEGORY_FORM_FINISHED";
export const SET_SUBCATEGORY_PROMPT_VISIBILITY =
  "SET_SUBCATEGORY_PROMPT_VISIBILITY";
export const SET_SUBCATEGORY_PROMPT_VISIBILITY_FINISHED =
  "SET_SUBCATEGORY_PROMPT_VISIBILITY_FINISHED";
export const ADD_SUBCATEGORY = "ADD_SUBCATEGORY";
export const ADD_SUBCATEGORY_FINISHED = "ADD_SUBCATEGORY_FINISHED";
export const EDIT_SUBCATEGORY = "EDIT_SUBCATEGORY";
export const EDIT_SUBCATEGORY_FINISHED = "EDIT_SUBCATEGORY_FINISHED";
export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY";
export const DELETE_SUBCATEGORY_FINISHED = "DELETE_SUBCATEGORY_FINISHED";
export const ENTER_SUBCATEGORY_AMOUNT = "ENTER_SUBCATEGORY_AMOUNT";
export const ENTER_SUBCATEGORY_AMOUNT_FINISHED =
  "ENTER_SUBCATEGORY_AMOUNT_FINISHED";
export const MOVE_SUBCATEGORY = "MOVE_SUBCATEGORY";
export const MOVE_SUBCATEGORY_FINISHED = "MOVE_SUBCATEGORY_FINISHED";

interface SetSubcategoryPromptVisibilityAction {
  type: typeof SET_SUBCATEGORY_PROMPT_VISIBILITY;
  isVisible: boolean;
}

interface SetSubcategoryPromptVisibilityFinishedAction {
  type: typeof SET_SUBCATEGORY_PROMPT_VISIBILITY_FINISHED;
  isVisible: boolean;
}

interface SetSubcategoryFormAction {
  type: typeof SET_SUBCATEGORY_FORM;
  payload: Subcategory;
}

interface SetSubcategoryFormFinishedAction {
  type: typeof SET_SUBCATEGORY_FORM_FINISHED;
  payload: Subcategory;
}

interface AddSubcategoryAction {
  type: typeof ADD_SUBCATEGORY;
  payload: Subcategory;
}

interface AddSubcategoryFinishedAction {
  type: typeof ADD_SUBCATEGORY_FINISHED;
  payload: Subcategory;
}

interface DeleteSubcategoryAction {
  type: typeof DELETE_SUBCATEGORY;
  id: string;
}

interface DeleteSubcategoryFinishedAction {
  type: typeof DELETE_SUBCATEGORY_FINISHED;
  id: string;
}

interface EditSubcategoryAction {
  type: typeof EDIT_SUBCATEGORY;
  payload: Subcategory;
}

interface EditSubcategoryFinishedAction {
  type: typeof EDIT_SUBCATEGORY_FINISHED;
  payload: Subcategory;
}

interface EnterSubcategoryAmountAction {
  type: typeof ENTER_SUBCATEGORY_AMOUNT;
  id: string;
  amount: number;
}

interface EnterSubcategoryAmountFinishedAction {
  type: typeof ENTER_SUBCATEGORY_AMOUNT_FINISHED;
  id: string;
  amount: number;
}

interface MoveSubcategoryAction {
  type: typeof MOVE_SUBCATEGORY;
  startIndex: number;
  endIndex: number;
  id: string;
}

interface MoveSubcategoryFinishedAction {
  type: typeof MOVE_SUBCATEGORY_FINISHED;
  startIndex: number;
  endIndex: number;
  id: string;
}

export type SubcategoryActionTypes =
  | SetSubcategoryPromptVisibilityAction
  | SetSubcategoryPromptVisibilityFinishedAction
  | SetSubcategoryFormAction
  | SetSubcategoryFormFinishedAction
  | AddSubcategoryAction
  | AddSubcategoryFinishedAction
  | DeleteSubcategoryAction
  | DeleteSubcategoryFinishedAction
  | EditSubcategoryAction
  | EditSubcategoryFinishedAction
  | EnterSubcategoryAmountAction
  | EnterSubcategoryAmountFinishedAction
  | MoveSubcategoryAction
  | MoveSubcategoryFinishedAction;
