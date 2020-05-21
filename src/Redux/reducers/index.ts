import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categories from "./categoryReducer";
import subcategories from "./subcategoryReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categories,
  subcategories,
});

export type RootState = ReturnType<typeof rootReducer>;
