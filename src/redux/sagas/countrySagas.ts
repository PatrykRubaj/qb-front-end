import { take, put } from "redux-saga/effects";
import countryActions from "../actions/countryActions";
import * as countryTypes from "../types/countryTypes";

export function* setCountry() {
  while (true) {
    const { country } = yield take(countryTypes.SET_COUNTRY);
    yield put(countryActions.setCountryFinished(country));
  }
}
