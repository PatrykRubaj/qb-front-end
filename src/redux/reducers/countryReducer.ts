import { Country } from "../state";
import { CountryActionTypes } from "../types/countryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/countryTypes";
import * as appTypes from "../types/appTypes";
import * as budgetTypes from "../types/budgetTypes";

export default function countryReducer(
  country: Country | null = initialState.country,
  action:
    | CountryActionTypes
    | appTypes.AppActionTypes
    | budgetTypes.BudgetActionTypes
): Country | null {
  switch (action.type) {
    case types.SET_COUNTRY_FINISHED:
      return {
        ...action.country,
      };
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return action.state.country || initialState.country;
    case budgetTypes.REQUEST_BUDGET_READ_FINISHED:
      return {
        ...action.payload.country,
      };
    default:
      return country;
  }
}
