import { combineReducers } from '@reduxjs/toolkit';
import incomeSection from './incomeReducer';
import categoriesSection from './categoryReducer';
import subcategorySection from './subcategoryReducer';
import country from './countryReducer';
import userSection from '../../features/user/slice';
import month from './monthReducer';
import budgetSection from './budgetReducer';
import paymentSection from './paymentReducer';

export const rootReducer = combineReducers({
  incomeSection,
  categoriesSection,
  subcategorySection,
  country,
  userSection,
  month,
  budgetSection,
  paymentSection,
});

export type RootState = ReturnType<typeof rootReducer>;
