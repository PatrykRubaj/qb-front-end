import actions from "./incomeActions";
import * as types from "../types/incomeTypes";
import { Income, EntityStatus } from "../state";

describe("Income actions", () => {
  it("should return IncomeActionType when deleteIncome called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.Saved,
    };
    const expectedAction: types.IncomeActionTypes = {
      id: "id1",
      type: types.DELETE_INCOME,
    };

    expect(actions.deleteIncome(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when deleteIncomeFinished called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.Saved,
    };
    const expectedAction: types.IncomeActionTypes = {
      id: "id1",
      type: types.DELETE_INCOME_FINISHED,
    };

    expect(actions.deleteIncomeFinished(income.id)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when addIncome called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.ADD_INCOME,
    };

    expect(actions.addIncome(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when addIncomeFinished called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.ADD_INCOME_FINISHED,
    };

    expect(actions.addIncomeFinished(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when editIncome called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.EDIT_INCOME,
    };

    expect(actions.editIncome(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when editIncomeFinished called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.EDIT_INCOME_FINISHED,
    };

    expect(actions.editIncomeFinished(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when setIncomeFormValues called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.SET_INCOME_FORM,
    };

    expect(actions.setIncomeFormValues(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when setIncomeFormValuesFinished called", () => {
    const income: Income = {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    };
    const expectedAction: types.IncomeActionTypes = {
      payload: income,
      type: types.SET_INCOME_FORM_FINISHED,
    };

    expect(actions.setIncomeFormValuesFinished(income)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when setPromptVisibility called", () => {
    const isVisible = true;
    const expectedAction: types.IncomeActionTypes = {
      isVisible: true,
      type: types.SET_PROMPT_VISIBILITY,
    };

    expect(actions.setPromptVisibility(isVisible)).toEqual(expectedAction);
  });

  it("should return IncomeActionType when setPromptVisibilityFinished called", () => {
    const isVisible = true;
    const expectedAction: types.IncomeActionTypes = {
      isVisible: true,
      type: types.SET_PROMPT_VISIBILITY_FINISHED,
    };

    expect(actions.setPromptVisibilityFinished(isVisible)).toEqual(
      expectedAction
    );
  });
});
