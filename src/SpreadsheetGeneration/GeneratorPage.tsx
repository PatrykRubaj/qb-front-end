import React from "react";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";

const GeneratorPage: React.FC = () => {
  return (
    <>
      <IncomeComponent />
      <CategoryComponent />
      <SubcategoryComponent />
      <SpendingPredictionComponent />
      <button className="btn btn-primary btn-lg btn-block">
        Generate budget
      </button>
    </>
  );
};

export default GeneratorPage;
