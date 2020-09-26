import * as authTypes from "../types/authTypes";
import { History } from "history";
import { User } from "../state";

const requestLogin = (
  history: History<History.PoorMansUnknown>
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_LOGIN,
    history,
  };
};

const requestCallback = (
  history: History<History.PoorMansUnknown>
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_CALLBACK,
    history,
  };
};

const requestCallbackFinished = (user: User): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_CALLBACK_FINISHED,
    user,
  };
};

const requestSetNewsletter = (
  agreedToNewsletter: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_NEWSLETTER,
    agreedToNewsletter,
  };
};

const requestSetNewsletterFinished = (
  agreedToNewsletter: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_NEWSLETTER_FINISHED,
    agreedToNewsletter,
  };
};

const requestSetPrivacyPolicy = (
  agreedToPrivacyPolicy: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_PRIVACY_POLICY,
    agreedToPrivacyPolicy,
  };
};

const requestSetPrivacyPolicyFinished = (
  agreedToPrivacyPolicy: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_PRIVACY_POLICY_FINISHED,
    agreedToPrivacyPolicy,
  };
};

const requestSetNewsletterPrompt = (
  showNewsletterPrompt: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_NEWSLETTER_PROMPT,
    showNewsletterPrompt,
  };
};

const requestSetNewsletterPromptFinished = (
  showNewsletterPrompt: boolean
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_SET_NEWSLETTER_PROMPT_FINISHED,
    showNewsletterPrompt,
  };
};

export default {
  requestLogin,
  requestCallback,
  requestCallbackFinished,
  requestSetNewsletter,
  requestSetNewsletterFinished,
  requestSetPrivacyPolicy,
  requestSetPrivacyPolicyFinished,
  requestSetNewsletterPrompt,
  requestSetNewsletterPromptFinished,
};
