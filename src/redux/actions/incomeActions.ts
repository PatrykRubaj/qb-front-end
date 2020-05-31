import { Income } from "../../SpreadsheetGeneration/state";
import * as incomeTypes from "../types/incomeTypes";

const deleteIncome = (
  incomeToDelete: Income
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.DELETE_INCOME,
    id: incomeToDelete.id,
  };
};

const deleteIncomeFinished = (id: string): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.DELETE_INCOME_FINISHED,
    id,
  };
};

const addIncome = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.ADD_INCOME,
    payload: income,
  };
};

const addIncomeFinished = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.ADD_INCOME_FINISHED,
    payload: income,
  };
};

const editIncome = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.EDIT_INCOME,
    payload: income,
  };
};

const editIncomeFinished = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.EDIT_INCOME_FINISHED,
    payload: income,
  };
};

const setIncomeFormValues = (income: Income): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.SET_INCOME_FORM,
    payload: income,
  };
};

const setIncomeFormValuesFinished = (
  income: Income
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.SET_INCOME_FORM_FINISHED,
    payload: income,
  };
};

const setPromptVisibility = (
  isVisible: boolean
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.SET_PROMPT_VISIBILITY,
    isVisible,
  };
};

const setPromptVisibilityFinished = (
  isVisible: boolean
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.SET_PROMPT_VISIBILITY_FINISHED,
    isVisible,
  };
};

const moveIncome = (
  startIndex: number,
  endIndex: number,
  id: string
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.MOVE_INCOME,
    startIndex,
    endIndex,
    id,
  };
};

const moveIncomeFinished = (
  startIndex: number,
  endIndex: number,
  id: string
): incomeTypes.IncomeActionTypes => {
  return {
    type: incomeTypes.MOVE_INCOME_FINISHED,
    startIndex,
    endIndex,
    id,
  };
};

export default {
  deleteIncome,
  deleteIncomeFinished,
  addIncome,
  addIncomeFinished,
  editIncome,
  editIncomeFinished,
  setIncomeFormValues,
  setIncomeFormValuesFinished,
  setPromptVisibility,
  setPromptVisibilityFinished,
  moveIncome,
  moveIncomeFinished,
};
