import { Income } from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";

export default function incomeReducer(
  incomes: Income[] = initialState.incomes,
  action: IncomeActionTypes
): Income[] {
  switch (action.type) {
    default:
      return incomes;
  }
}
