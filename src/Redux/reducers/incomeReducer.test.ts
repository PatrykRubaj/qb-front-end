import incomeReducer from "./incomeReducer";
import {
  IncomeSection,
  EntityStatus,
  Income,
} from "../../SpreadsheetGeneration/state";
import actions from "../actions/incomeActions";

describe("Income reducer", () => {
  const initialIncomeSectionState: IncomeSection = {
    formValues: {
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    },
    incomes: [],
    onlyOneEditAllowedPrompt: false,
  };
  it("Should return add income", () => {
    const income: Income = {
      id: "id2",
      name: "Work 2",
      status: EntityStatus.New,
      amount: 1000,
    };

    const state = incomeReducer(
      initialIncomeSectionState,
      actions.addIncomeFinished(income)
    );

    expect(state).toEqual({
      ...initialIncomeSectionState,
      incomes: [
        ...initialIncomeSectionState.incomes,
        { ...income, status: EntityStatus.Saved },
      ],
    });
  });

  it("Should return delete income", () => {
    const state = incomeReducer(
      initialIncomeSectionState,
      actions.deleteIncomeFinished("id1")
    );

    expect(state.incomes).toHaveLength(0);
    expect(state).toEqual({
      ...initialIncomeSectionState,
      incomes: [],
    });
  });

  it("Should return edited income in the same place", () => {
    const initIncome: IncomeSection = {
      formValues: {
        id: "id1",
        amount: 100,
        name: "Work",
        status: EntityStatus.New,
      },
      incomes: [
        {
          id: "id1",
          name: "Lidl",
          status: EntityStatus.Saved,
          amount: 1000,
        },
        {
          id: "id2",
          name: "Starbucks",
          status: EntityStatus.Editing,
          amount: 450,
        },
        {
          id: "id3",
          name: "Side project",
          status: EntityStatus.Saved,
          amount: 100,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };
    const editedIncome: Income = {
      id: "id2",
      name: "Starbucks",
      status: EntityStatus.Saved,
      amount: 500,
    };

    const state = incomeReducer(
      initIncome,
      actions.editIncomeFinished(editedIncome)
    );

    expect(state).toEqual({
      ...initialIncomeSectionState,
      incomes: [
        {
          id: "id1",
          name: "Lidl",
          status: EntityStatus.Saved,
          amount: 1000,
        },
        {
          id: "id2",
          name: "Starbucks",
          status: EntityStatus.Saved,
          amount: 500,
        },
        {
          id: "id3",
          name: "Side project",
          status: EntityStatus.Saved,
          amount: 100,
        },
      ],
    });
  });

  it("Should return display prompt", () => {
    const isPromptVisible = true;

    const state = incomeReducer(
      initialIncomeSectionState,
      actions.setPromptVisibilityFinished(isPromptVisible)
    );

    expect(state).toEqual({
      ...initialIncomeSectionState,
      onlyOneEditAllowedPrompt: true,
    });
  });

  it("Should return new form values", () => {
    const newFormValues: Income = {
      id: "id3",
      name: "Side project",
      status: EntityStatus.Saved,
      amount: 100,
    };
    expect(initialIncomeSectionState.formValues).toEqual({
      id: "id1",
      amount: 100,
      name: "Work",
      status: EntityStatus.New,
    });

    const state = incomeReducer(
      initialIncomeSectionState,
      actions.setIncomeFormValuesFinished(newFormValues)
    );

    expect(state).toEqual({
      ...initialIncomeSectionState,
      formValues: newFormValues,
    });
  });
});
