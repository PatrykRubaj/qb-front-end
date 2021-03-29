import * as authTypes from '../types/authTypes';
import { User } from '../state';
import { NextRouter } from 'next/router';

const requestLogin = (history: NextRouter): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_LOGIN,
    history,
  };
};

const requestCallback = (history: NextRouter): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_CALLBACK,
    history,
  };
};

const requestCallbackFinished = (user: User): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_CALLBACK_FINISHED,
    user,
  };
};

const requestLogout = (history: NextRouter): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_LOGOUT,
    history,
  };
};

const requestBillingPortal = (
  history: NextRouter
): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_BILLING_PORTAL,
    history,
  };
};

const requestBillingPortalFinished = (): authTypes.AuthActionTypes => {
  return {
    type: authTypes.REQUEST_BILLING_PORTAL_FINISHED,
  };
};

export default {
  requestLogin,
  requestCallback,
  requestCallbackFinished,
  requestLogout,
  requestBillingPortal,
  requestBillingPortalFinished,
};
