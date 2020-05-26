import { all } from "redux-saga/effects";
import * as incomeSagas from "./incomeSagas";
import * as categorySagas from "./categorySagas";
import * as subcategorySagas from "./subcategorySagas";
import * as countrySagas from "./countrySagas";

export default function* rootSaga() {
  yield all([
    incomeSagas.deleteIncome(),
    incomeSagas.addIncome(),
    incomeSagas.editIncome(),
    incomeSagas.setIncomeFormValues(),
    incomeSagas.setPromptVisibility(),
    categorySagas.deleteCategory(),
    categorySagas.addCategory(),
    categorySagas.editCategory(),
    categorySagas.setCategoryFormValues(),
    categorySagas.setPromptVisibility(),
    subcategorySagas.deleteSubcategory(),
    subcategorySagas.addSubcategory(),
    subcategorySagas.editSubcategory(),
    subcategorySagas.setSubcategoryFormValues(),
    subcategorySagas.setSubcategoryPromptVisibility(),
    subcategorySagas.enterSubcategoryAmountVisibility(),
    countrySagas.setCountry(),
  ]);
}
