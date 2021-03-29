import { take, put, call, select } from 'redux-saga/effects';
import budgetActions from '../actions/budgetActions';
import * as budgetTypes from '../types/budgetTypes';
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
  UserSection,
} from '../state';
import axios from 'axios';
import { getState } from './authSagas';
import { RootState } from '../reducers';
import authActions from '../actions/authActions';
import { NextRouter } from 'next/router';
import { initialState } from '../initialsState';
import BudgetService from '../../services/budgetService';
import { setRedirectUrl } from '../../features/user/slice';

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
export const getUserSection = (state: RootState): UserSection =>
  state.userSection;

const saveState = (state: RootState): void => {
  const modifiedState: RootState = {
    ...state,
    userSection: {
      agreedToNewsletter: false,
      agreedToPrivacyPolicy: false,
      agreedToTos: false,
      showNewsletterPrompt: false,
      isLoading: false,
      user: { ...state.userSection.user },
      redirectUrl: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(modifiedState));
};

export const generateBudgetCall = async (
  user: User,
  budget: BudgetToGenerate
): Promise<BudgetResponse | null> => {
  const budgetService = new BudgetService(user.accessToken, user.userId);
  const responseToReturn = await budgetService.generateBudget(budget);

  return responseToReturn;
};

export const readBudgetCall = async (user: User): Promise<ReadState | null> => {
  const budgetService = new BudgetService(user.accessToken, user.userId);
  const responseToReturn = await budgetService.get();

  return responseToReturn;
};

export function* generate() {
  while (true) {
    const { history, budget, user } = yield take(
      budgetTypes.REQUEST_BUDGET_GENERATION
    );

    const budgetResponse: BudgetResponse | null = yield call(
      generateBudgetCall,
      user,
      budget
    );
    history.push(Route.GeneratorResponse);
    yield put(budgetActions.requestBudgetGenerationFinished(budgetResponse));
    yield put(setRedirectUrl(Route.HomePage));

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
    const userSection: UserSection = yield select(getUserSection);

    if (user && user.accessToken && user.expiresAt > new Date().getTime()) {
      const month = yield select(getMonth);

      const budget: BudgetToGenerate = {
        country: yield select(getCountry),
        incomes: yield select(getIncomes),
        categories: yield select(getCategories),
        subcategories: yield select(getSubcategories),
        month: `${new Date().getFullYear()}-${
          month < 10 ? '0' + month : month
        }-01`,
        user: {
          agreedToNewsletter: false,
          agreedToPrivacyPolicy: userSection.agreedToPrivacyPolicy,
          agreedToTermsOfService: userSection.agreedToTos,
        },
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

    if (readState != null) {
      yield put(budgetActions.requestBudgetReadFinished(readState));
    } else {
      yield put(budgetActions.requestBudgetReadFailed());
    }
  }
}

export default [generate, budgetSave, budgetRead];
