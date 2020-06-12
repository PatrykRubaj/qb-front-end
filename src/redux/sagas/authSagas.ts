import { take, put, call } from "redux-saga/effects";
import authActions from "../actions/authActions";
import * as authTypes from "../types/authTypes";
import Auth from "../../auth0/Auth";
import { History } from "history";
import { User } from "../../SpreadsheetGeneration/state";

const redirectToLogin = (history: History<History.PoorMansUnknown>): void => {
  const auth = new Auth(history);
  auth.login();
};

const handleAuthentication = async (
  history: History<History.PoorMansUnknown>
): Promise<User | null> => {
  const auth = new Auth(history);
  const user = await auth.handleAuthentication();

  return user;
};

export function* requestLoginSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_LOGIN);
    yield call(redirectToLogin, history);
  }
}

export function* requestCallbackSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_CALLBACK);
    const typedHistory = history as History<History.PoorMansUnknown>;

    if (/access_token|id_token|error/.test(typedHistory.location.hash)) {
      const user = yield call(handleAuthentication, typedHistory);
      yield put(authActions.requestCallbackFinished(user));
    }
  }
}

export default [requestLoginSaga, requestCallbackSaga];
