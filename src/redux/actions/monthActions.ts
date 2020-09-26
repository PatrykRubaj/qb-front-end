import * as monthTypes from "../types/monthTypes";

const setMonth = (month: number): monthTypes.MonthActionTypes => {
  return {
    type: monthTypes.SET_MONTH,
    month,
  };
};

const setMonthFinished = (month: number): monthTypes.MonthActionTypes => {
  return {
    type: monthTypes.SET_MONTH_FINISHED,
    month,
  };
};

export default {
  setMonth,
  setMonthFinished,
};
