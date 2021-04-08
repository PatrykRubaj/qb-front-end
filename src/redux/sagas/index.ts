import { all, fork } from 'redux-saga/effects';
import categorySagas from './categorySagas';
import * as subcategorySagas from './subcategorySagas';
import * as countrySagas from './countrySagas';
import authSagas from './authSagas';
import budgetSagas from './budgetSagas';
import appSagas from './appSagas';
import paymentSagas from './paymentSaga';

export default function* rootSaga() {
  yield all([
    ...categorySagas.map((cs) => fork(cs)),
    subcategorySagas.deleteSubcategory(),
    subcategorySagas.addSubcategory(),
    subcategorySagas.editSubcategory(),
    subcategorySagas.setSubcategoryFormValues(),
    subcategorySagas.setSubcategoryPromptVisibility(),
    subcategorySagas.enterSubcategoryAmountVisibility(),
    subcategorySagas.moveSubcategory(),
    countrySagas.setCountry(),
    ...authSagas.map((as) => fork(as)),
    ...budgetSagas.map((as) => fork(as)),
    ...appSagas.map((as) => fork(as)),
    ...paymentSagas.map((ps) => fork(ps)),
  ]);
}
