import { History } from "history";
import { User } from "../../SpreadsheetGeneration/state";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_FINISHED = "REQUEST_LOGIN_FINISHED";
export const REQUEST_CALLBACK = "REQUEST_CALLBACK";
export const REQUEST_CALLBACK_FINISHED = "REQUEST_CALLBACK_FINISHED";
export const REQUEST_SET_NEWSLETTER = "REQUEST_SET_NEWSLETTER";
export const REQUEST_SET_NEWSLETTER_FINISHED =
  "REQUEST_SET_NEWSLETTER_FINISHED";

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

interface RequestSetNewsletterAction {
  type: typeof REQUEST_SET_NEWSLETTER;
  agreedToNewsletter: boolean;
}

interface RequestSetNewsletterFinishedAction {
  type: typeof REQUEST_SET_NEWSLETTER_FINISHED;
  agreedToNewsletter: boolean;
}

export type AuthActionTypes =
  | RequestLoginAction
  | RequestCallbackdAction
  | RequestCallbackFinishedAction
  | RequestSetNewsletterAction
  | RequestSetNewsletterFinishedAction;
