import { Income } from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";
import * as types from "../types/incomeTypes";

export default function incomeReducer(
  incomes: Income[] = initialState.incomes,
  action: IncomeActionTypes
): Income[] {
  switch (action.type) {
    case types.DELETE_INCOME_FINISHED:
      return incomes.filter(x => x.id !== action.id);
    case types.ADD_INCOME_FINISHED:
      return [...incomes, action.payload];
    case types.EDIT_INCOME_FINISHED:
      return incomes.map((stateIncome: Income) => {
        if (stateIncome.id !== action.payload.id) {
          return stateIncome;
        }

        return action.payload;
      });
    default:
      return incomes;
  }
}
