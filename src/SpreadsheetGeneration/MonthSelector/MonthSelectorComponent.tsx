import * as React from "react";

export interface IMonthSelectorProps {}

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

export default function MonthSelector(props: IMonthSelectorProps) {
  return (
    <div className="row">
      <div className="col">
        <h2>Select month</h2>
        <div className="row">
          {months.map((month, index) => {
            if (month.number > 6) return null;
            return (
              <button
                key={month.number}
                type="button"
                className="btn btn-dark mr-1 mb-1"
                style={{ width: "16%" }}
              >
                {month.name}
              </button>
            );
          })}
        </div>
        <div className="row">
          {months.map((month, index) => {
            if (month.number <= 6) return null;
            return (
              <button
                key={month.number}
                type="button"
                className="btn btn-dark mr-1 mb-1"
                style={{ width: "16%" }}
              >
                {month.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
