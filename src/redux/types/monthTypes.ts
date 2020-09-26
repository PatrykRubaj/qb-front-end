export const SET_MONTH = "SET_MONTH";
export const SET_MONTH_FINISHED = "SET_MONTH_FINISHED";

interface SetMonthAction {
  type: typeof SET_MONTH;
  month: number;
}

interface SetMonthFinishedAction {
  type: typeof SET_MONTH_FINISHED;
  month: number;
}

export type MonthActionTypes = SetMonthAction | SetMonthFinishedAction;
