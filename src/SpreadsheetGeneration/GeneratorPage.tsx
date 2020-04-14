import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";

import { GeneratorState, Income, Category, Subcategory } from "./state";

const GeneratorPage: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    categories: [
      { id: uuidv4(), name: "Food" },
      { id: uuidv4(), name: "Utilities" }
    ],
    subcategories: [],
    incomes: [
      { id: uuidv4(), amount: 1500, name: "Starbucks" },
      { id: uuidv4(), amount: 500, name: "McDonald's" }
    ],
    expectedSpendings: []
  });

  const addIncome = (newIncome: Income): void => {
    setState({
      ...state,
      incomes: [...state.incomes, newIncome]
    });
    console.log("Added income: ", newIncome);
  };

  const deleteIncome = (income: Income): void => {
    setState({
      ...state,
      incomes: state.incomes.filter(x => x.id !== income.id)
    });
    console.log("Deleted income: ", income);
  };

  const editIncome = (income: Income): void => {
    setState({
      ...state,
      incomes: [...state.incomes.filter(x => x.id !== income.id), income]
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
    setState({
      ...state,
      categories: [...state.categories, editedCategory]
    });
    console.log("Edited category: ", editedCategory);
  };

  const deleteCategory = (category: Category): void => {
    setState({
      ...state,
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
    setState({
      ...state,
      subcategories: [...state.subcategories, editedSubcategory]
    });
    console.log("Edited subcategory: ", editedSubcategory);
  };

  return (
    <>
      <IncomeComponent
        incomes={state.incomes}
        addIncome={addIncome}
        editIncome={editIncome}
        deleteIncome={deleteIncome}
      />
      <CategoryComponent
        categories={state.categories}
        addCategory={addCategory}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
      <SubcategoryComponent
        categories={state.categories}
        subcategories={state.subcategories}
        addSubcategory={addSubcategory}
        editSubcategory={editSubcategory}
        deleteSubcategory={deleteSubcategory}
      />
      <SpendingPredictionComponent
        categories={state.categories}
        subcategories={state.subcategories}
      />
      <button className="btn btn-primary btn-lg btn-block mb-4">
        Generate budget
      </button>
    </>
  );
};

export default GeneratorPage;
