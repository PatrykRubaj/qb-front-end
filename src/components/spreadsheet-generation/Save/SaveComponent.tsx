import * as React from "react";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { RootState } from "../../../redux/reducers";
import authActions from "../../../redux/actions/authActions";
import { AuthActionTypes } from "../../../redux/types/authTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import NewsletterComponent from "./NewsletterComponent";
import { Route } from "../../../redux/state";
import { BudgetActionTypes } from "../../../redux/types/budgetTypes";
import budgetActions from "../../../redux/actions/budgetActions";

interface StateProps {
  agreedToNewsletter: boolean;
  agreedToPrivacyPolicy: boolean;
  showNewsletterPrompt: boolean;
}

interface DispatchProps {
  setNewsletterAgreement: (agreedToNewsletter: boolean) => AuthActionTypes;
  setPrivacyPolicyAgreement: (
    agreedToPrivacyPolicy: boolean
  ) => AuthActionTypes;
  setDisplayNewsletterPrompt: (
    showNewsletterPrompt: boolean
  ) => AuthActionTypes;
  setRedirectUrl: (redirectUrl: string) => AuthActionTypes;
  saveBudget: (history: NextRouter) => BudgetActionTypes;
}

type Props = StateProps & DispatchProps;

const SaveComponent: React.FC<Props> = ({
  agreedToPrivacyPolicy,
  showNewsletterPrompt,
  setNewsletterAgreement,
  setPrivacyPolicyAgreement,
  setDisplayNewsletterPrompt,
  setRedirectUrl,
  saveBudget,
}: Props) => {
  const [
    displayPrivacyRequiredInfo,
    setDisplayPrivacyRequiredInfo,
  ] = React.useState<boolean>(false);

  const router = useRouter();

  const onPrivacyPolicyChecboxClick = (): void => {
    setPrivacyPolicyAgreement(!agreedToPrivacyPolicy);

    if (!agreedToPrivacyPolicy) {
      setDisplayPrivacyRequiredInfo(false);
    }
  };

  const onSaveClick = (): void => {
    if (agreedToPrivacyPolicy) {
      setDisplayNewsletterPrompt(true);
    } else {
      setDisplayPrivacyRequiredInfo(true);
    }
  };

  const onSave = (agreed: boolean): void => {
    setNewsletterAgreement(agreed);
    setDisplayNewsletterPrompt(false);
    setRedirectUrl(Route.GeneratorResponse);
    saveBudget(router);
    // router.push(Route.Login);
  };

  const closingNewsletterPrompt = (): void => {
    setDisplayNewsletterPrompt(false);
  };

  return (
    <>
      {showNewsletterPrompt && (
        <NewsletterComponent
          show={showNewsletterPrompt}
          handleClose={onSave}
          onClose={closingNewsletterPrompt}
        />
      )}
      <div className="row">
        <div className="col">
          <h2 className="mt-2">Nearly done</h2>
          <div className="form-check pl-0">
            <FormControl
              component="fieldset"
              error={displayPrivacyRequiredInfo}
              required
            >
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 32 }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 32 }} />}
                    checked={agreedToPrivacyPolicy}
                    id="privacyPolicyCheck"
                    onChange={onPrivacyPolicyChecboxClick}
                    className={
                      "form-check-input" +
                      (displayPrivacyRequiredInfo ? " is-invalid" : "")
                    }
                    value="agreedToPrivacyPolicy"
                    color="primary"
                  />
                }
                label="Agree to privacy policy (required)"
              />
              <FormHelperText>
                You must agree to{" "}
                <Link href={Route.PrivacyPolicy}>
                  <a rel="nofollow">privacy policy</a>
                </Link>{" "}
                before submitting.
              </FormHelperText>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary btn-lg btn-block mb-4 mt-2"
            onClick={onSaveClick}
          >
            <SaveIcon fontSize="large" className="mr-2 align-middle"></SaveIcon>
            <span className="align-middle">Save budget spreadsheet</span>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    agreedToNewsletter: state.userSection.agreedToNewsletter,
    agreedToPrivacyPolicy: state.userSection.agreedToPrivacyPolicy,
    showNewsletterPrompt: state.userSection.showNewsletterPrompt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setNewsletterAgreement: (agreedToNewsletter: boolean): AuthActionTypes =>
      dispatch(authActions.requestSetNewsletter(agreedToNewsletter)),
    setPrivacyPolicyAgreement: (
      agreedToPrivacyPolicy: boolean
    ): AuthActionTypes =>
      dispatch(authActions.requestSetPrivacyPolicy(agreedToPrivacyPolicy)),
    setDisplayNewsletterPrompt: (
      showNewsletterPrompt: boolean
    ): AuthActionTypes =>
      dispatch(authActions.requestSetNewsletterPrompt(showNewsletterPrompt)),
    setRedirectUrl: (redirectUrl: string): AuthActionTypes =>
      dispatch(authActions.requestSetRedirectUrl(redirectUrl)),
    saveBudget: (history: NextRouter): BudgetActionTypes =>
      dispatch(budgetActions.requestBudgetSave(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveComponent);
