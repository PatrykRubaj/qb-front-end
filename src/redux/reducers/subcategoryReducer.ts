import { SubcategorySection, EntityStatus, Subcategory } from "../state";
import { SubcategoryActionTypes } from "../types/subcategoryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/subcategoryTypes";
import arrayMove from "array-move";
import * as appTypes from "../types/appTypes";
import * as budgetTypes from "../types/budgetTypes";

export default function subcategoryReducer(
  subcategorySection: SubcategorySection = initialState.subcategorySection,
  action:
    | SubcategoryActionTypes
    | appTypes.AppActionTypes
    | budgetTypes.BudgetActionTypes
): SubcategorySection {
  switch (action.type) {
    case types.DELETE_SUBCATEGORY_FINISHED:
      return {
        ...subcategorySection,
        subcategories: subcategorySection.subcategories.filter(
          (x) => x.id !== action.id
        ),
      };
    case types.ADD_SUBCATEGORY_FINISHED:
      return {
        ...subcategorySection,
        subcategories: [
          ...subcategorySection.subcategories,
          {
            ...action.payload,
            status: EntityStatus.Saved,
            name: action.payload.name.trim(),
          },
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

            return {
              ...action.payload,
              status: EntityStatus.Saved,
              name: action.payload.name.trim(),
            };
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
    case types.MOVE_SUBCATEGORY_FINISHED: {
      const subcategory = subcategorySection.subcategories.find(
        (x) => x.id === action.id
      );

      const subcategoriesFromDifferentCategory = subcategorySection.subcategories.filter(
        (x) => x.categoryId !== subcategory?.categoryId
      );
      const subcategoriesFromSametCategory = subcategorySection.subcategories.filter(
        (x) => x.categoryId === subcategory?.categoryId
      );

      return {
        ...subcategorySection,
        subcategories: [
          ...subcategoriesFromDifferentCategory,
          ...arrayMove(
            subcategoriesFromSametCategory,
            action.startIndex,
            action.endIndex
          ),
        ],
      };
    }
    case appTypes.REQUEST_STATE_LOAD_FINISHED:
      return {
        ...initialState.subcategorySection,
        ...action.state.subcategorySection,
      };

    case budgetTypes.REQUEST_BUDGET_READ_FINISHED:
      return {
        ...subcategorySection,
        subcategories: action.payload.subcategories,
      };
    default:
      return subcategorySection;
  }
}
