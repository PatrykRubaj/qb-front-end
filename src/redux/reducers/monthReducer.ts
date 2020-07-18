import { MonthActionTypes } from "../types/monthTypes";
import { initialState } from "../initialsState";
import * as types from "../types/monthTypes";
import * as appTypes from "../types/appTypes";

export default function monthReducer(
  month: number = initialState.month,
  action: MonthActionTypes | appTypes.AppActionTypes
): number {
  switch (action.type) {
    case types.SET_MONTH_FINISHED:
      return action.month;
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return action.state.month;
    default:
      return month;
  }
}
