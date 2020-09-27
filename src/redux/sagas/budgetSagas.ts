import { take, put, call, select } from "redux-saga/effects";
import budgetActions from "../actions/budgetActions";
import * as budgetTypes from "../types/budgetTypes";
import { User, BudgetToGenerate, BudgetResponse } from "../state";
import axios from "axios";
import { getState } from "./authSagas";
import { RootState } from "../reducers";

const saveState = (state: RootState): void => {
  const modifiedState: RootState = {
    ...state,
    userSection: {
      agreedToNewsletter: false,
      agreedToPrivacyPolicy: false,
      showNewsletterPrompt: false,
      isLoading: false,
      user: { ...state.userSection.user },
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
  const url = `${process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_API}/api/GetAccessToken`;

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
    history.push("/generator-response");
    yield put(budgetActions.requestBudgetGenerationFinished(budgetResponse));

    const state = yield select(getState);
    yield call(saveState, state);
  }
}

export default [generate];
