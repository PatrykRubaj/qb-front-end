import * as budgetTypes from "../types/budgetTypes";
import { History } from "history";
import { BudgetToGenerate, User, BudgetResponse } from "../state";

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

const requestBudgetGenerationFinished = (
  response: BudgetResponse | null
): budgetTypes.BudgetActionTypes => {
  return {
    type: budgetTypes.REQUEST_BUDGET_GENERATION_FINISHED,
    response,
  };
};

export default {
  requestBudgetGeneration,
  requestBudgetGenerationFinished,
};
