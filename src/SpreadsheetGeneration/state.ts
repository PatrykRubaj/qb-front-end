import { Country } from "../SpreadsheetGeneration/LocaleSelector/Country";

export interface GeneratorState {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  incomes: Array<Income>;
  locale: Country | null;
}

export enum EntityStatus {
  New,
  Saved,
  Editing,
  Deleted,
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

export const initialState: GeneratorState = {
  categories: [],
  subcategories: [],
  incomes: [],
  locale: null,
};
