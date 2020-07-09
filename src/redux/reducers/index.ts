import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categoriesSection from "./categoryReducer";
import subcategorySection from "./subcategoryReducer";
import country from "./countryReducer";
import userSection from "./userReducer";
import month from "./monthReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategorySection,
  country,
  userSection,
  month,
});

export type RootState = ReturnType<typeof rootReducer>;
