import React from "react";
import { Income, EntityStatus } from "../state";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationDialog from "../../Common/ConfirmationDialog";

interface Props {
  income: Income;
  onEditIncome: Function;
  onDeleteIncome: Function;
  formatter: Intl.NumberFormat;
}

const IncomeRowComponent: React.FC<Props> = (props: Props) => {
  return (
    <tr>
      <td className="align-middle">{props.income.name}</td>
      <td className="align-middle text-center">
        {props.formatter.format(props.income?.amount || 0)}
      </td>
      <td className="align-middle text-center">
        <div className="btn-group" role="group">
          <button
            disabled={props.income.status === EntityStatus.Editing}
            type="button"
            className="btn btn-secondary"
            onClick={(e): void => props.onEditIncome(e, props.income)}
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
  );
};

export default IncomeRowComponent;
