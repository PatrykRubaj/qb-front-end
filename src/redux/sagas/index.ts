import { all, fork } from "redux-saga/effects";
import * as incomeSagas from "./incomeSagas";
import categorySagas from "./categorySagas";
import * as subcategorySagas from "./subcategorySagas";
import * as countrySagas from "./countrySagas";
import authSagas from "./authSagas";

export default function* rootSaga() {
  yield all([
    incomeSagas.deleteIncome(),
    incomeSagas.addIncome(),
    incomeSagas.editIncome(),
    incomeSagas.setIncomeFormValues(),
    incomeSagas.setPromptVisibility(),
    incomeSagas.moveIncome(),
    ...categorySagas.map(cs => fork(cs)),
    subcategorySagas.deleteSubcategory(),
    subcategorySagas.addSubcategory(),
    subcategorySagas.editSubcategory(),
    subcategorySagas.setSubcategoryFormValues(),
    subcategorySagas.setSubcategoryPromptVisibility(),
    subcategorySagas.enterSubcategoryAmountVisibility(),
    subcategorySagas.moveSubcategory(),
    countrySagas.setCountry(),
    ...authSagas.map(as => fork(as)),
  ]);
}
