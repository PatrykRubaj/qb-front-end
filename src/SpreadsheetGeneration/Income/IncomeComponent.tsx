import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Income } from "../state";
import WarningDialog from "../../Common/WarningDialog";
import ConfirmationDialog from "../../Common/ConfirmationDialog";
import { Country } from "../LocaleSelector/Country";

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

  const formatter = new Intl.NumberFormat(locale?.key || "en-US", {
    style: "currency",
    currency: locale?.currency || "USD"
  });

  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setNewIncome({
      ...newIncome,
      [name]: value
    });
  };

  const onAddSaveNewIncome = (
    e: React.FormEvent<HTMLFormElement>,
    income: Income
  ): void => {
    e.preventDefault();

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
    // e.preventDefault();

    deleteIncome(income);
  };

  const onEditIncome = (
    e: React.MouseEvent<HTMLButtonElement>,
    income: Income
  ): void => {
    e.preventDefault();

    if (editMode === false) {
      deleteIncome(income);
      setNewIncome({ ...income });
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
        <form onSubmit={(e): void => onAddSaveNewIncome(e, newIncome)}>
          <div className="form-row">
            <div className="col">
              <input
                name="name"
                value={newIncome.name || ""}
                onChange={onInputChange}
                ref={nameInput}
                type="text"
                className="form-control"
                placeholder="Source"
                autoFocus
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Amount"
                name="amount"
                value={newIncome.amount || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                {editMode ? "Save" : "+ Add"}
              </button>
            </div>
          </div>
        </form>

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
