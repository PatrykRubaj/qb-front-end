import { take, put, call } from "redux-saga/effects";
import budgetActions from "../actions/budgetActions";
import * as budgetTypes from "../types/budgetTypes";
import {
  User,
  BudgetToGenerate,
  BudgetResponse,
} from "../../SpreadsheetGeneration/state";
import axios from "axios";

export const apiCall = async (
  user: User,
  budget: BudgetToGenerate
): Promise<BudgetResponse | null> => {
  let responseToReturn: BudgetResponse | null = null;
  const url = `${process.env.REACT_APP_AZURE_FUNCTIONS_API}/api/GetAccessToken`;
  try {
    const response = await axios.post(url, budget, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Response", response);
    responseToReturn = response.data as BudgetResponse;
  } catch (ex) {
    console.log("Exception", ex);
    let message = "";
    let code = 0;

    if (ex.response) {
      message = ex.response.data;
      code = ex.response.status;
    } else if (ex.request) {
      message = ex.request;
    } else {
      message = ex.message;
    }

    responseToReturn = {
      errors: {
        message,
        code,
      },
    };
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
  }
}

export default [generate];
