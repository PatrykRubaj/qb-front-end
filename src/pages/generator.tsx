// import IncomeComponent from "../components/spreadsheet-generation/Income/IncomeComponent";
// import CategoryComponent from "../components/spreadsheet-generation/Category/CategoryComponent";
// import SubcategoryComponent from "../components/spreadsheet-generation/Subcategory/SubcategoryComponent";
// import SpendingPredictionComponent from "../components/spreadsheet-generation/SpendingPrediction/SpendingPredictionComponent";
// import LocaleSelectorComponent from "../components/spreadsheet-generation/LocaleSelector/LocaleSelectorComponent";
// import MonthSelectorComponent from "../components/spreadsheet-generation/MonthSelector/MonthSelectorComponent";
// import SaveComponent from "../components/spreadsheet-generation/Save/SaveComponent";
import Head from 'next/head';
import dynamic from 'next/dynamic';
import LoaderWheel from '../components/common/LoaderWheel';
import { RootState } from '../redux/reducers';
import { connect } from 'react-redux';
import ProtectedComponent from '../auth0/ProtectedComponent';
import SignInWithGoogleComponent from '../auth0/SignInWithGoogleComponent';
import Link from 'next/link';
import { Route } from '../redux/state';

const DynamicIncomeComponent = dynamic(
  () => import('../features/manageIncome/income.component'),
  { ssr: false }
);
const DynamicLocaleSelectorComponent = dynamic(
  () =>
    import(
      '../components/spreadsheet-generation/LocaleSelector/LocaleSelectorComponent'
    ),
  { ssr: false }
);
const DynamicCategoryComponent = dynamic(
  () =>
    import('../components/spreadsheet-generation/Category/CategoryComponent'),
  { ssr: false }
);
const DynamicSubcategoryComponent = dynamic(
  () =>
    import(
      '../components/spreadsheet-generation/Subcategory/SubcategoryComponent'
    ),
  { ssr: false }
);
const DynamicSpendingPredictionComponent = dynamic(
  () =>
    import(
      '../components/spreadsheet-generation/SpendingPrediction/SpendingPredictionComponent'
    ),
  { ssr: false }
);

const DynamicMonthSelectorComponent = dynamic(
  () => import('../features/monthSelector/component'),
  { ssr: false }
);

const DynamicSaveComponent = dynamic(
  () => import('../components/spreadsheet-generation/Save/SaveComponent'),
  { ssr: false }
);

interface StateProps {
  isLoading: boolean;
  expiresAt: number;
}

type State = StateProps;

const GeneratorPage: React.FC<State> = (props: State) => {
  return (
    <>
      <Head>
        <title>Home Budget spreadsheet generator - Quantum Budget</title>
      </Head>
      <div className="row">
        <div className="col">
          <h2 className="mt-2">Word of introduction</h2>
          <p>
            This tool <strong>allows You to create a custom home budget</strong>{' '}
            that uses Google Sheets.{' '}
            <strong>It requires that You have a Google Account</strong> and that
            You allow it to access Google Drive. Don&apos;t worry it is only
            able to create files and modify/delete files that it created. It
            doesn’t have access to all Your data. <strong>Rows</strong> for
            incomes, categories and subcategories{' '}
            <strong>can be rearranged</strong> with drag and drop.
          </p>
        </div>
      </div>
      <ProtectedComponent
        expiresAt={props.expiresAt}
        notAuthenticated={
          <div className="row justify-content-center mb-2">
            <div className="col">
              <h2 className="mt-2">Sign in (required)</h2>
              <SignInWithGoogleComponent />
            </div>
          </div>
        }
      >
        <></>
      </ProtectedComponent>
      {props.isLoading ? (
        <LoaderWheel
          title="Loading budget..."
          description="⏳ It can take some time if website wasn't used for a while. "
        />
      ) : (
        <>
          <DynamicLocaleSelectorComponent />
          <DynamicMonthSelectorComponent />
          <DynamicIncomeComponent />
          <DynamicCategoryComponent />
          <DynamicSubcategoryComponent />
          <DynamicSpendingPredictionComponent />
          <DynamicSaveComponent />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isLoading: state.budgetSection.isLoading,
    expiresAt: state.userSection.user?.expiresAt,
  };
};

export default connect(mapStateToProps)(GeneratorPage);
