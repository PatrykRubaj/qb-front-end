import React from "react";
import {   BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps } from "react-router-dom";

const App : React.FC = () => {
  const dupa = <div></div>;
  return (
    <Router>
    <Route path="/generator" />
    <Route path="/about" />
    
  </Router>);
}

export default App;
