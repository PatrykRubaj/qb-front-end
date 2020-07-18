import { take, put } from "redux-saga/effects";
import monthActions from "../actions/monthActions";
import * as monthTypes from "../types/monthTypes";

export function* setMonth() {
  while (true) {
    const { month } = yield take(monthTypes.SET_MONTH);
    yield put(monthActions.setMonthFinished(month));
  }
}

export default [setMonth];
