import * as React from "react";

export interface IDevDemoProps {}

export default function DevDemo(props: IDevDemoProps) {
  return (
    <div className="row pt-2 pb-2 p-2">
      <div className="col-sm-4 border rounded pb-2 pt-2 mb-3">
        <h3 className="pt-2">Basic</h3>
        <p>Great to start your jurney with personal finances.</p>
        <div className="text-center">
          <span
            className="d-inline-block font-weight-bold mr-4 mt-auto align-middle"
            style={{ fontSize: "2em" }}
          >
            $9.99
          </span>
          <span className="d-inline-block align-middle">
            per month <br />( VAT incl. )
          </span>
        </div>
        <hr className="my-3" />
        <ul className="list-unstyled">
          <li>✔ Ability to generate Google Spreadsheet</li>
        </ul>
      </div>
      <div className="col-sm-4">
        <h3>Premium</h3>
      </div>
      <div className="col-sm-4">
        <h3>Pro</h3>
      </div>
    </div>
  );
}
