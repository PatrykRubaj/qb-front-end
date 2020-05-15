import React, { useState } from "react";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { v4 as uuidv4 } from "uuid";
import { Income, EntityStatus } from "../state";
import WarningDialog from "../../Common/WarningDialog";
import { Country } from "../LocaleSelector/Country";
import IncomeForm from "./IncomeForm";
import IncomeRowComponent from "./IncomeRowComponent";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

interface Props {
  incomes: Array<Income>;
  setIncomes: Function;
  addIncome: Function;
  editIncome: Function;
  deleteIncome: Function;
  locale: Country | null;
}

interface SortableItemValue {
  income: Income;
  onEditIncome: Function;
  onDeleteIncome: Function;
  formatter: Intl.NumberFormat;
}
const DragHandle = SortableHandle(() => (
  <div className="btn btn-secondary">
    <DragHandleIcon fontSize="small" />
  </div>
));

const SortableItem = SortableElement(
  ({ value }: { value: SortableItemValue }) => (
    <>
      <IncomeRowComponent
        income={value.income}
        onEditIncome={value.onEditIncome}
        onDeleteIncome={value.onDeleteIncome}
        formatter={value.formatter}
        dragHandle={<DragHandle />}
      />
    </>
  )
);

interface SortableListProps {
  items: Income[];
}

const SortableList = SortableContainer(
  ({ items }: { items: SortableItemValue[] }) => {
    return (
      <tbody>
        {items.map((value, index) => (
          <SortableItem key={value.income.id} index={index} value={value} />
        ))}
      </tbody>
    );
  }
);

const IncomeComponent: React.FC<Props> = ({
  incomes,
  setIncomes,
  addIncome,
  editIncome,
  deleteIncome,
  locale
}: Props) => {
  const [newIncome, setNewIncome] = useState<Income>({
    id: uuidv4(),
    name: "",
    amount: undefined,
    status: EntityStatus.New
  });

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

  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }): void => {
    setIncomes(arrayMove(incomes, oldIndex, newIndex));
  };

  const onAddSaveNewIncome = (income: Income): void => {
    // e.preventDefault();
    const incomeToSave = { ...income, status: EntityStatus.Saved };
    income.status === EntityStatus.Editing
      ? editIncome(incomeToSave)
      : addIncome(incomeToSave);

    setNewIncome({
      id: uuidv4(),
      name: "",
      amount: undefined,
      status: EntityStatus.New
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
    if (newIncome.status !== EntityStatus.Editing) {
      setNewIncome({ ...income });
      editIncome(income);
      nameInput.current?.focus();
    } else {
      setShowWarning(true);
    }
  };

  const sortableItems: SortableItemValue[] = incomes.map(inc => {
    return {
      income: inc,
      onEditIncome: onEditIncome,
      onDeleteIncome: onDeleteIncome,
      formatter: formatter
    };
  });

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
          <SortableList
            items={sortableItems}
            onSortEnd={onSortEnd}
            lockAxis="y"
            useDragHandle={true}
            lockToContainerEdges={true}
            helperClass="w-100"
          />
          {/* {incomes.map((income) => (
              <IncomeRowComponent
                key={income.id}
                income={income}
                onEditIncome={onEditIncome}
                onDeleteIncome={onDeleteIncome}
                formatter={formatter}
              />
            ))} */}
        </table>
      </div>
    </div>
  );
};

export default IncomeComponent;
