import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categoriesSection from "./categoryReducer";
import subcategorySection from "./subcategoryReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategorySection,
});

export type RootState = ReturnType<typeof rootReducer>;
