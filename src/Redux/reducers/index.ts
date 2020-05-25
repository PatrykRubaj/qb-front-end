import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categoriesSection from "./categoryReducer";
import subcategories from "./subcategoryReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategories,
});

export type RootState = ReturnType<typeof rootReducer>;
