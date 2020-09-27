import { NextRouter } from "next/router";
import { User } from "../state";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_FINISHED = "REQUEST_LOGIN_FINISHED";
export const REQUEST_CALLBACK = "REQUEST_CALLBACK";
export const REQUEST_CALLBACK_FINISHED = "REQUEST_CALLBACK_FINISHED";
export const REQUEST_SET_NEWSLETTER = "REQUEST_SET_NEWSLETTER";
export const REQUEST_SET_NEWSLETTER_FINISHED =
  "REQUEST_SET_NEWSLETTER_FINISHED";
export const REQUEST_SET_PRIVACY_POLICY = "REQUEST_SET_PRIVACY_POLICY";
export const REQUEST_SET_PRIVACY_POLICY_FINISHED =
  "REQUEST_SET_PRIVACY_POLICY_FINISHED";
export const REQUEST_SET_NEWSLETTER_PROMPT = "REQUEST_SET_NEWSLETTER_PROMPT";
export const REQUEST_SET_NEWSLETTER_PROMPT_FINISHED =
  "REQUEST_SET_NEWSLETTER_PROMPT_FINISHED";

interface RequestLoginAction {
  type: typeof REQUEST_LOGIN;
  history: NextRouter;
}

interface RequestCallbackdAction {
  type: typeof REQUEST_CALLBACK;
  history: NextRouter;
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

interface RequestSetPrivacyPolicyAction {
  type: typeof REQUEST_SET_PRIVACY_POLICY;
  agreedToPrivacyPolicy: boolean;
}

interface RequestSetPrivacyPolicyFinishedAction {
  type: typeof REQUEST_SET_PRIVACY_POLICY_FINISHED;
  agreedToPrivacyPolicy: boolean;
}
interface RequestSetNewsletterPromptAction {
  type: typeof REQUEST_SET_NEWSLETTER_PROMPT;
  showNewsletterPrompt: boolean;
}
interface RequestSetNewsletterPromptFinishedAction {
  type: typeof REQUEST_SET_NEWSLETTER_PROMPT_FINISHED;
  showNewsletterPrompt: boolean;
}

export type AuthActionTypes =
  | RequestLoginAction
  | RequestCallbackdAction
  | RequestCallbackFinishedAction
  | RequestSetNewsletterAction
  | RequestSetNewsletterFinishedAction
  | RequestSetPrivacyPolicyAction
  | RequestSetPrivacyPolicyFinishedAction
  | RequestSetNewsletterPromptAction
  | RequestSetNewsletterPromptFinishedAction;
