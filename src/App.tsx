<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React from "react";
>>>>>>> 400ebf0... added authentication with Google
import { Route, Switch } from "react-router-dom";
import HomePageComponent from "./HomePage/HomePage";
import GeneratorPage from "./SpreadsheetGeneration/GeneratorPage";
import NavigationBar from "./Common/NavigationBar";
import Login from "./auth0/Components/Login";
import Callback from "./auth0/Components/Callback";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppActionTypes } from "./redux/types/appTypes";
import appActions from "./redux/actions/appActions";

interface DispatchProps {
  loadState: () => AppActionTypes;
}

type Props = DispatchProps;

const App: React.FC<Props> = ({ loadState }: Props) => {
  const history = useHistory();
  useEffect(() => {
    loadState();
  }, [loadState]);


  return (
    <>
      <NavigationBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePageComponent} />
          <Route path="/generator" component={GeneratorPage} />
          <Route path="/login" render={() => <Login history={history} />} />
          <Route
            path="/callback"
            render={() => <Callback history={history} />}
          />
        </Switch>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadState: (): AppActionTypes => dispatch(appActions.requestLoadState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
