import { take, put, call, select } from 'redux-saga/effects';
import authActions from '../actions/authActions';
import * as authTypes from '../types/authTypes';
import Auth from '../../auth0/Auth';
import { NextRouter } from 'next/router';
import { User, Route } from '../state';
import budgetActions from '../actions/budgetActions';
import { RootState } from '../reducers';
import { getRedirectUrl } from './budgetSagas';
import StripePaymentService from '../../services/stripePaymentsService';
import {
  callbackFinished,
  setNewsletter,
  setNewsletterPrompt,
  setPrivacyPolicy,
  setRedirectUrl,
} from '../../features/user/slice';

export const getState = (state: RootState): RootState => state;

export const saveState = (state: RootState): void => {
  console.log('Saving to local storage');
  localStorage.setItem('state', JSON.stringify(state));
};

const redirectToSilentLogin = (history: NextRouter, state: RootState): void => {
  saveState(state);
  const auth = new Auth(history);
  auth.silentLogin();
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

const handleBillingPortalRedirect = async (history: NextRouter, user: User) => {
  const stripe = new StripePaymentService(user.accessToken);
  const urlToPortal = await stripe.requestBillingPortalSessionId();
  if (urlToPortal != null) {
    await history.push(urlToPortal);
  } else {
    await history.push(Route.Login);
  }
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
    yield call(redirectToSilentLogin, history, state);
  }
}

export function* requestCallbackSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_CALLBACK);
    const typedHistory = history as NextRouter;
    if (/access_token|id_token/.test(typedHistory.asPath)) {
      const user: User = yield call(handleAuthentication, typedHistory);

      yield put(callbackFinished(user));
      const redirectUrl = (yield select(getRedirectUrl)) as string;
      if (Route.GeneratorResponse === redirectUrl) {
        yield put(budgetActions.requestBudgetSave(typedHistory));
      } else if (Route.Generator === redirectUrl) {
        yield put(budgetActions.requestBudgetRead());
        typedHistory.push(Route.Generator);
      } else {
        yield put(budgetActions.requestBudgetRead());
        typedHistory.push(Route.HomePage);
      }
    } else if (/error/.test(typedHistory.asPath)) {
      const state = yield select(getState);
      console.log(state);
      yield call(redirectToLogin, typedHistory, state);
    }
  }
}

export function* requestLogoutSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_LOGOUT);
    yield call(handleLogout, history);
  }
}

function* requestBillingPortalSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_BILLING_PORTAL);
    const state = yield select(getState);
    console.info(state);
    const user = state.userSection.user as User;
    yield call(handleBillingPortalRedirect, history, user);
  }
}

export default [
  requestLoginSaga,
  requestCallbackSaga,
  requestLogoutSaga,
  requestBillingPortalSaga,
];
