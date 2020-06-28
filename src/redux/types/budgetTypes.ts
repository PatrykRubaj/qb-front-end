import { History } from "history";
import { BudgetToGenerate, User } from "../../SpreadsheetGeneration/state";

export const REQUEST_BUDGET_GENERATION = "REQUEST_BUDGET_GENERATION";
export const REQUEST_BUDGET_GENERATION_FINISHED =
  "REQUEST_BUDGET_GENERATION_FINISHED";

interface RequestBudgetGenerationAction {
  type: typeof REQUEST_BUDGET_GENERATION;
  history: History<History.PoorMansUnknown>;
  user: User;
  budget: BudgetToGenerate;
}

interface RequestBudgetGenerationActionFinishedAction {
  type: typeof REQUEST_BUDGET_GENERATION_FINISHED;
}

export type BudgetActionTypes =
  | RequestBudgetGenerationAction
  | RequestBudgetGenerationActionFinishedAction;
