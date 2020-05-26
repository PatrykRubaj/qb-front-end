export enum EntityStatus {
  New,
  Saved,
  Editing,
}

export interface Country {
  name: string;
  currency: string;
  emojiU: string;
  key: string;
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
  subcategories: Subcategory[];
  onlyOneEditAllowedPrompt: boolean;
}
