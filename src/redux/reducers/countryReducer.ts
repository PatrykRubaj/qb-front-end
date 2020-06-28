import { Country } from "../../SpreadsheetGeneration/state";
import { CountryActionTypes } from "../types/countryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/countryTypes";
import * as appTypes from "../types/appTypes";

export default function countryReducer(
  country: Country | null = initialState.country,
  action: CountryActionTypes | appTypes.AppActionTypes
): Country | null {
  switch (action.type) {
    case types.SET_COUNTRY_FINISHED:
      return {
        ...action.country,
      };
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return action.state.country;
    default:
      return country;
  }
}
