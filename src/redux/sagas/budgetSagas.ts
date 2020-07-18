import { take, put, call } from "redux-saga/effects";
import budgetActions from "../actions/budgetActions";
import * as budgetTypes from "../types/budgetTypes";
import { User, BudgetToGenerate } from "../../SpreadsheetGeneration/state";
import axios from "axios";

export const apiCall = async (
  user: User,
  budget: BudgetToGenerate
): Promise<void> => {
  const url = `${process.env.REACT_APP_AZURE_FUNCTIONS_API}/api/GetAccessToken`;
  try {
    const response = await axios.post(url, budget, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("Response", response);
  } catch (ex) {
    console.log("Exception", ex);
  }
};

export function* generate() {
  while (true) {
    const { history, budget, user } = yield take(
      budgetTypes.REQUEST_BUDGET_GENERATION
    );
    console.log("Budget to send: ", budget);
    yield call(apiCall, user, budget);
    console.log(history);
    console.log("Generate saga run");
    yield put(budgetActions.requestBudgetGenerationFinished());
  }
}

export default [generate];
