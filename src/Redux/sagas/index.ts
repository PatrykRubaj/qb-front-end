import { all } from "redux-saga/effects";
import * as incomeSagas from "./incomeSagas";

export default function* rootSaga() {
  yield all([
    incomeSagas.deleteIncome(),
    incomeSagas.addIncome(),
    incomeSagas.editIncome(),
    incomeSagas.setIncomeFormValues(),
  ]);
}
