import { Income } from "../../SpreadsheetGeneration/state";
export const ADD_INCOME = "ADD_INCOME";
export const ADD_INCOME_FINISHED = "ADD_INCOME_FINISHED";
export const EDIT_INCOME = "EDIT_INCOME";
export const EDIT_INCOME_FINISHED = "EDIT_INCOME_FINISHED";
export const DELETE_INCOME = "DELETE_INCOME";
export const DELETE_INCOME_FINISHED = "DELETE_INCOME_FINISHED";

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

export type IncomeActionTypes =
  | AddIncomeAction
  | AddIncomeFinishedAction
  | DeleteIncomeAction
  | DeleteIncomeFinishedAction
  | EditIncomeAction
  | EditIncomeFinishedAction;
