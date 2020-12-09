import { take, put, call, select } from "redux-saga/effects";
import budgetActions from "../actions/budgetActions";
import * as budgetTypes from "../types/budgetTypes";
import {
  User,
  BudgetToGenerate,
  Country,
  Income,
  Category,
  Subcategory,
  Route,
  BudgetResponse,
  ReadState,
} from "../state";
import axios from "axios";
import { getState } from "./authSagas";
import { RootState } from "../reducers";
import authActions from "../actions/authActions";
import { NextRouter } from "next/router";
import { initialState } from "../initialsState";

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
export const getRedirectUrl = (state: RootState): string =>
  state.userSection.redirectUrl;
export const getUser = (state: RootState): User => state.userSection.user;

const saveState = (state: RootState): void => {
  const modifiedState: RootState = {
    ...state,
    userSection: {
      agreedToNewsletter: false,
      agreedToPrivacyPolicy: false,
      showNewsletterPrompt: false,
      isLoading: false,
      user: { ...state.userSection.user },
      redirectUrl: "",
    },
  };
  console.log("Saving to local storage after budget generated");
  localStorage.setItem("state", JSON.stringify(modifiedState));
};

export const apiCall = async (
  user: User,
  budget: BudgetToGenerate
): Promise<BudgetResponse | null> => {
  let responseToReturn: BudgetResponse | null = null;
  const url = `${process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_API}/api/GenerateBudget`;
  console.log(url);
  try {
    const response = await axios.post(url, budget, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Response", response);
    if (response.data?.error != null) {
      responseToReturn = {
        errors: {
          code: response.data?.error.code,
          message: response.data?.error.message,
        },
      };
    } else {
      responseToReturn = response.data as BudgetResponse;
    }
  } catch (ex) {
    console.log("Exception", ex);

    if (ex.response) {
      responseToReturn = {
        errors: {
          code: ex.response.status,
          message: ex.response.data,
        },
      };
    } else if (ex.request) {
      responseToReturn = {
        errors: {
          code: 0,
          message: ex.request,
        },
      };
    } else {
      responseToReturn = {
        errors: {
          code: 0,
          message: ex.message,
        },
      };
    }
  }

  console.log("Returned response: ", responseToReturn);
  return responseToReturn;
};

export const readBudgetCall = async (user: User): Promise<ReadState | null> => {
  let responseToReturn: ReadState | null = null;
  const url = `${
    process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_API
  }/api/GetBudget/${encodeURI(user.userId)}`;
  console.log("readBudgetCall GET: ", url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Response", response);

    if (response.data?.error != null) {
      return null;
    } else {
      const returnedResponse = response.data as any;

      responseToReturn = {
        categories: returnedResponse.categories,
        subcategories: returnedResponse.subcategories,
        incomes: returnedResponse.incomes,
        country: returnedResponse.country,
      };
    }
  } catch (ex) {
    console.log("Exception", ex);
  }

  console.log("Returned response: ", responseToReturn);
  return responseToReturn;
};

export function* generate() {
  while (true) {
    const { history, budget, user } = yield take(
      budgetTypes.REQUEST_BUDGET_GENERATION
    );

    console.log("Budget to send: ", budget);
    const budgetResponse: BudgetResponse | null = yield call(
      apiCall,
      user,
      budget
    );
    console.log(history);
    console.log("Generate saga run ", budgetResponse);
    history.push(Route.GeneratorResponse);
    yield put(budgetActions.requestBudgetGenerationFinished(budgetResponse));
    yield put(authActions.requestSetRedirectUrlFinished(Route.HomePage));

    const state = yield select(getState);
    yield call(saveState, state);
  }
}

export function* budgetSave() {
  while (true) {
    const { history } = yield take(budgetTypes.REQUEST_BUDGET_SAVE);
    const typedHistory = history as NextRouter;
    typedHistory.push(Route.Loading);
    const user: User = yield select(getUser);

    if (user && user.accessToken && user.expiresAt > new Date().getTime()) {
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
    } else {
      // yield put(authActions.requestCallback(typedHistory));
      typedHistory.push(Route.Login);
    }
  }
}

export function* budgetRead() {
  while (true) {
    yield take(budgetTypes.REQUEST_BUDGET_READ);
    const user: User = yield select(getUser);
    const readState = yield call(readBudgetCall, user);
    console.log("budgetRead saga", readState);

    if (readState != null) {
      yield put(budgetActions.requestBudgetReadFinished(readState));
    } else {
      yield put(budgetActions.requestBudgetReadFailed());
    }
  }
}

export default [generate, budgetSave, budgetRead];
