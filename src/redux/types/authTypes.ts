import { History } from "history";
import { User } from "../../SpreadsheetGeneration/state";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_FINISHED = "REQUEST_LOGIN_FINISHED";
export const REQUEST_CALLBACK = "REQUEST_CALLBACK";
export const REQUEST_CALLBACK_FINISHED = "REQUEST_CALLBACK_FINISHED";

interface RequestLoginAction {
  type: typeof REQUEST_LOGIN;
  history: History<History.PoorMansUnknown>;
}

interface RequestCallbackdAction {
  type: typeof REQUEST_CALLBACK;
  history: History<History.PoorMansUnknown>;
}

interface RequestCallbackFinishedAction {
  type: typeof REQUEST_CALLBACK_FINISHED;
  user: User;
}

export type AuthActionTypes =
  | RequestLoginAction
  | RequestCallbackdAction
  | RequestCallbackFinishedAction;
