import React, { useEffect } from "react";
import { History } from "history";
import { Route, Switch } from "react-router-dom";
import HomePageComponent from "./HomePage/HomePage";
import PrivacyPolicyComponent from "./HomePage/PrivacyPolicyPage";
import GeneratorPage from "./SpreadsheetGeneration/GeneratorPage";
import GeneratorResponse, {
  GeneratorResponse as GeneratorResponsePage,
} from "./SpreadsheetGeneration/ResponsePage";
import NavigationBar from "./Common/NavigationBar";
import Login from "./auth0/Components/Login";
import Callback from "./auth0/Components/Callback";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppActionTypes } from "./redux/types/appTypes";
import appActions from "./redux/actions/appActions";
import { ErrorResponse } from "./SpreadsheetGeneration/state";

interface DispatchProps {
  loadState: (history: History<History.PoorMansUnknown>) => AppActionTypes;
}

type Props = DispatchProps;

const App: React.FC<Props> = ({ loadState }: Props) => {
  const history = useHistory();
  useEffect(() => {
    loadState(history);
  }, [loadState, history]);

  const error: ErrorResponse = {
    code: 401,
    message: "Error",
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePageComponent} />
          <Route exact path="/privacy" component={PrivacyPolicyComponent} />
          <Route path="/generator" component={GeneratorPage} />
          <Route path="/generator-response" component={GeneratorResponse} />
          <Route
            path="/generator-response-test"
            render={() => (
              <GeneratorResponsePage
                spreadsheetUrl="https://google.com/"
                isNewsletterSubscriber={true}
                errors={error}
              />
            )}
          />
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
    loadState: (history: History<History.PoorMansUnknown>): AppActionTypes =>
      dispatch(appActions.requestLoadState(history)),
  };
};

export default connect(null, mapDispatchToProps)(App);
