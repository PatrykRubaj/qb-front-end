import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => (
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
        <li className="nav-item">
          <NavLink to="/countries" className="nav-link">
            Countries
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavigationBar;
