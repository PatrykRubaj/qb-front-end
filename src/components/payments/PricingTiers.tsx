import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import paymentActions from '../../redux/actions/paymentActions';
import { RootState } from '../../redux/reducers';
import { PriceTier } from '../../redux/state';
import { PaymentActionType } from '../../redux/types/paymentTypes';
import PricingTier from './PricingTier';
import NewsletterComponent from '../spreadsheet-generation/Save/NewsletterComponent';
import { setNewsletter, setNewsletterPrompt } from '../../features/user/slice';

interface StateProps {
  agreedToNewsletter?: boolean;
  showNewsletterPrompt: boolean;
}

interface OwnProps {
  privacyPolicyAccepted: boolean;
  tosAccepted: boolean;
  setDisplayPrivacyRequiredInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTosRequiredInfo: React.Dispatch<React.SetStateAction<boolean>>;
  refToPolicies?: React.MutableRefObject<HTMLHeadingElement>;
}

interface DispatchProps {
  requestPayment: (tier: PriceTier) => void;
  setNewsletterAgreement: (agreedToNewsletter: boolean) => void;
  setDisplayNewsletterPrompt: (showNewsletterPrompt: boolean) => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const PricingTiers = (props: Props) => {
  const [redirectInProgress, setRedirectInProgress] = useState(false);
  const [selectedPriceTier, setSelectedPriceTier] = useState<PriceTier>(null);

  const remaindToAcceptPolicies = (
    privacyPolicyAccepted: boolean,
    tosAccepted: boolean,
    refToPolicies?: React.MutableRefObject<HTMLHeadingElement>
  ) => {
    const { setDisplayPrivacyRequiredInfo, setDisplayTosRequiredInfo } = props;

    refToPolicies?.current.scrollIntoView({ behavior: 'smooth' });

    if (privacyPolicyAccepted != true) {
      setDisplayPrivacyRequiredInfo(true);
    }

    if (tosAccepted != true) {
      setDisplayTosRequiredInfo(true);
    }
  };

  const startPaymenProcess = (tier: PriceTier) => {
    setRedirectInProgress(true);
    debugger;
    props.requestPayment(tier);
  };

  const handlePaymentClick = (tier: PriceTier) => {
    const {
      privacyPolicyAccepted,
      tosAccepted,
      agreedToNewsletter,
      refToPolicies,
      setDisplayNewsletterPrompt,
    } = props;
    setSelectedPriceTier(tier);
    debugger;
    if (privacyPolicyAccepted && tosAccepted) {
      if (agreedToNewsletter == null) {
        setDisplayNewsletterPrompt(true);
      } else {
        startPaymenProcess(tier);
      }
      return;
    } else {
      remaindToAcceptPolicies(
        privacyPolicyAccepted,
        tosAccepted,
        refToPolicies
      );
    }
  };

  const handleNewsletterOptionSelected = (agreed: boolean): void => {
    const { setNewsletterAgreement, setDisplayNewsletterPrompt } = props;

    setNewsletterAgreement(agreed);
    setDisplayNewsletterPrompt(false);
    startPaymenProcess(selectedPriceTier);
  };

  const onNewsletterPromptClose = (): void => {
    props.setDisplayNewsletterPrompt(false);
  };

  return (
    <React.Fragment>
      {props.showNewsletterPrompt && (
        <NewsletterComponent
          show={props.showNewsletterPrompt}
          handleClose={handleNewsletterOptionSelected}
          onClose={onNewsletterPromptClose}
        />
      )}
      <PricingTier
        name="Pro"
        price={20}
        redirectInPropgress={redirectInProgress}
        description="For selected few who truly appreciate my work."
        priceTier={PriceTier.Pro}
        featuresList={[
          'Everything from Basic 📦 and…',
          'You are in the exclusive club for generous people 🤗',
          'You buy me more & better coffee ☕ (I don’t run on solar power, coffee on the other hand… 💻)',
        ]}
        onClick={handlePaymentClick}
      />
      {/* <PricingTier
        name="Premium"
        price={14.99}
        redirectInPropgress={redirectInProgress}
        description="For intermediate users who value their time."
        priceTier={PriceTier.Premium}
        featuresList={[
          'Everything from Basic 📦 and…',
          'Receive a new budget every month directly to your inbox (it’s going to help keep the good habit of managing personal finances)',
        ]}
        onClick={handlePaymentClick}
      /> */}
      <PricingTier
        name="Basic"
        price={10}
        redirectInPropgress={redirectInProgress}
        description="Great to start your journey  with personal finances."
        priceTier={PriceTier.Basic}
        featuresList={['Generate a budget whenever you want']}
        onClick={handlePaymentClick}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps
): StateProps & OwnProps => {
  return {
    privacyPolicyAccepted: ownProps.privacyPolicyAccepted,
    tosAccepted: ownProps.tosAccepted,
    setDisplayPrivacyRequiredInfo: ownProps.setDisplayPrivacyRequiredInfo,
    setDisplayTosRequiredInfo: ownProps.setDisplayTosRequiredInfo,
    agreedToNewsletter: state.userSection.agreedToNewsletter,
    showNewsletterPrompt: state.userSection.showNewsletterPrompt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    requestPayment: (price: PriceTier): PaymentActionType =>
      dispatch(paymentActions.requestSessionId(price)),
    setNewsletterAgreement: (agreedToNewsletter: boolean) =>
      dispatch(setNewsletter(agreedToNewsletter)),
    setDisplayNewsletterPrompt: (showNewsletterPrompt: boolean) =>
      dispatch(setNewsletterPrompt(showNewsletterPrompt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingTiers);
