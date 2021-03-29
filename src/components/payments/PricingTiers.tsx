import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import paymentActions from '../../redux/actions/paymentActions';
import { RootState } from '../../redux/reducers';
import { PriceTier } from '../../redux/state';
import { PaymentActionType } from '../../redux/types/paymentTypes';
import PricingTier from './PricingTier';

interface OwnProps {
  privacyPolicyAccepted: boolean;
  tosAccepted: boolean;
  setDisplayPrivacyRequiredInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayTosRequiredInfo: React.Dispatch<React.SetStateAction<boolean>>;
  refToPolicies?: React.MutableRefObject<HTMLHeadingElement>;
}

interface DispatchProps {
  requestPayment: (tier: PriceTier) => void;
}

type Props = OwnProps & DispatchProps;

const PricingTiers = (props: Props) => {
  const [redirectInProgress, setRedirectInProgress] = useState(false);

  const handlePaymentClick = (tier: PriceTier) => {
    const {
      privacyPolicyAccepted,
      tosAccepted,
      setDisplayPrivacyRequiredInfo,
      setDisplayTosRequiredInfo,
    } = props;
    if (privacyPolicyAccepted && tosAccepted) {
      setRedirectInProgress(true);
      props.requestPayment(tier);
      return;
    }

    props.refToPolicies?.current.scrollIntoView({ behavior: 'smooth' });

    if (privacyPolicyAccepted != true) {
      setDisplayPrivacyRequiredInfo(true);
    }

    if (tosAccepted != true) {
      setDisplayTosRequiredInfo(true);
    }
    // When the customer clicks on the button, redirect them to Checkout.

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  return (
    <React.Fragment>
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

const mapStateToProps = (state: RootState, ownProps: OwnProps): OwnProps => {
  return {
    privacyPolicyAccepted: ownProps.privacyPolicyAccepted,
    tosAccepted: ownProps.tosAccepted,
    setDisplayPrivacyRequiredInfo: ownProps.setDisplayPrivacyRequiredInfo,
    setDisplayTosRequiredInfo: ownProps.setDisplayTosRequiredInfo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    requestPayment: (price: PriceTier): PaymentActionType =>
      dispatch(paymentActions.requestSessionId(price)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingTiers);
