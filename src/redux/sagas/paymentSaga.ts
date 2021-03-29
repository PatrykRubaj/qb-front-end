import { take, put, select, call } from 'redux-saga/effects';
import paymentActions from '../actions/paymentActions';
import * as paymentTypes from '../types/paymentTypes';
import StripePaymentService from '../../services/stripePaymentsService';
import { RootState } from '../reducers';
import { PriceTier, Route, User } from '../state';
import { loadStripe } from '@stripe/stripe-js';
import { saveState, getState } from './authSagas';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const getUser = (state: RootState): User => state.userSection.user;

async function getSessionId(
  accessToken: string,
  price: PriceTier
): Promise<string> {
  const stripeService = new StripePaymentService(accessToken);
  // const sessionId = await stripeService.requestSessionId(price);
  // return sessionId;

  await stripeService.requestSessionId(price);
  return '';
}

async function redirectToStripeCheckout(
  sessionId: string,
  state: RootState
): Promise<void> {
  saveState(state);
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
}

function redirectToPaymentSuccessful() {
  const history = useRouter();
  history.push(Route.PaymentSuccessful);
}

export function* requestSessionId() {
  while (true) {
    const { price } = yield take(paymentTypes.REQUEST_SESSION_ID);

    const user: User = yield select(getUser);
    const state: RootState = yield select(getState);

    const sessionId = yield call(getSessionId, user.accessToken, price);
    yield put(paymentActions.requestSessionIdFinished(sessionId));

    if (sessionId != null) {
      // yield call(redirectToStripeCheckout, sessionId, state);
      yield call(redirectToPaymentSuccessful);
    }
  }
}

export default [requestSessionId];
