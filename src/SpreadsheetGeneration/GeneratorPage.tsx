import React, { useState } from "react";
import IncomeComponent from "./Income/IncomeComponent";
import CategoryComponent from "./Category/CategoryComponent";
import SubcategoryComponent from "./Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "./SpendingPrediction/SpendingPredictionComponent";
import { GeneratorState } from "./state";
import LocaleSelectorComponent from "./LocaleSelector/LocaleSelectorComponent";
import { Country } from "../SpreadsheetGeneration/LocaleSelector/Country";

const GeneratorPage: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    categories: [],
    subcategories: [],
    incomes: [],
    locale: null,
  });

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
          amount: amount,
        };
      }),
    });
  };

  const setLocale = (country: Country): void => {
    console.log("Locale set as", country);
    setState({
      ...state,
      locale: country,
    });
  };

  return (
    <>
      <LocaleSelectorComponent setLocale={setLocale} />
      <IncomeComponent locale={state.locale} />
      <CategoryComponent />
      <SubcategoryComponent />
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
