import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux/reducers';
import { setMonth } from './slice';

interface StateProps {
  month: number;
}

interface DispatchProps {
  setMonth: (month: number) => void;
}

type Props = StateProps & DispatchProps;

const months = [
  { name: 'January', number: 1 },
  { name: 'February', number: 2 },
  { name: 'March', number: 3 },
  { name: 'April', number: 4 },
  { name: 'May', number: 5 },
  { name: 'June', number: 6 },
  { name: 'July', number: 7 },
  { name: 'August', number: 8 },
  { name: 'September', number: 9 },
  { name: 'October', number: 10 },
  { name: 'November', number: 11 },
  { name: 'December', number: 12 },
];

const MonthSelector = (props: Props) => {
  const { setMonth } = props;
  React.useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setMonth(currentMonth);
  }, [setMonth]);
  return (
    <div className="row">
      <div className="col">
        <h2 className="mt-2">Select month</h2>
        <div className="row">
          {months.map((month) => {
            if (month.number > 6) return null;
            const classes = classNames('btn btn-block mr-1 mb-1', {
              'btn-dark': props.month !== month.number,
              'btn-primary': props.month === month.number,
            });
            return (
              <div className="col-6 col-md-2" key={month.number}>
                <button
                  type="button"
                  className={classes}
                  onClick={() => setMonth(month.number)}
                >
                  {month.name}
                </button>
              </div>
            );
          })}
        </div>
        <div className="row">
          {months.map((month) => {
            if (month.number <= 6) return null;
            const classes = classNames('btn btn-block mr-1 mb-1', {
              'btn-dark': props.month !== month.number,
              'btn-primary': props.month === month.number,
            });
            return (
              <div className="col-6 col-md-2" key={month.number}>
                <button
                  type="button"
                  className={classes}
                  onClick={() => setMonth(month.number)}
                >
                  {month.name}
                </button>
              </div>
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
    setMonth: (month: number) => dispatch(setMonth(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);
