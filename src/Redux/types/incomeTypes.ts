import { Income } from "../../SpreadsheetGeneration/state";
export const ADD_INCOME = "ADD_INCOME";
export const DELETE_INCOME = "DELETE_INCOME";

interface AddIncomeAction {
  type: typeof ADD_INCOME;
  payload: Income;
}

interface DeleteIncomeAction {
  type: typeof DELETE_INCOME;
}

export type IncomeActionTypes = AddIncomeAction | DeleteIncomeAction;
