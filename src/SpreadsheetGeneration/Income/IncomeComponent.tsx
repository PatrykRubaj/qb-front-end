import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Income, EntityStatus } from "../state";
import WarningDialog from "../../Common/WarningDialog";
import { Country } from "../LocaleSelector/Country";
import IncomeForm from "./IncomeForm";
import IncomeRowComponent from "./IncomeRowComponent";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import incomeActions from "../../redux/actions/incomeActions";
import { IncomeActionTypes } from "../../redux/types/incomeTypes";

interface OwnProps {
  locale: Country | null;
}

interface StateProps {
  incomes: Array<Income>;
  formValues: Income;
  onlyOneEditAllowedPrompt: boolean;
}

interface DispatchProps {
  deleteIncome: (income: Income) => void;
  addIncome: (income: Income) => void;
  editIncome: (income: Income) => void;
  setIncomeFormValues: (income: Income) => void;
  setPromptVisibility: (isVisible: boolean) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

export const IncomeComponent: React.FC<Props> = ({
  incomes,
  formValues,
  addIncome,
  editIncome,
  deleteIncome,
  locale,
  setIncomeFormValues,
  setPromptVisibility,
  onlyOneEditAllowedPrompt,
}: Props) => {
  const nameInput = React.createRef<HTMLInputElement>();

  const getCurrency = (currenciesString: string | null | undefined): string => {
    if (currenciesString === undefined || currenciesString === null) {
      return "USD";
    }

    const indexOfComma = currenciesString.indexOf(",") || 0;
    if (indexOfComma > 0) {
      return currenciesString.slice(0, indexOfComma) || "USD";
    }

    return currenciesString || "USD";
  };

  const formatter = new Intl.NumberFormat(locale?.key || "en-US", {
    style: "currency",
    currency: getCurrency(locale?.currency),
  });

  const onAddSaveNewIncome = (income: Income): void => {
    const incomeToSave = { ...income, status: EntityStatus.Saved };
    income.status === EntityStatus.Editing
      ? editIncome(incomeToSave)
      : addIncome(incomeToSave);

    setIncomeFormValues({
      id: uuidv4(),
      name: "",
      amount: undefined,
      status: EntityStatus.New,
    });

    nameInput.current?.focus();
  };

  const onDeleteIncome = (
    e: React.MouseEvent<HTMLButtonElement>,
    income: Income
  ): void => {
    deleteIncome(income);
  };

  const onEditIncome = (
    e: React.MouseEvent<HTMLButtonElement>,
    income: Income
  ): void => {
    e.preventDefault();
    income = { ...income, status: EntityStatus.Editing };
    if (formValues.status !== EntityStatus.Editing) {
      setIncomeFormValues({ ...income });
      editIncome(income);
      nameInput.current?.focus();
    } else {
      setPromptVisibility(true);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Income sources</h2>
        <WarningDialog
          title="Finish editing entry"
          description="You can't edit entry when another is already edited"
          show={onlyOneEditAllowedPrompt}
          onExit={(): void => setPromptVisibility(false)}
        />
        <IncomeForm
          initialValues={formValues}
          addSaveNewIncome={onAddSaveNewIncome}
          incomeNameInputRef={nameInput}
          incomes={incomes}
        />
        <table className="table table-borderless table-sm mt-2 table-striped">
          <thead className="thead-light">
            <tr>
              <th>Source</th>
              <th className="text-center">Amount</th>
              <th className="text-center" style={{ width: "10%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incomes.length > 0 ? (
              incomes.map(income => (
                <IncomeRowComponent
                  key={income.id}
                  income={income}
                  onEditIncome={onEditIncome}
                  onDeleteIncome={onDeleteIncome}
                  formatter={formatter}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <div className="alert alert-danger align-middle" role="alert">
                    At least one income is required
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: RootState): StateProps => ({
  incomes: state.incomeSection.incomes,
  formValues: state.incomeSection.formValues,
  onlyOneEditAllowedPrompt: state.incomeSection.onlyOneEditAllowedPrompt,
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteIncome: (income: Income): IncomeActionTypes =>
      dispatch(incomeActions.deleteIncome(income)),
    addIncome: (income: Income): IncomeActionTypes =>
      dispatch(incomeActions.addIncome(income)),
    editIncome: (income: Income): IncomeActionTypes =>
      dispatch(incomeActions.editIncome(income)),
    setIncomeFormValues: (income: Income): IncomeActionTypes =>
      dispatch(incomeActions.setIncomeFormValues(income)),
    setPromptVisibility: (isVisible: boolean): IncomeActionTypes =>
      dispatch(incomeActions.setPromptVisibility(isVisible)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeComponent);
