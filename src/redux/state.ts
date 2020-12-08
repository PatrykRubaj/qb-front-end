export enum EntityStatus {
  New = 0,
  Saved = 1,
  Editing = 2,
}

export enum Route {
  HomePage = "/",
  Generator = "/generator",
  GeneratorResponse = "/generator-response",
  Login = "/login",
  PrivacyPolicy = "/privacy",
  Callback = "/callback",
  Loading = "/loading",
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

export interface User {
  userId: string;
  idToken: string;
  accessToken: string;
  givenName: string;
  imageUrl: string;
  email: string;
  emailVerified: boolean;
  expiresAt: Number;
}

export interface UserSection {
  user: User;
  agreedToNewsletter: boolean;
  agreedToPrivacyPolicy: boolean;
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
  agreedToNewsletter: boolean;
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
}

export interface ReadState {
  incomes: Income[];
  categories: Category[];
  subcategories: Subcategory[];
  country: Country;
}
