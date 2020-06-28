import * as budgetTypes from "../types/budgetTypes";
import { History } from "history";
import { BudgetToGenerate, User } from "../../SpreadsheetGeneration/state";

const requestBudgetGeneration = (
  history: History,
  user: User,
  budget: BudgetToGenerate
): budgetTypes.BudgetActionTypes => {
  return {
    type: budgetTypes.REQUEST_BUDGET_GENERATION,
    history,
    user,
    budget,
  };
};

const requestBudgetGenerationFinished = (): budgetTypes.BudgetActionTypes => {
  return {
    type: budgetTypes.REQUEST_BUDGET_GENERATION_FINISHED,
  };
};

export default {
  requestBudgetGeneration,
  requestBudgetGenerationFinished,
};
