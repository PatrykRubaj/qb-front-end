import { NextRouter } from "next/router";
import { BudgetToGenerate, User, BudgetResponse, ReadState } from "../state";

export const REQUEST_BUDGET_GENERATION = "REQUEST_BUDGET_GENERATION";
export const REQUEST_BUDGET_GENERATION_FINISHED =
  "REQUEST_BUDGET_GENERATION_FINISHED";
export const REQUEST_BUDGET_SAVE = "REQUEST_BUDGET_SAVE";
export const REQUEST_BUDGET_SAVE_FINISHED = "REQUEST_BUDGET_SAVE_FINISHED";
export const REQUEST_BUDGET_READ = "REQUEST_BUDGET_READ";
export const REQUEST_BUDGET_READ_FINISHED = "REQUEST_BUDGET_READ_FINISHED";

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

interface RequestBudgetReadAction {
  type: typeof REQUEST_BUDGET_READ;
}

interface RequestBudgetReadFinishedAction {
  type: typeof REQUEST_BUDGET_READ_FINISHED;
  payload: ReadState;
}

export type BudgetActionTypes =
  | RequestBudgetGenerationAction
  | RequestBudgetGenerationActionFinishedAction
  | RequestBudgetSaveAction
  | RequestBudgetReadAction
  | RequestBudgetReadFinishedAction;
