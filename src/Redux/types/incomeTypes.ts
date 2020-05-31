import { Income } from "../../SpreadsheetGeneration/state";
export const SET_INCOME_FORM = "SET_INCOME_FORM";
export const SET_INCOME_FORM_FINISHED = "SET_INCOME_FORM_FINISHED";
export const SET_PROMPT_VISIBILITY = "SET_PROMPT_VISIBILITY";
export const SET_PROMPT_VISIBILITY_FINISHED = "SET_PROMPT_VISIBILITY_FINISHED";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_INCOME_FINISHED = "ADD_INCOME_FINISHED";
export const EDIT_INCOME = "EDIT_INCOME";
export const EDIT_INCOME_FINISHED = "EDIT_INCOME_FINISHED";
export const DELETE_INCOME = "DELETE_INCOME";
export const DELETE_INCOME_FINISHED = "DELETE_INCOME_FINISHED";
export const MOVE_INCOME = "MOVE_INCOME";
export const MOVE_INCOME_FINISHED = "MOVE_INCOME_FINISHED";

interface SetPromptVisibilityAction {
  type: typeof SET_PROMPT_VISIBILITY;
  isVisible: boolean;
}

interface SetPromptVisibilityFinishedAction {
  type: typeof SET_PROMPT_VISIBILITY_FINISHED;
  isVisible: boolean;
}

interface SetIncomeFormAction {
  type: typeof SET_INCOME_FORM;
  payload: Income;
}

interface SetIncomeFormFinishedAction {
  type: typeof SET_INCOME_FORM_FINISHED;
  payload: Income;
}

interface AddIncomeAction {
  type: typeof ADD_INCOME;
  payload: Income;
}

interface AddIncomeFinishedAction {
  type: typeof ADD_INCOME_FINISHED;
  payload: Income;
}

interface DeleteIncomeAction {
  type: typeof DELETE_INCOME;
  id: string;
}

interface DeleteIncomeFinishedAction {
  type: typeof DELETE_INCOME_FINISHED;
  id: string;
}

interface EditIncomeAction {
  type: typeof EDIT_INCOME;
  payload: Income;
}

interface EditIncomeFinishedAction {
  type: typeof EDIT_INCOME_FINISHED;
  payload: Income;
}

interface MoveIncomeAction {
  type: typeof MOVE_INCOME;
  startIndex: number;
  endIndex: number;
  id: string;
}

interface MoveIncomeFinishedAction {
  type: typeof MOVE_INCOME_FINISHED;
  startIndex: number;
  endIndex: number;
  id: string;
}

export type IncomeActionTypes =
  | SetPromptVisibilityAction
  | SetPromptVisibilityFinishedAction
  | SetIncomeFormAction
  | SetIncomeFormFinishedAction
  | AddIncomeAction
  | AddIncomeFinishedAction
  | DeleteIncomeAction
  | DeleteIncomeFinishedAction
  | EditIncomeAction
  | EditIncomeFinishedAction
  | MoveIncomeAction
  | MoveIncomeFinishedAction;
