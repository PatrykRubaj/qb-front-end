import React, { useState } from "react";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";
import {
  GeneratorState,
  Income,
  Category,
  Subcategory,
  EntityStatus
} from "./state";
import LocaleSelectorComponent from "./LocaleSelector/LocaleSelectorComponent";
import { Country } from "../SpreadsheetGeneration/LocaleSelector/Country";

const GeneratorPage: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    categories: [],
    subcategories: [],
    incomes: [],
    locale: null
  });

  const addIncome = (newIncome: Income): void => {
    setState({
      ...state,
      incomes: [...state.incomes, newIncome]
    });
    console.log("Added income: ", newIncome);
  };

  const setIncomes = (incomes: Income[]): void => {
    setState({
      ...state,
      incomes
    });
  };

  const deleteIncome = (income: Income): void => {
    setState({
      ...state,
      incomes: state.incomes.filter(x => x.id !== income.id)
    });
    console.log("Deleted income: ", income);
  };

  const editIncome = (income: Income): void => {
    const newIncomes = state.incomes.map((stateIncome: Income) => {
      if (stateIncome.id !== income.id) {
        return stateIncome;
      }

      return income;
    });
    setState({
      ...state,
      incomes: [...newIncomes]
    });
    console.log("Edited income: ", income);
  };

  const addCategory = (newCategory: Category): void => {
    setState({
      ...state,
      categories: [...state.categories, newCategory]
    });
    console.log("Added category: ", newCategory);
  };

  const editCategory = (editedCategory: Category): void => {
    const newCategories = state.categories.map((stateCategory: Category) => {
      if (stateCategory.id !== editedCategory.id) {
        return stateCategory;
      }

      return editedCategory;
    });

    setState({
      ...state,
      categories: [...newCategories]
    });
    console.log("Edited category: ", editedCategory);
  };

  const deleteCategory = (category: Category): void => {
    setState({
      ...state,
      subcategories: state.subcategories.filter(
        x => x.categoryId !== category.id
      ),
      categories: state.categories.filter(x => x.id !== category.id)
    });
    console.log("Deleted category: ", category);
  };

  const addSubcategory = (newSubcategory: Subcategory): void => {
    setState({
      ...state,
      subcategories: [...state.subcategories, newSubcategory]
    });
    console.log("Added subcategory: ", newSubcategory);
  };

  const deleteSubcategory = (subcategory: Subcategory): void => {
    setState({
      ...state,
      subcategories: state.subcategories.filter(x => x.id !== subcategory.id)
    });
    console.log("Deleted subcategory: ", subcategory);
  };

  const editSubcategory = (editedSubcategory: Subcategory): void => {
    const newSubcategories = state.subcategories.map(
      (stateSubcategory: Subcategory) => {
        if (stateSubcategory.id !== editedSubcategory.id) {
          return stateSubcategory;
        }

        return editedSubcategory;
      }
    );

    setState({
      ...state,
      subcategories: [...newSubcategories]
    });
    console.log("Edited subcategory: ", editedSubcategory);
  };

  const enterSubcategoryAmount = (
    subcategoryId: string,
    amount: number
  ): void => {
    setState({
      ...state,
      subcategories: state.subcategories.map(sub => {
        if (sub.id !== subcategoryId) {
          return sub;
        }

        return {
          ...sub,
          amount: amount
        };
      })
    });
  };

  const setLocale = (country: Country): void => {
    console.log("Locale set as", country);
    setState({
      ...state,
      locale: country
    });
  };

  return (
    <>
      <LocaleSelectorComponent setLocale={setLocale} />
      <IncomeComponent
        // incomes={state.incomes}
        setIncomes={setIncomes}
        addIncome={addIncome}
        editIncome={editIncome}
        deleteIncome={deleteIncome}
        locale={state.locale}
      />
      <CategoryComponent
        // categories={state.categories}
        addCategory={addCategory}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
      <SubcategoryComponent
        // categories={state.categories}
        // subcategories={state.subcategories}
        addSubcategory={addSubcategory}
        editSubcategory={editSubcategory}
        deleteSubcategory={deleteSubcategory}
      />
      <SpendingPredictionComponent
        // categories={state.categories}
        // subcategories={state.subcategories}
        enterSubcategoryAmount={enterSubcategoryAmount}
      />
      <button className="btn btn-primary btn-lg btn-block mb-4">
        Generate budget
      </button>
    </>
  );
};

export default GeneratorPage;
