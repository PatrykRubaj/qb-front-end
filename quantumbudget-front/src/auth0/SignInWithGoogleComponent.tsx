import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setRedirectUrl } from '../features/user/slice';
import authActions from '../redux/actions/authActions';
import budgetActions from '../redux/actions/budgetActions';
import { Route } from '../redux/state';
import { AuthActionTypes } from '../redux/types/authTypes';
import { BudgetActionTypes } from '../redux/types/budgetTypes';

export interface SignInWithGoogleDispatchProps {
  setRedirectUrl: (redirectUrl: string) => void;
  saveBudget: (history: NextRouter) => BudgetActionTypes;
}

export function SignInWithGoogle(props: SignInWithGoogleDispatchProps) {
  const router = useRouter();

  const onClick = (): void => {
    props.setRedirectUrl(Route.Generator);
    props.saveBudget(router);
    router.push(Route.Login);
  };

  return (
    <Link href={Route.Login}>
      <button
        className="btn btn-warning btn-lg btn-block"
        role="button"
        onClick={onClick}
      >
        Sign In with Google
      </button>
    </Link>
  );
}

const mapDispatchToProps = (
  dispatch: Dispatch
): SignInWithGoogleDispatchProps => {
  return {
    setRedirectUrl: (redirectUrl: string) =>
      dispatch(setRedirectUrl(redirectUrl)),
    saveBudget: (history: NextRouter): BudgetActionTypes =>
      dispatch(budgetActions.requestBudgetSave(history)),
  };
};

export default connect(null, mapDispatchToProps)(SignInWithGoogle);
