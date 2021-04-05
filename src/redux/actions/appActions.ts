import { NextRouter } from 'next/router';
import * as appTypes from '../types/appTypes';
import { RootState } from '../reducers';
import { CookieConsent } from '../state';

const requestLoadState = (history: NextRouter): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_STATE_LOAD,
    history,
  };
};

const requestLoadStateFinished = (
  state: RootState
): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_STATE_LOAD_FINISHED,
    payload: state,
  };
};

const requestSaveCookiesConsent = (
  payload: CookieConsent
): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_SAVE_COOKIES_CONSENT,
    payload,
  };
};

const requestReadCookiesConsent = (): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_READ_COOKIES_CONSENT,
  };
};

const requestReadCookiesConsentFinished = (
  payload: CookieConsent
): appTypes.AppActionTypes => {
  return {
    type: appTypes.REQUEST_READ_COOKIES_CONSENT_FINISHED,
    payload,
  };
};

export default {
  requestLoadState,
  requestLoadStateFinished,
  requestSaveCookiesConsent,
  requestReadCookiesConsent,
  requestReadCookiesConsentFinished,
};
