import {
  SubcategorySection,
  EntityStatus,
  Subcategory,
} from "../../SpreadsheetGeneration/state";
import { SubcategoryActionTypes } from "../types/subcategoryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/subcategoryTypes";
import subcategoryReducer from "./subcategoryReducer";
import subcategoryActions from "../actions/subcategoryActions";

describe("Subcategory reducer", () => {
  it("Should return trimmmed name property when adding new category", () => {
    const initState: SubcategorySection = {
      formValues: {
        id: "e45c447f-2fab-4b18-97a8-c720ca3ef6bb",
        name: "",
        status: EntityStatus.New,
        amount: null,
        categoryId: "5a42fed2-e58e-498d-81eb-1668caad3fbe",
      },
      subcategories: [],
      onlyOneEditAllowedPrompt: false,
    };

    const newCategory: Subcategory = {
      name: "   Candy  ",
      id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      status: EntityStatus.Saved,
      categoryId: "5a42fed2-e58e-498d-81eb-1668caad3fbe",
      amount: null,
    };

    const state = subcategoryReducer(
      initState,
      subcategoryActions.addSubcategoryFinished(newCategory)
    );

    expect(state.subcategories[0]).toEqual({
      ...newCategory,
      name: "Candy",
      status: EntityStatus.Saved,
    });
  });

  it("Should return trimmmed name property when saving existing category", () => {
    const initState: SubcategorySection = {
      formValues: {
        id: "e45c447f-2fab-4b18-97a8-c720ca3ef6bb",
        name: "",
        status: EntityStatus.New,
        amount: null,
        categoryId: "5a42fed2-e58e-498d-81eb-1668caad3fbe",
      },
      subcategories: [
        {
          id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
          name: " Candy",
          status: EntityStatus.Editing,
          categoryId: "5a42fed2-e58e-498d-81eb-1668caad3fbe",
          amount: null,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };

    const changedCategory: Subcategory = {
      name: "   Sweets  ",
      id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      status: EntityStatus.Saved,
      categoryId: "5a42fed2-e58e-498d-81eb-1668caad3fbe",
      amount: null,
    };

    const state = subcategoryReducer(
      initState,
      subcategoryActions.editSubcategoryFinished(changedCategory)
    );

    expect(state.subcategories[0]).toEqual({
      ...changedCategory,
      name: "Sweets",
      status: EntityStatus.Saved,
    });
  });
});
