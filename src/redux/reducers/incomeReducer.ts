import { Income, IncomeSection, EntityStatus } from "../state";
import { IncomeActionTypes } from "../types/incomeTypes";
import { initialState } from "../initialsState";
import * as types from "../types/incomeTypes";
import arrayMove from "array-move";
import * as appTypes from "../types/appTypes";

export default function incomeReducer(
  incomeSection: IncomeSection = initialState.incomeSection,
  action: IncomeActionTypes | appTypes.AppActionTypes
): IncomeSection {
  switch (action.type) {
    case types.DELETE_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: incomeSection.incomes.filter((x) => x.id !== action.id),
      };
    case types.ADD_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: [
          ...incomeSection.incomes,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
        ],
      };
    case types.EDIT_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: incomeSection.incomes.map((stateIncome: Income) => {
          if (stateIncome.id !== action.payload.id) {
            return stateIncome;
          }

          return {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          };
        }),
      };
    case types.SET_INCOME_FORM_FINISHED:
      return {
        ...incomeSection,
        formValues: action.payload,
        incomes: incomeSection.incomes.map((stateIncome: Income) => {
          if (stateIncome.id !== action.payload.id) {
            return stateIncome;
          }

          return { ...action.payload, status: EntityStatus.Editing };
        }),
      };
    case types.SET_PROMPT_VISIBILITY_FINISHED:
      return {
        ...incomeSection,
        onlyOneEditAllowedPrompt: action.isVisible,
      };
    case types.MOVE_INCOME_FINISHED:
      return {
        ...incomeSection,
        incomes: arrayMove(
          incomeSection.incomes,
          action.startIndex,
          action.endIndex
        ),
      };
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return {
        ...initialState.incomeSection,
        ...action.state.incomeSection,
      };
    default:
      return incomeSection;
  }
}
