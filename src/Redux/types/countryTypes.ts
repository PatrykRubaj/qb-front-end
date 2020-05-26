import { Country } from "../../SpreadsheetGeneration/state";
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_COUNTRY_FINISHED = "SET_COUNTRY_FINISHED";

interface SetCountryAction {
  type: typeof SET_COUNTRY;
  country: Country;
}

interface SetCountryFinishedAction {
  type: typeof SET_COUNTRY_FINISHED;
  country: Country;
}

export type CountryActionTypes = SetCountryAction | SetCountryFinishedAction;
