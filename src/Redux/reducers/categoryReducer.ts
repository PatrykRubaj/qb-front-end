import { Category } from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";

export default function categoryReducer(
  categories: Category[] = initialState.categories,
  action: IncomeActionTypes
): Category[] {
  switch (action.type) {
    default:
      return categories;
  }
}
