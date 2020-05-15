import { Income, EntityStatus } from "../../SpreadsheetGeneration/state";
import { IncomeActionTypes } from "../types/incomeTypes";

const initialSate: Income[] = [
  {
    id: "14",
    name: "Testowy Income",
    status: EntityStatus.Saved,
    amount: undefined
  }
];

export default function incomeReducer(
  incomes: Income[] = initialSate,
  action: IncomeActionTypes
): Income[] {
  switch (action.type) {
    default:
      return incomes;
  }
}
