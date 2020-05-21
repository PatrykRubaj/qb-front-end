import { RootState } from "./reducers";
import { v4 as uuidv4 } from "uuid";
import { EntityStatus } from "../SpreadsheetGeneration/state";

export const initialState: RootState = {
  incomeSection: {
    formValues: {
      id: uuidv4(),
      name: "",
      amount: undefined,
      status: EntityStatus.New,
    },
    incomes: [
      {
        id: uuidv4(),
        amount: 1500,
        name: "Starbucks",
        status: EntityStatus.Saved,
      },
      {
        id: uuidv4(),
        amount: 500,
        name: "McDonald's",
        status: EntityStatus.Saved,
      },
    ],
    onlyOneEditAllowedPrompt: false,
  },
  categories: [
    {
      id: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      name: "Food",
      status: EntityStatus.Saved,
    },
    {
      id: "1e987730-c0b1-4850-b06e-7c3612393254",
      name: "Utilities",
      status: EntityStatus.Saved,
    },
  ],
  subcategories: [
    {
      id: "d6fe654c-3976-4e16-8b25-e4c4a03b5e72",
      name: "Home",
      categoryId: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      amount: null,
      status: EntityStatus.Saved,
    },
    {
      id: "fb893109-860f-4f04-8319-3cab83812aab",
      name: "Takeout",
      categoryId: "ae1f9c34-6e8e-43a9-a194-68c80bb939fe",
      amount: null,
      status: EntityStatus.Saved,
    },
  ],
};
