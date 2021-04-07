import { take, put, call } from 'redux-saga/effects';
import * as appTypes from '../types/appTypes';
import appActions from '../actions/appActions';
import { RootState } from '../reducers';
import { CookieConsent } from '../state';
import Cookies from 'universal-cookie';

const getStateFromLocalStorage = (): RootState | null => {
  const state = localStorage.getItem('state');
  if (state !== null) {
    const parsedState = JSON.parse(state);
    return parsedState;
  }

  return null;
};

export function* requestStateSaga() {
  while (true) {
    yield take(appTypes.REQUEST_STATE_LOAD);
    const state: RootState | null = yield call(getStateFromLocalStorage);
    const cookiesConsent: CookieConsent | null = yield call(readCookiesConsent);

    console.log('requestStateSaga, cookiesConsent:', cookiesConsent);
    if (state !== null) {
      try {
        yield put(appActions.requestLoadStateFinished(state));
      } catch (ex) {
        console.log(ex);
        localStorage.clear();
      }
    }
  }
}

const saveCookiesConsent = async (
  cookiesConsent: CookieConsent
): Promise<void> => {
  const cookies = new Cookies();
  cookies.set('cookieConsent', cookiesConsent, {
    maxAge: 60 * 60 * 24 * 30,
    secure: true,
  });
};

const readCookiesConsent = async (): Promise<CookieConsent | null> => {
  const cookies = new Cookies();
  const readCookie: CookieConsent | null = cookies.get('cookieConsent') ?? null;
  return readCookie;
};

export function* requestSaveCookiesConsentSaga() {
  while (true) {
    const { payload } = yield take(appTypes.REQUEST_SAVE_COOKIES_CONSENT);
    console.log('appSagas, payload: ', payload);

    yield call(saveCookiesConsent, payload);
  }
}

export function* requestReadCookiesConsentSaga() {
  while (true) {
    yield take(appTypes.REQUEST_READ_COOKIES_CONSENT);
    const cookiesConsent: CookieConsent | null = yield call(readCookiesConsent);
    console.log(
      'appSagas requestReadCookiesConsentSaga, payload: ',
      cookiesConsent
    );

    yield put(appActions.requestReadCookiesConsentFinished(cookiesConsent));
  }
}

export default [
  requestStateSaga,
  requestSaveCookiesConsentSaga,
  requestReadCookiesConsentSaga,
];
