import * as React from "react";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import authActions from "../../redux/actions/authActions";
import { AuthActionTypes } from "../../redux/types/authTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface StateProps {
  agreedToNewsletter: boolean;
}

interface DispatchProps {
  setNewsletterAgreement: (agreedToNewsletter: boolean) => AuthActionTypes;
}

type Props = StateProps & DispatchProps;

const SaveComponent: React.FC<Props> = ({
  agreedToNewsletter,
  setNewsletterAgreement,
}: Props) => {
  const onChecboxClick = (): void => {
    setNewsletterAgreement(!agreedToNewsletter);
  };

  return (
    <>
      <div className="row">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={agreedToNewsletter}
            id="defaultCheck1"
            onChange={onChecboxClick}
            value="agreedToNewsletter"
          />
          <label
            // onClick={onChecboxClick}
            className="form-check-label"
            htmlFor="defaultCheck1"
          >
            Agree to receive email newsletter.
          </label>
        </div>
      </div>

      <div className="row">
        <Link to="/login">
          <button className="btn btn-primary btn-lg btn-block mb-4">
            <SaveIcon fontSize="large" className="mr-2 align-middle"></SaveIcon>
            <span className="align-middle">Save budget spreadsheet</span>
          </button>
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    agreedToNewsletter: state.userSection.agreedToNewsletter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setNewsletterAgreement: (agreedToNewsletter: boolean): AuthActionTypes =>
      dispatch(authActions.requestSetNewsletter(agreedToNewsletter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveComponent);
