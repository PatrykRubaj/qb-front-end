export enum EntityStatus {
  New = 0,
  Saved = 1,
  Editing = 2,
}

export enum Route {
  HomePage = '/',
  Generator = '/generator',
  GeneratorResponse = '/generator-response',
  Login = '/login',
  Logout = '/logout',
  PrivacyPolicy = '/privacy',
  TermsOfService = '/terms-of-service',
  Callback = '/callback',
  Loading = '/loading',
  MessangerBot = 'https://m.me/1PatrickDaniel?ref=w14091837',
  RedirectToBillingPortal = '/billing-portal',
  PaymentCanceled = '/payment-canceled',
  PaymentSuccessful = '/payment-successful',
}

export enum PriceTier {
  Basic = 'basic',
  Premium = 'premium',
  Pro = 'pro',
}

export interface Country {
  name: string;
  currency: string;
  emojiU: string;
  key: string;
  language: string;
}

export interface Category {
  id: string;
  name: string;
  status: EntityStatus;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  amount: number | null;
  status: EntityStatus;
}

export interface Income {
  id: string;
  name: string;
  amount: number | undefined;
  status: EntityStatus;
}

export interface IncomeSection {
  formValues: Income;
  incomes: Income[];
  onlyOneEditAllowedPrompt: boolean;
}

export interface CategorySection {
  formValues: Category;
  categories: Category[];
  onlyOneEditAllowedPrompt: boolean;
}

export interface SubcategorySection {
  formValues: Subcategory;
  onlyOneEditAllowedPrompt: boolean;
  subcategories: Subcategory[];
}

export enum Permission {
  ReadBudget = 'budget:read',
  WriteBudget = 'budget:write',
  GenerateBudget = 'budget:generate',
}

export interface User {
  userId: string;
  idToken: string;
  accessToken: string;
  givenName: string;
  imageUrl: string;
  email: string;
  emailVerified: boolean;
  expiresAt: number;
  permissions: Permission[];
}

export interface UserSection {
  user: User;
  agreedToNewsletter: boolean | null;
  agreedToPrivacyPolicy: boolean | null;
  agreedToTos: boolean | null;
  showNewsletterPrompt: boolean;
  isLoading: boolean;
  redirectUrl: string;
}

export interface BudgetToGenerate {
  country: Country;
  incomes: Array<Income>;
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  month: string;
  user: UserInDatabase;
}

export interface BudgetResponse {
  spreadsheetUrl?: string;
  errors?: ErrorResponse;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface BudgetSection {
  response: BudgetResponse | null;
  isLoading: boolean;
}

export interface UserInDatabase {
  agreedToNewsletter: boolean;
  agreedToPrivacyPolicy: boolean;
  agreedToTermsOfService: boolean;
}

export interface ReadState {
  incomes: Income[];
  categories: Category[];
  subcategories: Subcategory[];
  country: Country;
  user: UserInDatabase;
}

export interface PaymentSection {
  stripeSessionId: string;
}

export interface PaymentErrorMessage {
  message: string;
}

export interface PaymentErrorResponse {
  errorMessage: PaymentErrorMessage;
}

export interface PaymentSessionResponse {
  sessionId: string;
}
