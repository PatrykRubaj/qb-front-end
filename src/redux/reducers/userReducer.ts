import { UserSection } from "../../SpreadsheetGeneration/state";
import { AuthActionTypes } from "../types/authTypes";
import { initialState } from "../initialsState";
import * as types from "../types/authTypes";

export default function userReducer(
  userSection: UserSection = initialState.userSection,
  action: AuthActionTypes
): UserSection {
  switch (action.type) {
    case types.REQUEST_CALLBACK_FINISHED:
      return {
        ...userSection,
        user: action.user,
      };
    default:
      return userSection;
  }
}
