import { Income } from "../../SpreadsheetGeneration/state";
import * as incomeTypes from "../types/incomeTypes";

const deleteIncome = (
  incomeToDelete: Income
): incomeTypes.IncomeActionTypes => {
  console.log(incomeToDelete);
  return {
    type: incomeTypes.DELETE_INCOME,
    id: incomeToDelete.id
  };
};

const deleteIncomeFinished = (id: string): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.DELETE_INCOME_FINISHED,
    id
  };
};

const addIncome = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.ADD_INCOME,
    payload: income
  };
};

const addIncomeFinished = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.ADD_INCOME_FINISHED,
    payload: income
  };
};

const editIncome = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.EDIT_INCOME,
    payload: income
  };
};

const editIncomeFinished = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.EDIT_INCOME_FINISHED,
    payload: income
  };
};

export default {
  deleteIncome,
  deleteIncomeFinished,
  addIncome,
  addIncomeFinished,
  editIncome,
  editIncomeFinished
};
