import React from 'react';
import { Income, EntityStatus } from '../../redux/state';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  income: Income;
  onEditIncome: Function;
  onDeleteIncome: Function;
  formatter: Intl.NumberFormat;
  index: number;
}

const IncomeRowComponent = (props: Props) => {
  return (
    <Draggable draggableId={props.income.id} index={props.index}>
      {(provided) => (
        <tr
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // eslint-disable-next-line @typescript-eslint/unbound-method
          ref={provided.innerRef}
        >
          <td className="align-middle" style={{ width: '60%' }}>
            {props.income.name}
          </td>
          <td className="align-middle text-center" style={{ width: '30%' }}>
            {props.formatter.format(props.income?.amount || 0)}
          </td>
          <td className="align-middle text-center" style={{ width: '10%' }}>
            <div className="btn-group" role="group">
              <button
                disabled={props.income.status === EntityStatus.Editing}
                type="button"
                className="btn btn-secondary"
                onClick={(e) => props.onEditIncome(e, props.income)}
              >
                <EditIcon />
              </button>
              <ConfirmationDialog
                title="Delete income?"
                description="Do You want to delete income?"
              >
                {(confirm) => {
                  return (
                    <button
                      disabled={props.income.status === EntityStatus.Editing}
                      type="button"
                      className="btn btn-secondary"
                      onClick={confirm(props.onDeleteIncome, props.income)}
                    >
                      <DeleteIcon />
                    </button>
                  );
                }}
              </ConfirmationDialog>
            </div>
          </td>
        </tr>
      )}
    </Draggable>
  );
};

export default IncomeRowComponent;
