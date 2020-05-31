import { Country } from "../../SpreadsheetGeneration/state";
import { CountryActionTypes } from "../types/countryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/countryTypes";

export default function countryReducer(
  country: Country | null = initialState.country,
  action: CountryActionTypes
): Country | null {
  switch (action.type) {
    case types.SET_COUNTRY_FINISHED:
      return {
        ...action.country,
      };
    default:
      return country;
  }
}
