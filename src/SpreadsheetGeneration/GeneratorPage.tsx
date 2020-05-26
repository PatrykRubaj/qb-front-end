import React from "react";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";
import LocaleSelectorComponent from "./LocaleSelector/LocaleSelectorComponent";

const GeneratorPage: React.FC = () => {
  return (
    <>
      <LocaleSelectorComponent />
      <IncomeComponent />
      <CategoryComponent />
      <SubcategoryComponent />
      <SpendingPredictionComponent />
      <button className="btn btn-primary btn-lg btn-block mb-4">
        Generate budget
      </button>
    </>
  );
};

export default GeneratorPage;
