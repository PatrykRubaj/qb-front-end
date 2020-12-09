import { BudgetSection } from "../state";
import {
  BudgetActionTypes,
  REQUEST_BUDGET_GENERATION_FINISHED,
  REQUEST_BUDGET_READ,
  REQUEST_BUDGET_READ_FAILED,
  REQUEST_BUDGET_READ_FINISHED,
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
    case REQUEST_BUDGET_READ:
      debugger;
      return {
        ...budgetSection,
        isLoading: true,
      };
    case REQUEST_BUDGET_READ_FINISHED:
      debugger;
      return {
        ...budgetSection,
        isLoading: false,
      };
    case REQUEST_BUDGET_READ_FAILED:
      debugger;
      return {
        ...budgetSection,
        isLoading: false,
      };
    default:
      return budgetSection;
  }
}
