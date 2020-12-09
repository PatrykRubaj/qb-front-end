import { take, put, call, select } from "redux-saga/effects";
import authActions from "../actions/authActions";
import * as authTypes from "../types/authTypes";
import Auth from "../../auth0/Auth";
import { NextRouter } from "next/router";
import { User, Route } from "../state";
import budgetActions from "../actions/budgetActions";
import { RootState } from "../reducers";
import { getRedirectUrl } from "./budgetSagas";

export const getState = (state: RootState): RootState => state;

export const saveState = (state: RootState): void => {
  console.log("Saving to local storage");
  localStorage.setItem("state", JSON.stringify(state));
};

const redirectToLogin = (history: NextRouter, state: RootState): void => {
  saveState(state);
  const auth = new Auth(history);
  auth.login();
};

const handleLogout = (history: NextRouter): void => {
  const auth = new Auth(history);
  auth.logout();
};

const handleAuthentication = async (
  history: NextRouter
): Promise<User | null> => {
  const auth = new Auth(history);
  const user = await auth.handleAuthentication();

  return user;
};

export function* requestLoginSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_LOGIN);
    const state = yield select(getState);
    yield call(redirectToLogin, history, state);
  }
}

export function* requestSetNewsletterSaga() {
  while (true) {
    const { agreedToNewsletter } = yield take(authTypes.REQUEST_SET_NEWSLETTER);
    yield put(authActions.requestSetNewsletterFinished(agreedToNewsletter));
  }
}

export function* requestSetPrivacyPolicySaga() {
  while (true) {
    const { agreedToPrivacyPolicy } = yield take(
      authTypes.REQUEST_SET_PRIVACY_POLICY
    );
    yield put(
      authActions.requestSetPrivacyPolicyFinished(agreedToPrivacyPolicy)
    );
  }
}

export function* requestSetNewsletterPromptSaga() {
  while (true) {
    const { showNewsletterPrompt } = yield take(
      authTypes.REQUEST_SET_NEWSLETTER_PROMPT
    );
    yield put(
      authActions.requestSetNewsletterPromptFinished(showNewsletterPrompt)
    );
  }
}

export function* requestSetRedirectUrlSaga() {
  while (true) {
    const { redirectUrl } = yield take(authTypes.REQUEST_SET_REDIRECT_URL);
    yield put(authActions.requestSetRedirectUrlFinished(redirectUrl));
  }
}

export function* requestCallbackSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_CALLBACK);
    const typedHistory = history as NextRouter;
    console.log("Respone URL: ", typedHistory.asPath);
    if (/access_token|id_token|error/.test(typedHistory.asPath)) {
      const user: User = yield call(handleAuthentication, typedHistory);

      yield put(authActions.requestCallbackFinished(user));

      const redirectUrl = (yield select(getRedirectUrl)) as string;
      if (Route.GeneratorResponse === redirectUrl) {
        yield put(budgetActions.requestBudgetSave(typedHistory));
      } else {
        yield put(budgetActions.requestBudgetRead());
        typedHistory.push(Route.HomePage);
      }
    }
  }
}

export function* requestLogoutSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_LOGOUT);
    yield call(handleLogout, history);
  }
}

export default [
  requestLoginSaga,
  requestCallbackSaga,
  requestSetNewsletterSaga,
  requestSetPrivacyPolicySaga,
  requestSetNewsletterPromptSaga,
  requestSetRedirectUrlSaga,
  requestLogoutSaga,
];
