import { NextRouter } from 'next/router';
import { User } from '../state';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_FINISHED = 'REQUEST_LOGIN_FINISHED';
export const REQUEST_CALLBACK = 'REQUEST_CALLBACK';
export const REQUEST_CALLBACK_FINISHED = 'REQUEST_CALLBACK_FINISHED';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_LOGOUT_FINISHED = 'REQUEST_LOGOUT_FINISHED';
export const REQUEST_BILLING_PORTAL = 'REQUEST_BILLING_PORTAL';
export const REQUEST_BILLING_PORTAL_FINISHED =
  'REQUEST_BILLING_PORTAL_FINISHED';

interface RequestLoginAction {
  type: typeof REQUEST_LOGIN;
  history: NextRouter;
}

interface RequestCallbackdAction {
  type: typeof REQUEST_CALLBACK;
  history: NextRouter;
}

interface RequestCallbackFinishedAction {
  type: typeof REQUEST_CALLBACK_FINISHED;
  user: User;
}

interface RequestLogoutAction {
  type: typeof REQUEST_LOGOUT;
  history: NextRouter;
}

interface RequestLogoutFinishedAction {
  type: typeof REQUEST_LOGOUT_FINISHED;
}

interface RequestBillingPortalAction {
  type: typeof REQUEST_BILLING_PORTAL;
  history: NextRouter;
}

interface RequestBillingPortalFinishedAction {
  type: typeof REQUEST_BILLING_PORTAL_FINISHED;
}

export type AuthActionTypes =
  | RequestLoginAction
  | RequestCallbackdAction
  | RequestCallbackFinishedAction
  | RequestLogoutAction
  | RequestLogoutFinishedAction
  | RequestBillingPortalAction
  | RequestBillingPortalFinishedAction;
