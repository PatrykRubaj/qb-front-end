import React from "react";
import { Link } from "react-router-dom";

const HomePageComponent: React.FC = () => {
  return (
    <div className="row">
      <div className="col-sm">
        <Link to="/generator">Generator</Link>
      </div>
      <div className="col-sm">One of three columns</div>
      <div className="col-sm">One of three columns</div>
    </div>
  );
};

export default HomePageComponent;
