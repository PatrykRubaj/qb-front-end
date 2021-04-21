import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import authActions from '../redux/actions/authActions';
import { AuthActionTypes } from '../redux/types/authTypes';
import LoaderWheel from '../components/common/LoaderWheel';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { RootState } from '../redux/reducers';

interface StateProps {
  marketingTrackingAllowed: boolean;
}

interface DispatchProps {
  login: (history: NextRouter) => void;
}

type Props = StateProps & DispatchProps;

const Login: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    props.login(router);
  }, [router, props.login, props]);

  useEffect(() => {
    if (props.marketingTrackingAllowed) {
      ReactGA.initialize('UA-176564324-1');
      ReactGA.event({
        category: 'User',
        action: 'User signup',
      });
    }
  });

  return (
    <>
      <Head>
        <title>Login redirect - Quantum Budget</title>
      </Head>
      <LoaderWheel
        title="Redirecting"
        description="You're being redirected to login"
      />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    marketingTrackingAllowed: state.userSection.cookiesConsent.marketing,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (history: NextRouter): AuthActionTypes =>
      dispatch(authActions.requestLogin(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
