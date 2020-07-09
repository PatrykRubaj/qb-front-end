import { take, put, call, select } from "redux-saga/effects";
import authActions from "../actions/authActions";
import * as authTypes from "../types/authTypes";
import Auth from "../../auth0/Auth";
import { History } from "history";
import {
  User,
  BudgetToGenerate,
  Country,
  Income,
  Category,
  Subcategory,
} from "../../SpreadsheetGeneration/state";
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

const saveState = (state: RootState): void => {
  console.log("Saving to local storage");
  localStorage.setItem("state", JSON.stringify(state));
};

const redirectToLogin = (
  history: History<History.PoorMansUnknown>,
  state: RootState
): void => {
  saveState(state);
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
    const state = yield select(getState);
    yield call(redirectToLogin, history, state);
  }
}

export function* requestCallbackSaga() {
  while (true) {
    const { history } = yield take(authTypes.REQUEST_CALLBACK);
    const typedHistory = history as History<History.PoorMansUnknown>;

    if (/access_token|id_token|error/.test(typedHistory.location.hash)) {
      const user: User = yield call(handleAuthentication, typedHistory);

      yield put(authActions.requestCallbackFinished(user));

      const budget: BudgetToGenerate = {
        country: yield select(getCountry),
        incomes: yield select(getIncomes),
        categories: yield select(getCategories),
        subcategories: yield select(getSubcategories),
        month: yield select(getMonth),
      };
      yield put(
        budgetActions.requestBudgetGeneration(typedHistory, user, budget)
      );
    }
  }
}

export default [requestLoginSaga, requestCallbackSaga];
