import { all, fork } from 'redux-saga/effects';
import authSagas from './authSagas';
import budgetSagas from './budgetSagas';
import appSagas from './appSagas';
import paymentSagas from './paymentSaga';

export default function* rootSaga() {
  yield all([
    ...authSagas.map((as) => fork(as)),
    ...budgetSagas.map((as) => fork(as)),
    ...appSagas.map((as) => fork(as)),
    ...paymentSagas.map((ps) => fork(ps)),
  ]);
}
