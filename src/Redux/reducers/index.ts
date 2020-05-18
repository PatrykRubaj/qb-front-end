import { combineReducers } from "redux";
import incomes from "./incomeReducer";
import categories from "./categoryReducer";
import subcategories from "./subcategoryReducer";

export const rootReducer = combineReducers({
  incomes,
  categories,
  subcategories
});

export type RootState = ReturnType<typeof rootReducer>;
