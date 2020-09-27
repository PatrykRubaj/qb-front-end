import { take, put, call, select } from "redux-saga/effects";
import authActions from "../actions/authActions";
import * as authTypes from "../types/authTypes";
import Auth from "../../auth0/Auth";
import { NextRouter } from "next/router";
import {
  User,
  BudgetToGenerate,
  Country,
  Income,
  Category,
  Subcategory,
} from "../state";
import budgetActions from "../actions/budgetActions";
import { RootState } from "../reducers";

export const getState = (state: RootState): RootState => state;
export const getCountry = (state: RootState): Country | null => state.country;
export const getIncomes = (state: RootState): Array<Income> =>
  state.incomeSection.incomes;
export const getCategories = (state: RootState): Array<Category> =>
  state.categoriesSection.categories;
export const getSubcategories = (state: RootState): Array<Subcategory> =>
  state.subcategorySection.subcategories;
export const getMonth = (state: RootState): number => state.month;
export const getNewsletterAgreement = (state: RootState): boolean =>
  state.userSection.agreedToNewsletter;

export const saveState = (state: RootState): void => {
  console.log("Saving to local storage");
  localStorage.setItem("state", JSON.stringify(state));
};

const redirectToLogin = (history: NextRouter, state: RootState): void => {
  saveState(state);
  const auth = new Auth(history);
  auth.login();
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
    debugger;
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

export function* requestCallbackSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_CALLBACK);
    const typedHistory = history as NextRouter;

    if (/access_token|id_token|error/.test(typedHistory.asPath)) {
      const user: User = yield call(handleAuthentication, typedHistory);

      yield put(authActions.requestCallbackFinished(user));
      const month = yield select(getMonth);
      const budget: BudgetToGenerate = {
        country: yield select(getCountry),
        incomes: yield select(getIncomes),
        categories: yield select(getCategories),
        subcategories: yield select(getSubcategories),
        month: `${new Date().getFullYear()}-${month}-01`,
        agreedToNewsletter: yield select(getNewsletterAgreement),
      };
      yield put(
        budgetActions.requestBudgetGeneration(typedHistory, user, budget)
      );
    }
  }
}

export default [
  requestLoginSaga,
  requestCallbackSaga,
  requestSetNewsletterSaga,
  requestSetPrivacyPolicySaga,
  requestSetNewsletterPromptSaga,
];
