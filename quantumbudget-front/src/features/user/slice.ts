import {
  CookieConsent,
  CookieConsentDialogState,
  DialogState,
  ReadState,
  User,
  UserSection,
} from '../../redux/state';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as appTypes from '../../redux/types/appTypes';
import * as budgetTypes from '../../redux/types/budgetTypes';
import { RootState } from '../../redux/reducers';

const stateLoaded = createAction<RootState>(
  appTypes.REQUEST_STATE_LOAD_FINISHED
);

const budgetReadFromDatabase = createAction<ReadState>(
  budgetTypes.REQUEST_BUDGET_READ_FINISHED
);

const cookieConsentRead = createAction<CookieConsent>(
  appTypes.REQUEST_READ_COOKIES_CONSENT_FINISHED
);

export const slice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    agreedToNewsletter: null,
    agreedToPrivacyPolicy: null,
    agreedToTos: null,
    showNewsletterPrompt: false,
    user: {
      idToken: '',
      accessToken: '',
      givenName: '',
      imageUrl: '',
      email: '',
      emailVerified: false,
      expiresAt: 0,
      userId: '',
      permissions: [] as string[],
    },
    cookiesConsent: {
      essential: true,
      statistics: false,
      marketing: false,
    },
    cookieConsentDialog: {
      open: false,
      state: DialogState.BasicInformation,
    },
    redirectUrl: '',
  } as UserSection,
  reducers: {
    setNewsletter: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        agreedToNewsletter: action.payload,
      };
    },
    setPrivacyPolicy: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        agreedToPrivacyPolicy: action.payload,
      };
    },
    setAgreedToTos: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        agreedToTos: action.payload,
      };
    },
    setNewsletterPrompt: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showNewsletterPrompt: action.payload,
      };
    },
    setRedirectUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        redirectUrl: action.payload,
      };
    },
    callbackFinished: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setCookies: (state, action: PayloadAction<CookieConsent>) => {
      return {
        ...state,
        cookiesConsent: {
          essential: action.payload.essential,
          statistics: action.payload.statistics,
          marketing: action.payload.marketing,
        },
      };
    },
    setCookieConsentDialog: (
      state,
      action: PayloadAction<CookieConsentDialogState>
    ) => {
      return {
        ...state,
        cookieConsentDialog: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateLoaded, (state, action) => {
        return {
          ...state,
          ...action.payload.userSection,
        };
      })
      .addCase(budgetReadFromDatabase, (state, action) => {
        console.log('extraReducers - budgetReadFromDatabase = ', action);
        return {
          ...state,
          agreedToPrivacyPolicy: action.payload.user.agreedToPrivacyPolicy,
          agreedToTos: action.payload.user.agreedToTermsOfService,
          agreedToNewsletter: action.payload.user.agreedToNewsletter,
        };
      })
      .addCase(cookieConsentRead, (state, action) => {
        console.log('extraReducers - cookieConsentRead = ', action);
        return {
          ...state,
          cookiesConsent: {
            essential: true,
            statistics: action.payload?.statistics ?? false,
            marketing: action.payload?.marketing ?? false,
          },
          cookieConsentDialog: {
            ...state.cookieConsentDialog,
            open: action.payload === null,
          },
        };
      });
  },
});

export const {
  setNewsletter,
  setPrivacyPolicy,
  setNewsletterPrompt,
  setAgreedToTos,
  setRedirectUrl,
  callbackFinished,
  setCookies,
  setCookieConsentDialog,
} = slice.actions;
export default slice.reducer;
