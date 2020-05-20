import { take, put } from "redux-saga/effects";
import incomeActions from "../actions/incomeActions";
import * as incomeTypes from "../types/incomeTypes";

export function* deleteIncome() {
  while (true) {
    const { id } = yield take(incomeTypes.DELETE_INCOME);
    yield put(incomeActions.deleteIncomeFinished(id));
  }
}

export function* addIncome() {
  while (true) {
    const { payload } = yield take(incomeTypes.ADD_INCOME);
    yield put(incomeActions.addIncomeFinished(payload));
  }
}

export function* editIncome() {
  while (true) {
    const { payload } = yield take(incomeTypes.EDIT_INCOME);
    yield put(incomeActions.editIncomeFinished(payload));
  }
}
