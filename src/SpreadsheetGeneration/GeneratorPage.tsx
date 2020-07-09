import React from "react";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";
import LocaleSelectorComponent from "./LocaleSelector/LocaleSelectorComponent";
import MonthSelectorComponent from "./MonthSelector/MonthSelectorComponent";
import SaveComponent from "./Save/SaveComponent";

const GeneratorPage: React.FC = () => {
  return (
    <>
      <LocaleSelectorComponent />
      <MonthSelectorComponent />
      <IncomeComponent />
      <CategoryComponent />
      <SubcategoryComponent />
      <SpendingPredictionComponent />
      <SaveComponent />
    </>
  );
};

export default GeneratorPage;
