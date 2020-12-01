import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { Route } from "../../redux/state";
// import { NavLink } from "react-router-dom";
import { User } from "../../redux/state";
import { RootState } from "../../redux/reducers";
import ProtectedComponent from "../../auth0/ProtectedComponent";

interface StateProps {
  user: User;
}

type Props = StateProps;

const navigationBar: React.FC<Props> = ({ user }: Props) => (
  <nav
    className="navbar navbar-expand navbar-dark justify-content-between"
    style={{ backgroundColor: "#5b7191" }}
  >
    <Link href={Route.HomePage}>
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
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href={Route.Generator}>
            <a className="nav-link">Generator</a>
          </Link>
        </li>
        <ProtectedComponent
          expiresAt={user.expiresAt}
          notAuthenticated={
            <li className="nav-item">
              <Link href={Route.Login}>
                <a className="nav-link">Login</a>
              </Link>
            </li>
          }
        />
      </ul>
      {/* {props.user.givenName.length > 0 ? (
        <span className="navbar-text">Hi {props.user.givenName}</span>
      ) : null} */}
    </div>
  </nav>
);

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.userSection.user,
  };
};

export default connect(mapStateToProps)(navigationBar);
