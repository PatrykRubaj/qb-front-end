import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePageComponent from "./HomePage/HomePage";
import GeneratorPage from "./SpreadsheetGeneration/GeneratorPage";
import NavigationBar from "./Common/NavigationBar";
import Login from "./auth0/Components/Login";
import Callback from "./auth0/Components/Callback";
import { useHistory } from "react-router-dom";

const App: React.FC = () => {
  const history = useHistory();

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

export default App;
