import {
  SubcategorySection,
  EntityStatus,
  Subcategory,
} from "../../SpreadsheetGeneration/state";
import { SubcategoryActionTypes } from "../types/subcategoryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/subcategoryTypes";

export default function subcategoryReducer(
  subcategorySection: SubcategorySection = initialState.subcategorySection,
  action: SubcategoryActionTypes
): SubcategorySection {
  switch (action.type) {
    case types.DELETE_SUBCATEGORY_FINISHED:
      return {
        ...subcategorySection,
        subcategories: subcategorySection.subcategories.filter(
          x => x.id !== action.id
        ),
      };
    case types.ADD_SUBCATEGORY_FINISHED:
      return {
        ...subcategorySection,
        subcategories: [
          ...subcategorySection.subcategories,
          { ...action.payload, status: EntityStatus.Saved },
        ],
      };
    case types.EDIT_SUBCATEGORY_FINISHED:
      return {
        ...subcategorySection,
        subcategories: subcategorySection.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.payload.id) {
              return stateSubcategory;
            }

            return { ...action.payload, status: EntityStatus.Saved };
          }
        ),
      };
    case types.SET_SUBCATEGORY_FORM_FINISHED:
      return {
        ...subcategorySection,
        formValues: action.payload,
        subcategories: subcategorySection.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.payload.id) {
              return stateSubcategory;
            }

            return { ...action.payload, status: EntityStatus.Editing };
          }
        ),
      };
    case types.SET_SUBCATEGORY_PROMPT_VISIBILITY_FINISHED:
      return {
        ...subcategorySection,
        onlyOneEditAllowedPrompt: action.isVisible,
      };
    case types.ENTER_SUBCATEGORY_AMOUNT_FINISHED:
      return {
        ...subcategorySection,
        subcategories: subcategorySection.subcategories.map(
          (stateSubcategory: Subcategory) => {
            if (stateSubcategory.id !== action.id) {
              return stateSubcategory;
            }

            return { ...stateSubcategory, amount: action.amount };
          }
        ),
      };
    default:
      return subcategorySection;
  }
}
