import * as authTypes from "../types/authTypes";
import { History } from "history";
import { User } from "../../SpreadsheetGeneration/state";

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

export default {
  requestLogin,
  requestCallback,
  requestCallbackFinished,
  requestSetNewsletter,
  requestSetNewsletterFinished,
};
