import IncomeComponent from "../components/spreadsheet-generation/Income/IncomeComponent";
import CategoryComponent from "../components/spreadsheet-generation/Category/CategoryComponent";
import SubcategoryComponent from "../components/spreadsheet-generation/Subcategory/SubcategoryComponent";
import SpendingPredictionComponent from "../components/spreadsheet-generation/SpendingPrediction/SpendingPredictionComponent";
import LocaleSelectorComponent from "../components/spreadsheet-generation/LocaleSelector/LocaleSelectorComponent";
import MonthSelectorComponent from "../components/spreadsheet-generation/MonthSelector/MonthSelectorComponent";
import SaveComponent from "../components/spreadsheet-generation/Save/SaveComponent";

const GeneratorPage: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h2 className="mt-2">Word of introduction</h2>
          <p>
            This tool <strong>allows You to create a custom home budget</strong>{" "}
            that uses Google Sheets.{" "}
            <strong>It requires that You have a Google Account</strong> and that
            You allow it to access Google Drive. Don&apos;t worry it is only
            able to create files and modify/delete files that it created. It
            doesn’t have access to all Your data. <strong>Rows</strong> for
            incomes, categories and subcategories{" "}
            <strong>can be rearranged</strong> with drag and drop.
          </p>
        </div>
      </div>
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
