import * as React from "react";
import { RootState } from "../redux/reducers";
import { ErrorResponse } from "./state";
import { connect } from "react-redux";

// interface DispatchProps {
//   moveSubcategory: (startIndex: number, endIndex: number, id: string) => void;
// }

interface StateProps {
  spreadsheetUrl?: string;
  errors?: ErrorResponse;
}

type Props = StateProps;

const GeneratorResponse: React.FC<Props> = ({
  spreadsheetUrl,
  errors,
}: Props) => {
  if (!errors && spreadsheetUrl) {
    return (
      <div>
        <a href={spreadsheetUrl}>Link to spreadsheet</a>
      </div>
    );
  } else if (errors) {
    return <div>Response: {errors?.message}</div>;
  }

  return null;
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    spreadsheetUrl: state.budgetSection.response?.spreadsheetUrl,
    errors: state.budgetSection.response?.errors,
  };
};

export default connect(mapStateToProps)(GeneratorResponse);
