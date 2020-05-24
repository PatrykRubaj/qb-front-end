import {
  Income,
  IncomeSection,
  EntityStatus,
} from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";
import * as types from "../types/incomeTypes";

export default function incomeReducer(
  incomeSection: IncomeSection = initialState.incomeSection,
  action: IncomeActionTypes
): IncomeSection {
  switch (action.type) {
    case types.DELETE_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: incomeSection.incomes.filter(x => x.id !== action.id),
      };
    case types.ADD_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: [...incomeSection.incomes, action.payload],
      };
    case types.EDIT_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: incomeSection.incomes.map((stateIncome: Income) => {
          if (stateIncome.id !== action.payload.id) {
            return stateIncome;
          }

          return { ...action.payload, status: EntityStatus.Saved };
        }),
      };
    case types.SET_INCOME_FORM_FINISHED:
      return {
        ...incomeSection,
        formValues: action.payload,
      };
    case types.SET_PROMPT_VISIBILITY_FINISHED:
      return {
        ...incomeSection,
        onlyOneEditAllowedPrompt: action.isVisible,
      };
    default:
      return incomeSection;
  }
}
