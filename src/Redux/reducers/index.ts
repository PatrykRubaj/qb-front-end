import { combineReducers } from "redux";
import incomes from "./incomeReducer";

export const rootReducer = combineReducers({ incomes });

export type RootState = ReturnType<typeof rootReducer>;
