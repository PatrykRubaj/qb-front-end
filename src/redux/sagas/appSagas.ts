import { take, put, call } from 'redux-saga/effects';
import * as appTypes from '../types/appTypes';
import appActions from '../actions/appActions';
import { RootState } from '../reducers';

const getStateFromLocalStorage = (): RootState | null => {
  const state = localStorage.getItem('state');
  if (state !== null) {
    const parsedState = JSON.parse(state);
    return parsedState;
  }

  return null;
};

export function* requestStateSaga() {
  while (true) {
    yield take(appTypes.REQUEST_STATE_LOAD);
    const state: RootState | null = yield call(getStateFromLocalStorage);

    if (state !== null) {
      try {
        yield put(appActions.requestLoadStateFinished(state));
      } catch (ex) {
        console.log(ex);
        localStorage.clear();
      }
    }
  }
}

export default [requestStateSaga];
