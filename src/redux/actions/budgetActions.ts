import * as budgetTypes from "../types/budgetTypes";
import { NextRouter } from "next/router";
import { BudgetToGenerate, User, BudgetResponse } from "../state";

const requestBudgetGeneration = (
  history: NextRouter,
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

const requestBudgetSave = (
  history: NextRouter
): budgetTypes.BudgetActionTypes => {
  return {
    type: budgetTypes.REQUEST_BUDGET_SAVE,
    history,
  };
};

export default {
  requestBudgetGeneration,
  requestBudgetGenerationFinished,
  requestBudgetSave,
};
