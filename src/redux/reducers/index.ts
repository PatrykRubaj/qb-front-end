import { combineReducers } from '@reduxjs/toolkit';
import userSection from '../../features/user/slice';
import month from '../../features/monthSelector/slice';
import incomeSection from '../../features/manageIncome/slice';
import country from '../../features/country/slice';
import subcategorySection from '../../features/manageSubcategory/slice';
import categoriesSection from '../../features/manageCategory/slice';
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
