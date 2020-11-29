import { NextRouter } from "next/router";
import { BudgetToGenerate, User, BudgetResponse } from "../state";

export const REQUEST_BUDGET_GENERATION = "REQUEST_BUDGET_GENERATION";
export const REQUEST_BUDGET_GENERATION_FINISHED =
  "REQUEST_BUDGET_GENERATION_FINISHED";
export const REQUEST_BUDGET_SAVE = "REQUEST_BUDGET_SAVE";
export const REQUEST_BUDGET_SAVE_FINISHED = "REQUEST_BUDGET_SAVE_FINISHED";

interface RequestBudgetGenerationAction {
  type: typeof REQUEST_BUDGET_GENERATION;
  history: NextRouter;
  user: User;
  budget: BudgetToGenerate;
}

interface RequestBudgetGenerationActionFinishedAction {
  type: typeof REQUEST_BUDGET_GENERATION_FINISHED;
  response: BudgetResponse | null;
}

interface RequestBudgetSaveAction {
  type: typeof REQUEST_BUDGET_SAVE;
  history: NextRouter;
}

export type BudgetActionTypes =
  | RequestBudgetGenerationAction
  | RequestBudgetGenerationActionFinishedAction
  | RequestBudgetSaveAction;
