import * as React from "react";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";

const SaveComponent: React.FC = () => {
  return (
    <div className="row">
      <Link to="/login">
        <button className="btn btn-primary btn-lg btn-block mb-4">
          <SaveIcon fontSize="large" className="mr-2 align-middle"></SaveIcon>
          <span className="align-middle">Save budget spreadsheet</span>
        </button>
      </Link>
    </div>
  );
};

export default SaveComponent;
