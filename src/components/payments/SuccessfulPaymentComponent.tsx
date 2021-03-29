import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setRedirectUrl } from '../../features/user/slice';
import appActions from '../../redux/actions/appActions';
import authActions from '../../redux/actions/authActions';
import { Route } from '../../redux/state';
import { AppActionTypes } from '../../redux/types/appTypes';
import { AuthActionTypes } from '../../redux/types/authTypes';

interface DispatchProps {
  login: (history: NextRouter) => void;
  setRedirectUrl: (redirectUrl: string) => void;
  loadState: (history: NextRouter) => AppActionTypes;
}

type Props = DispatchProps;

export function SuccessfulPayment(props: Props) {
  const router = useRouter();

  React.useEffect(() => {
    async function redirectAfterPayment() {
      const { sessionId } = router.query;
      props.loadState(router);
      console.info(sessionId);
      // if (!sessionId) {
      //   await router.push(Route.HomePage);
      // } else {
      //   props.setRedirectUrl(Route.GeneratorResponse);
      //   props.login(router);
      // }
      props.setRedirectUrl(Route.GeneratorResponse);
      props.login(router);
    }

    redirectAfterPayment();
  }, []);
  return null;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    login: (history: NextRouter): AuthActionTypes =>
      dispatch(authActions.requestLogin(history)),
    setRedirectUrl: (redirectUrl: string) =>
      dispatch(setRedirectUrl(redirectUrl)),
    loadState: (history: NextRouter): AppActionTypes =>
      dispatch(appActions.requestLoadState(history)),
  };
};

export default connect(null, mapDispatchToProps)(SuccessfulPayment);
