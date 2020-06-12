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

export default {
  requestLogin,
  requestCallback,
  requestCallbackFinished,
};
