import { UserSection } from "../../SpreadsheetGeneration/state";
import { AuthActionTypes } from "../types/authTypes";
import { initialState } from "../initialsState";
import * as types from "../types/authTypes";
import * as appTypes from "../types/appTypes";

export default function userReducer(
  userSection: UserSection = initialState.userSection,
  action: AuthActionTypes | appTypes.AppActionTypes
): UserSection {
  switch (action.type) {
    case types.REQUEST_CALLBACK_FINISHED:
      return {
        ...userSection,
        user: action.user,
      };
    case types.REQUEST_SET_NEWSLETTER_FINISHED:
      return {
        ...userSection,
        agreedToNewsletter: action.agreedToNewsletter,
      };
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return {
        ...initialState.userSection,
        ...action.state.userSection,
      };
    default:
      return userSection;
  }
}
