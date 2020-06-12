import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categoriesSection from "./categoryReducer";
import subcategorySection from "./subcategoryReducer";
import country from "./countryReducer";
import userSection from "./userReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategorySection,
  country,
  userSection,
});

export type RootState = ReturnType<typeof rootReducer>;
