import Link from "next/link";
import * as React from "react";
// import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// import { User } from "../SpreadsheetGeneration/state";
// import { RootState } from "../redux/reducers";

// interface StateProps {
//   user: User;
// }

// type Props = StateProps;

const navigationBar = () => (
  <nav
    className="navbar navbar-expand-sm navbar-dark justify-content-between"
    style={{ backgroundColor: "#5b7191" }}
  >
    <Link href="/">
      <a className="navbar-brand">
        <img
          src="/images/logo.png"
          height="30"
          alt="Quantum Budget"
          style={{ margin: "15px 7px 15px 15px" }}
          className="d-inline-block align-middle"
        />
        <span
          style={{
            fontFamily: "Silka Bold",
            margin: "15px 7px 15px 0",
          }}
          className="align-middle d-none d-sm-inline-block"
        >
          Quantum
        </span>
        <span
          style={{
            fontFamily: "Silka Medium",
            margin: "15px 15px 15px 0",
          }}
          className="d-none d-sm-inline-block align-middle"
        >
          Budget
        </span>
      </a>
    </Link>
    <div className="">
      <ul className="navbar-nav d-inline-block mr-2">
        <li className="nav-item">
          <Link href="/generator">
            <a className="nav-link">Generator</a>
          </Link>
        </li>
      </ul>
      {/* {props.user.givenName.length > 0 ? (
        <span className="navbar-text">Hi {props.user.givenName}</span>
      ) : null} */}
    </div>
  </nav>
);

export default navigationBar;

// const mapStateToProps = (state: RootState): StateProps => {
//   return {
//     user: state.userSection.user,
//   };
// };

// export default connect(mapStateToProps)(navigationBar);
