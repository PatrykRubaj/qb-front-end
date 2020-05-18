import { Subcategory } from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";

export default function subcategoryReducer(
  subcategories: Subcategory[] = initialState.subcategories,
  action: IncomeActionTypes
): Subcategory[] {
  switch (action.type) {
    default:
      return subcategories;
  }
}
