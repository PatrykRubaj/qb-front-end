import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePageComponent from "./HomePage/HomePage";
import GeneratorPage from "./SpreadsheetGeneration/GeneratorPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePageComponent} />
        <Route path="/generator" component={GeneratorPage} />
        <Route path="/about" />
      </Switch>
    </Router>
  );
};

export default App;
