import {
  CategorySection,
  EntityStatus,
  Category,
} from "../../SpreadsheetGeneration/state";
import { CategoryActionTypes } from "../types/categoryTypes";
import { initialState } from "../initialsState";
import * as types from "../types/categoryTypes";
import categoryReducer from "./categoryReducer";
import categoryActions from "../actions/categoryActions";

describe("Category reducer", () => {
  it("Should return trimmmed name property when adding new category", () => {
    const initState: CategorySection = {
      formValues: {
        id: "e45c447f-2fab-4b18-97a8-c720ca3ef6bb",
        name: "",
        status: EntityStatus.New,
      },
      categories: [],
      onlyOneEditAllowedPrompt: false,
    };

    const newCategory: Category = {
      id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      name: "   Food  ",
      status: EntityStatus.Saved,
    };

    const state = categoryReducer(
      initState,
      categoryActions.addCategoryFinished(newCategory)
    );

    expect(state.categories[0]).toEqual({
      ...newCategory,
      name: "Food",
      status: EntityStatus.Saved,
    });
  });

  it("Should return trimmmed name property when saving existing category", () => {
    const initState: CategorySection = {
      formValues: {
        id: "e45c447f-2fab-4b18-97a8-c720ca3ef6bb",
        name: "",
        status: EntityStatus.New,
      },
      categories: [
        {
          id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
          name: " Food",
          status: EntityStatus.Editing,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };

    const changedCategory: Category = {
      id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      name: "   Food  ",
      status: EntityStatus.Saved,
    };

    const state = categoryReducer(
      initState,
      categoryActions.editCategoryFinished(changedCategory)
    );

    expect(state.categories[0]).toEqual({
      ...changedCategory,
      name: "Food",
      status: EntityStatus.Saved,
    });
  });

  it("Should return categories in new order id2, id3, id1", () => {
    const initState: CategorySection = {
      formValues: {
        id: "e45c447f-2fab-4b18-97a8-c720ca3ef6bb",
        name: "",
        status: EntityStatus.New,
      },
      categories: [
        {
          id: "id1",
          name: "Category 1",
          status: EntityStatus.Saved,
        },
        {
          id: "id2",
          name: "Category 2",
          status: EntityStatus.Saved,
        },
        {
          id: "id3",
          name: "Category 3",
          status: EntityStatus.Saved,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };

    expect(initState.categories[0].id).toEqual("id1");
    expect(initState.categories[1].id).toEqual("id2");
    expect(initState.categories[2].id).toEqual("id3");

    const movedCategory: Category = {
      id: "id1",
      name: "Category 1",
      status: EntityStatus.Saved,
    };

    const state = categoryReducer(
      initState,
      categoryActions.moveCategoryFinished(0, 2, movedCategory.id)
    );

    expect(state.categories[0].id).toEqual("id2");
    expect(state.categories[1].id).toEqual("id3");
    expect(state.categories[2].id).toEqual("id1");
  });
});
