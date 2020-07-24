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
  let responseFromAxios: any = null;
  let message = "";
  let code = 0;

  axios
    .post(url, budget, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then(response => {
      responseFromAxios = response;
      responseToReturn = responseFromAxios?.data as BudgetResponse;
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message = error.response.data;
        code = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        message = error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        message = error;
      }
      console.log(error.config);
    });

  responseToReturn = {
    errors: {
      message,
      code,
    },
  };

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
