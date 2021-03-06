import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Income, EntityStatus, Country } from '../../redux/state';
import WarningDialog from '../../components/common/WarningDialog';
import IncomeForm from './incomeForm.component';
import IncomeRowComponent from './incomeRow.component';
import { RootState } from '../../redux/reducers';
import {
  addIncome,
  editIncome,
  deleteIncome,
  setIncomeForm,
  setIncomePromptVisibility,
  moveIncome,
} from './slice';

interface StateProps {
  incomes: Array<Income>;
  formValues: Income;
  onlyOneEditAllowedPrompt: boolean;
  locale: Country | null;
}

interface DispatchProps {
  deleteIncome: (id: string) => void;
  addIncome: (income: Income) => void;
  editIncome: (income: Income) => void;
  setIncomeFormValues: (income: Income) => void;
  setPromptVisibility: (isVisible: boolean) => void;
  moveElement: (startIndex: number, endIndex: number, id: string) => void;
}

type Props = StateProps & DispatchProps;

export const IncomeComponent = ({
  incomes,
  formValues,
  addIncome,
  editIncome,
  deleteIncome,
  locale,
  setIncomeFormValues,
  setPromptVisibility,
  onlyOneEditAllowedPrompt,
  moveElement,
}: Props) => {
  const nameInput = React.createRef<HTMLInputElement>();

  const getCurrencyFromCommaString = (
    currenciesString: string | null | undefined
  ): string => {
    if (currenciesString === undefined || currenciesString === null) {
      return 'USD';
    }

    const indexOfComma = currenciesString.indexOf(',') || 0;
    if (indexOfComma > 0) {
      return currenciesString.slice(0, indexOfComma) || 'USD';
    }

    return currenciesString || 'USD';
  };

  const formatter: Intl.NumberFormat = new Intl.NumberFormat(
    locale?.key || 'en-US',
    {
      style: 'currency',
      currency: getCurrencyFromCommaString(locale?.currency),
    }
  );

  const onAddSaveNewIncome = (income: Income): void => {
    nameInput.current?.focus();

    const incomeToSave: Income = { ...income, status: EntityStatus.Saved };
    if (income.status === EntityStatus.Editing) {
      editIncome(incomeToSave);
    } else {
      addIncome(incomeToSave);
    }

    setIncomeFormValues({
      id: uuidv4(),
      name: '',
      amount: undefined,
      status: EntityStatus.New,
    });
  };

  const onDeleteIncome = (
    e: React.MouseEvent<HTMLButtonElement>,
    income: Income
  ): void => {
    deleteIncome(income.id);
  };

  const onEditIncome = (
    e: React.MouseEvent<HTMLButtonElement>,
    income: Income
  ): void => {
    e.preventDefault();
    income = { ...income, status: EntityStatus.Editing };
    if (formValues.status !== EntityStatus.Editing) {
      nameInput.current?.focus();

      setIncomeFormValues({ ...income });
    } else {
      setPromptVisibility(true);
    }
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveElement(source.index, destination.index, draggableId);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mt-2">Income sources</h2>
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
              <th style={{ width: '60%' }}>Source</th>
              <th className="text-center" style={{ width: '30%' }}>
                Amount
              </th>
              <th className="text-center" style={{ width: '10%' }}>
                Actions
              </th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-incomes">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {incomes.length > 0 ? (
                    incomes.map((income, index) => (
                      <IncomeRowComponent
                        key={income.id}
                        income={income}
                        onEditIncome={onEditIncome}
                        onDeleteIncome={onDeleteIncome}
                        formatter={formatter}
                        index={index}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <div
                          className="alert alert-danger align-middle"
                          role="alert"
                        >
                          At least one income is required
                        </div>
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: RootState): StateProps => ({
  incomes: state.incomeSection.incomes,
  formValues: state.incomeSection.formValues,
  onlyOneEditAllowedPrompt: state.incomeSection.onlyOneEditAllowedPrompt,
  locale: state.country,
});

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteIncome: (id: string) => dispatch(deleteIncome(id)),
    addIncome: (income: Income) => dispatch(addIncome(income)),
    editIncome: (income: Income) => dispatch(editIncome(income)),
    setIncomeFormValues: (income: Income) => dispatch(setIncomeForm(income)),
    setPromptVisibility: (isVisible: boolean) =>
      dispatch(setIncomePromptVisibility(isVisible)),
    moveElement: (startIndex: number, endIndex: number, id: string) =>
      dispatch(moveIncome({ startIndex, endIndex })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeComponent);
