import {
  CategorySection,
  EntityStatus,
  Category,
} from "../../SpreadsheetGeneration/state";
import { CategoryActionTypes } from "../types/categoryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/categoryTypes";
import arrayMove from "array-move";

export default function categoryReducer(
  categorySection: CategorySection = initialState.categoriesSection,
  action: CategoryActionTypes
): CategorySection {
  switch (action.type) {
    case types.DELETE_CATEGORY_FINISHED:
      return {
        ...categorySection,
        categories: categorySection.categories.filter(x => x.id !== action.id),
      };
    case types.ADD_CATEGORY_FINISHED:
      return {
        ...categorySection,
        categories: [
          ...categorySection.categories,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
        ],
      };
    case types.EDIT_CATEGORY_FINISHED:
      return {
        ...categorySection,
        categories: categorySection.categories.map(
          (stateCategory: Category) => {
            if (stateCategory.id !== action.payload.id) {
              return stateCategory;
            }

            return {
              ...action.payload,
              status: EntityStatus.Saved,
              name: action.payload.name.trim(),
            };
          }
        ),
      };
    case types.SET_CATEGORY_FORM_FINISHED:
      return {
        ...categorySection,
        formValues: action.payload,
        categories: categorySection.categories.map(
          (stateCategory: Category) => {
            if (stateCategory.id !== action.payload.id) {
              return stateCategory;
            }

            return { ...action.payload, status: EntityStatus.Editing };
          }
        ),
      };
    case types.SET_CATEGORY_PROMPT_VISIBILITY_FINISHED:
      return {
        ...categorySection,
        onlyOneEditAllowedPrompt: action.isVisible,
      };
    case types.MOVE_CATEGORY_FINISHED:
      return {
        ...categorySection,
        categories: arrayMove(
          categorySection.categories,
          action.startIndex,
          action.endIndex
        ),
      };
    default:
      return categorySection;
  }
}
