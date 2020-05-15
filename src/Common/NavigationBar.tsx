import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../Redux/reducers";

const NavigationBar: React.FC<RootState> = ({ incomes }: RootState) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <NavLink to="/" className="navbar-brand">
      Quantum Budget - {incomes[0].name}
    </NavLink>
    <div className="">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/generator" className="nav-link">
            Generator
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = (state: RootState) => {
  return { ...state };
};

export default connect(mapStateToProps)(NavigationBar);
