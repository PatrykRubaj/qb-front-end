import { Country } from "../SpreadsheetGeneration/LocaleSelector/Country";

export interface GeneratorState {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  incomes: Array<Income>;
  locale: Country | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  amount: number | null;
}

export interface Income {
  id: string;
  name: string;
  amount: number | undefined;
}

export const initialState: GeneratorState = {
  categories: [],
  subcategories: [],
  incomes: [],
  locale: null
};
