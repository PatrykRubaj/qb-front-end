import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Income } from "../state";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import { Country } from "../LocaleSelector/Country";
import IncomeForm from "./IncomeForm";

interface Props {
  incomes: Array<Income>;
  addIncome: Function;
  editIncome: Function;
  deleteIncome: Function;
  locale: Country | null;
}

const IncomeComponent: React.FC<Props> = ({
  incomes,
  addIncome,
  editIncome,
  deleteIncome,
  locale
}: Props) => {
  const [newIncome, setNewIncome] = useState<Income>({
    id: uuidv4(),
    name: "",
    amount: undefined
  });

  const [editMode, setEditMode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
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
    currency: getCurrency(locale?.currency)
  });

  const onAddSaveNewIncome = (income: Income): void => {
    // e.preventDefault();

    editMode ? editIncome(income) : addIncome(income);

    setNewIncome({
      id: uuidv4(),
      name: "",
      amount: undefined
    });
    setEditMode(false);
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

    if (editMode === false) {
      setNewIncome({ ...income });
      deleteIncome(income);
      setEditMode(true);
      nameInput.current?.focus();
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Income sources</h2>
        <WarningDialog
          title="Finish editing entry"
          description="You can't edit entry when another is already edited"
          show={showWarning}
          onExit={(): void => setShowWarning(false)}
        />
        <IncomeForm
          editMode={editMode}
          newIncome={newIncome}
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
            {incomes.map(income => (
              <tr key={income.id}>
                <td className="align-middle">{income.name}</td>
                <td className="align-middle text-center">
                  {formatter.format(income?.amount || 0)}
                </td>
                <td className="align-middle text-center">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e): void => onEditIncome(e, income)}
                    >
                      <EditIcon />
                    </button>
                    <ConfirmationDialog
                      title="Delete income?"
                      description="Do You want to delete income?"
                    >
                      {confirm => {
                        return (
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={confirm(onDeleteIncome, income)}
                          >
                            <DeleteIcon />
                          </button>
                        );
                      }}
                    </ConfirmationDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeComponent;
