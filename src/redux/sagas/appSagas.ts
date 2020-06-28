import { take, put, call } from "redux-saga/effects";
import * as appTypes from "../types/appTypes";
import appActions from "../actions/appActions";
import { RootState } from "../reducers";

const getStateFromLocalStorage = (): RootState | null => {
  console.log("Reading local storage");
  const state = localStorage.getItem("state");
  if (state !== null) {
    const parsedState = JSON.parse(state);
    return parsedState;
  }

  return null;
};

export function* requestStateSaga() {
  while (true) {
    yield take(appTypes.REQUEST_STATE_LOAD);
    const state = yield call(getStateFromLocalStorage);

    if (state !== null) {
      yield put(appActions.requestLoadStateFinished(state));
    }
  }
}

export default [requestStateSaga];
