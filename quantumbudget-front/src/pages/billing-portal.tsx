import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import authActions from '../redux/actions/authActions';
import { AuthActionTypes } from '../redux/types/authTypes';
import LoaderWheel from '../components/common/LoaderWheel';
import { useEffect } from 'react';
import ProtectedComponent from '../auth0/ProtectedComponent';
import { Route } from '../redux/state';
import { RootState } from '../redux/reducers';
import RedirectComponent from '../components/common/redirectComponent';

interface StateProps {
  tokenExpiresAt: number;
}

interface DispatchProps {
  redirectToBillingPortal: (history: NextRouter) => void;
}

type Props = StateProps & DispatchProps;

const AuthenticatedBilledPortal = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    props.redirectToBillingPortal(router);
  }, [router, props.redirectToBillingPortal, props]);

  return (
    <>
      <Head>
        <title>Billing portal redirect - Quantum Budget</title>
      </Head>
      <LoaderWheel
        title="Redirecting"
        description="You're being redirected to Stripe billing portal"
      />
    </>
  );
};

const BillingPortal = (props: Props) => {
  return (
    <ProtectedComponent
      expiresAt={props.tokenExpiresAt}
      notAuthenticated={<RedirectComponent redirectUrl={Route.HomePage} />}
    >
      <AuthenticatedBilledPortal
        tokenExpiresAt={props.tokenExpiresAt}
        redirectToBillingPortal={props.redirectToBillingPortal}
      />
    </ProtectedComponent>
  );
};

export const mapStateToProps = (state: RootState): StateProps => {
  return {
    tokenExpiresAt: state.userSection.user?.expiresAt,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    redirectToBillingPortal: (history: NextRouter): AuthActionTypes =>
      dispatch(authActions.requestBillingPortal(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingPortal);
