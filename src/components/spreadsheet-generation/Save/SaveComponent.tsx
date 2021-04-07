import React, { useEffect, useRef, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { RootState } from '../../../redux/reducers';
import authActions from '../../../redux/actions/authActions';
import { AuthActionTypes } from '../../../redux/types/authTypes';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import NewsletterComponent from './NewsletterComponent';
import { Permission, PriceTier, Route } from '../../../redux/state';
import { BudgetActionTypes } from '../../../redux/types/budgetTypes';
import budgetActions from '../../../redux/actions/budgetActions';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentActionType } from '../../../redux/types/paymentTypes';
import paymentActions from '../../../redux/actions/paymentActions';
import PricingTiers from '../../payments/PricingTiers';
import ProtectedComponent from '../../../auth0/ProtectedComponent';
import SignInWithGoogleComponent from '../../../auth0/SignInWithGoogleComponent';
import {
  setNewsletter,
  setNewsletterPrompt,
  setPrivacyPolicy,
  setRedirectUrl,
  setAgreedToTos,
} from '../../../features/user/slice';

interface StateProps {
  agreedToNewsletter: boolean | null;
  agreedToPrivacyPolicy: boolean | null;
  agreedToTos: boolean | null;
  showNewsletterPrompt: boolean;
  sessionId: string;
  canGenerateBudget: boolean;
  expiresAt: number;
}

interface DispatchProps {
  setNewsletterAgreement: (agreedToNewsletter: boolean) => void;
  setPrivacyPolicyAgreement: (agreedToPrivacyPolicy: boolean) => void;
  setDisplayNewsletterPrompt: (showNewsletterPrompt: boolean) => void;
  setAgreedToTos: (agreedToTos: boolean) => void;
  setRedirectUrl: (redirectUrl: string) => void;
  saveBudget: (history: NextRouter) => BudgetActionTypes;
}

type Props = StateProps & DispatchProps;

const SaveComponent = ({
  agreedToPrivacyPolicy,
  agreedToTos,
  agreedToNewsletter,
  showNewsletterPrompt,
  setNewsletterAgreement,
  setPrivacyPolicyAgreement,
  setAgreedToTos,
  setDisplayNewsletterPrompt,
  setRedirectUrl,
  saveBudget,
  sessionId,
  canGenerateBudget,
  expiresAt,
}: Props) => {
  const [shouldDisplayTermsRow, setShouldDisplayTermsRow] = useState(false);

  const nearlyDoneHeader = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => {
    if (agreedToPrivacyPolicy === null || agreedToTos === null) {
      setShouldDisplayTermsRow(true);
    }
  }, []);

  const [
    displayPrivacyRequiredInfo,
    setDisplayPrivacyRequiredInfo,
  ] = React.useState<boolean>(false);
  const [
    displayTosRequiredInfo,
    setDisplayTosRequiredInfo,
  ] = React.useState<boolean>(false);

  const router = useRouter();

  const onPrivacyPolicyChecboxClick = (): void => {
    setPrivacyPolicyAgreement(!agreedToPrivacyPolicy);

    if (!agreedToPrivacyPolicy) {
      setDisplayPrivacyRequiredInfo(false);
    }
  };

  const onTermsOfServiceChecboxClick = (): void => {
    setAgreedToTos(!agreedToTos);

    if (!agreedToTos) {
      setDisplayTosRequiredInfo(false);
    }
  };

  const onSaveClick = (): void => {
    if (agreedToPrivacyPolicy && agreedToTos) {
      if (agreedToNewsletter === null) {
        setDisplayNewsletterPrompt(true);
      } else {
        generateBudget(agreedToNewsletter);
      }
    } else {
      if (!agreedToTos) {
        setDisplayTosRequiredInfo(true);
      }

      if (!agreedToPrivacyPolicy) {
        setDisplayPrivacyRequiredInfo(true);
      }
    }
  };

  const generateBudget = (agreed: boolean): void => {
    setNewsletterAgreement(agreed);
    setDisplayNewsletterPrompt(false);
    setRedirectUrl(Route.GeneratorResponse);
    saveBudget(router);
  };

  const closingNewsletterPrompt = (): void => {
    setDisplayNewsletterPrompt(false);
  };

  return (
    <>
      {showNewsletterPrompt && (
        <NewsletterComponent
          show={showNewsletterPrompt}
          handleClose={generateBudget}
          onClose={closingNewsletterPrompt}
        />
      )}

      <ProtectedComponent
        expiresAt={expiresAt}
        notAuthenticated={
          <div className="row justify-content-center">
            <div className="col">
              <h2 className="mt-2">Sign in (required)</h2>
              <SignInWithGoogleComponent />
            </div>
          </div>
        }
      >
        {shouldDisplayTermsRow ? (
          <div className="row">
            <div className="col">
              <h2 className="mt-2" ref={nearlyDoneHeader}>
                Nearly done
              </h2>
              <div className="form-check pl-0">
                <FormControl
                  component="fieldset"
                  error={displayPrivacyRequiredInfo}
                  required
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={
                          <CheckBoxOutlineBlankIcon style={{ fontSize: 32 }} />
                        }
                        checkedIcon={<CheckBoxIcon style={{ fontSize: 32 }} />}
                        checked={agreedToPrivacyPolicy || false}
                        id="privacyPolicyCheck"
                        onChange={onPrivacyPolicyChecboxClick}
                        className={
                          'form-check-input' +
                          (displayPrivacyRequiredInfo ? ' is-invalid' : '')
                        }
                        value="agreedToPrivacyPolicy"
                        color="primary"
                      />
                    }
                    label="Agree to privacy policy (required)"
                  />
                  <FormHelperText>
                    You must agree to{' '}
                    <Link href={Route.PrivacyPolicy}>
                      <a rel="nofollow">privacy policy</a>
                    </Link>{' '}
                    before submitting.
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-check pl-0">
                <FormControl
                  component="fieldset"
                  error={displayTosRequiredInfo}
                  required
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={
                          <CheckBoxOutlineBlankIcon style={{ fontSize: 32 }} />
                        }
                        checkedIcon={<CheckBoxIcon style={{ fontSize: 32 }} />}
                        checked={agreedToTos || false}
                        id="privacyPolicyCheck"
                        onChange={onTermsOfServiceChecboxClick}
                        className={
                          'form-check-input' +
                          (displayTosRequiredInfo ? ' is-invalid' : '')
                        }
                        value="agreedToTos"
                        color="primary"
                      />
                    }
                    label="Agree to Terms of Service (required)"
                  />
                  <FormHelperText>
                    You must agree to{' '}
                    <Link href={Route.TermsOfService}>
                      <a rel="nofollow">terms of service</a>
                    </Link>{' '}
                    before submitting.
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
        ) : null}
        {canGenerateBudget ? (
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary btn-lg btn-block mb-4 mt-2"
                onClick={onSaveClick}
              >
                <SaveIcon
                  fontSize="large"
                  className="mr-2 align-middle"
                ></SaveIcon>
                <span className="align-middle">Save budget spreadsheet</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="row justify-content-around">
            <PricingTiers
              privacyPolicyAccepted={agreedToPrivacyPolicy}
              tosAccepted={agreedToTos}
              setDisplayPrivacyRequiredInfo={setDisplayPrivacyRequiredInfo}
              setDisplayTosRequiredInfo={setDisplayTosRequiredInfo}
              refToPolicies={nearlyDoneHeader}
            />
          </div>
        )}
      </ProtectedComponent>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    agreedToPrivacyPolicy: state.userSection.agreedToPrivacyPolicy,
    agreedToTos: state.userSection.agreedToTos,
    agreedToNewsletter: state.userSection.agreedToNewsletter,
    showNewsletterPrompt: state.userSection.showNewsletterPrompt,
    sessionId: state.paymentSection.stripeSessionId,
    canGenerateBudget:
      state.userSection.user.permissions.find(
        (x) => x == Permission.GenerateBudget
      ) !== undefined,
    expiresAt: state.userSection.user?.expiresAt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setNewsletterAgreement: (agreedToNewsletter: boolean) =>
      dispatch(setNewsletter(agreedToNewsletter)),
    setPrivacyPolicyAgreement: (agreedToPrivacyPolicy: boolean) =>
      dispatch(setPrivacyPolicy(agreedToPrivacyPolicy)),
    setAgreedToTos: (agreedToTos: boolean) =>
      dispatch(setAgreedToTos(agreedToTos)),
    setDisplayNewsletterPrompt: (showNewsletterPrompt: boolean) =>
      dispatch(setNewsletterPrompt(showNewsletterPrompt)),
    setRedirectUrl: (redirectUrl: string) =>
      dispatch(setRedirectUrl(redirectUrl)),
    saveBudget: (history: NextRouter): BudgetActionTypes =>
      dispatch(budgetActions.requestBudgetSave(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveComponent);
