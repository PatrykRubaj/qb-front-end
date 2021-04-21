import { NextRouter } from 'next/router';
import { RootState } from '../reducers';
import { CookieConsent } from '../state';

export const REQUEST_STATE_LOAD = 'REQUEST_STATE_LOAD';
export const REQUEST_STATE_LOAD_FINISHED = 'REQUEST_STATE_LOAD_FINISHED';
export const REQUEST_SAVE_COOKIES_CONSENT = 'REQUEST_SAVE_COOKIES_CONSENT';
export const REQUEST_READ_COOKIES_CONSENT = 'REQUEST_READ_COOKIES_CONSENT';
export const REQUEST_READ_COOKIES_CONSENT_FINISHED =
  'REQUEST_READ_COOKIES_CONSENT_FINISHED';

interface RequestStateLoadAction {
  type: typeof REQUEST_STATE_LOAD;
  history: NextRouter;
}

interface RequestStateLoadFinishedAction {
  type: typeof REQUEST_STATE_LOAD_FINISHED;
  payload: RootState;
}

interface RequestSaveCookiesConsentAction {
  type: typeof REQUEST_SAVE_COOKIES_CONSENT;
  payload: CookieConsent;
}

interface RequestReadCookiesConsentAction {
  type: typeof REQUEST_READ_COOKIES_CONSENT;
}

interface RequestReadCookiesConsentFinishedAction {
  type: typeof REQUEST_READ_COOKIES_CONSENT_FINISHED;
  payload: CookieConsent;
}

export type AppActionTypes =
  | RequestStateLoadAction
  | RequestStateLoadFinishedAction
  | RequestSaveCookiesConsentAction
  | RequestReadCookiesConsentAction
  | RequestReadCookiesConsentFinishedAction;
