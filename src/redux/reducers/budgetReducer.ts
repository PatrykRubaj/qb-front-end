import { BudgetSection } from "../state";
import {
  BudgetActionTypes,
  REQUEST_BUDGET_GENERATION_FINISHED,
} from "../types/budgetTypes";
import { initialState } from "../initialsState";

export default function budgetReducer(
  budgetSection: BudgetSection = initialState.budgetSection,
  action: BudgetActionTypes
): BudgetSection {
  switch (action.type) {
    case REQUEST_BUDGET_GENERATION_FINISHED:
      return {
        ...budgetSection,
        response: action.response,
      };
    default:
      return budgetSection;
  }
}
