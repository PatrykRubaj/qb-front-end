import { RootState } from './reducers';
import { v4 as uuidv4 } from 'uuid';
import { DialogState, EntityStatus } from './state';

export const initialState: RootState = {
  incomeSection: {
    formValues: {
      id: uuidv4(),
      name: '',
      amount: undefined,
      status: EntityStatus.New,
    },
    incomes: [
      {
        id: uuidv4(),
        amount: 1500,
        name: 'Starbucks',
        status: EntityStatus.Saved,
      },
      {
        id: uuidv4(),
        amount: 500,
        name: "McDonald's",
        status: EntityStatus.Saved,
      },
    ],
    onlyOneEditAllowedPrompt: false,
  },
  categoriesSection: {
    formValues: {
      id: uuidv4(),
      name: '',
      status: EntityStatus.New,
    },
    categories: [
      {
        id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        name: 'Food',
        status: EntityStatus.Saved,
      },
      {
        id: '1e987730-c0b1-4850-b06e-7c3612393254',
        name: 'Utilities',
        status: EntityStatus.Saved,
      },
    ],
    onlyOneEditAllowedPrompt: false,
  },
  subcategorySection: {
    formValues: {
      id: uuidv4(),
      categoryId: '',
      name: '',
      status: EntityStatus.New,
      amount: null,
    },
    onlyOneEditAllowedPrompt: false,
    subcategories: [
      {
        id: 'd6fe654c-3976-4e16-8b25-e4c4a03b5e72',
        name: 'Home',
        categoryId: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        amount: null,
        status: EntityStatus.Saved,
      },
      {
        id: 'fb893109-860f-4f04-8319-3cab83812aab',
        name: 'Takeout',
        categoryId: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
        amount: null,
        status: EntityStatus.Saved,
      },
    ],
  },
  country: null,
  month: new Date().getMonth() + 1,
  budgetSection: {
    response: null,
    isLoading: false,
  },
  paymentSection: {
    stripeSessionId: null,
  },
  userSection: {
    agreedToNewsletter: false,
    agreedToPrivacyPolicy: false,
    agreedToTos: false,
    showNewsletterPrompt: false,
    isLoading: false,
    cookieConsentDialog: {
      open: false,
      state: DialogState.BasicInformation,
    },
    cookiesConsent: {
      essential: true,
      statistics: false,
      marketing: false,
    },
    user: {
      userId: '',
      idToken: '',
      accessToken: '',
      email: '',
      emailVerified: false,
      expiresAt: 0,
      givenName: '',
      imageUrl: '',
      permissions: [],
    },
    redirectUrl: '',
  },
};
