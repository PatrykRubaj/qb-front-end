import { combineReducers } from "redux";
import incomeSection from "./incomeReducer";
import categoriesSection from "./categoryReducer";
import subcategorySection from "./subcategoryReducer";
import country from "./countryReducer";
import userSection from "./userReducer";
import month from "./monthReducer";
import budgetSection from "./budgetReducer";

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategorySection,
  country,
  userSection,
  month,
  budgetSection,
});

export type RootState = ReturnType<typeof rootReducer>;
