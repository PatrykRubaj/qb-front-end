import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Dispatch } from "redux";
import { MonthActionTypes } from "../../redux/types/monthTypes";
import monthActions from "../../redux/actions/monthActions";
import classNames from "classnames";

interface StateProps {
  month: number;
}

interface DispatchProps {
  setMonth: (month: number) => MonthActionTypes;
}

type Props = StateProps & DispatchProps;

const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

const MonthSelector: React.FC<Props> = (props: Props) => {
  return (
    <div className="row">
      <div className="col">
        <h2>Select month</h2>
        <div className="row">
          {months.map(month => {
            if (month.number > 6) return null;
            const classes = classNames("btn mr-1 mb-1", {
              "btn-dark": props.month !== month.number,
              "btn-primary": props.month === month.number,
            });
            return (
              <button
                key={month.number}
                type="button"
                className={classes}
                style={{ width: "10%" }}
                onClick={(): MonthActionTypes => props.setMonth(month.number)}
              >
                {month.name}
              </button>
            );
          })}
        </div>
        <div className="row">
          {months.map(month => {
            if (month.number <= 6) return null;
            const classes = classNames("btn mr-1 mb-1", {
              "btn-dark": props.month !== month.number,
              "btn-primary": props.month === month.number,
            });
            return (
              <button
                key={month.number}
                type="button"
                className={classes}
                style={{ width: "10%" }}
                onClick={(): MonthActionTypes => props.setMonth(month.number)}
              >
                {month.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    month: state.month,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setMonth: (month: number): MonthActionTypes =>
      dispatch(monthActions.setMonth(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);