import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../SpreadsheetGeneration/state";
import { RootState } from "../redux/reducers";

interface StateProps {
  user: User;
}

type Props = StateProps;

const NavigationBar: React.FC<Props> = (props: Props) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <NavLink to="/" className="navbar-brand">
      Quantum Budget
    </NavLink>
    <div className="">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/generator" className="nav-link">
            Generator
          </NavLink>
        </li>
        {props.user.givenName.length > 0 ? (
          <li className="nav-item">Hi {props.user.givenName}</li>
        ) : null}
      </ul>
    </div>
  </nav>
);

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.userSection.user,
  };
};

export default connect(mapStateToProps)(NavigationBar);
