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
  Deleted
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
}

export interface Income {
  id: string;
  name: string;
  amount: number | undefined;
  status: EntityStatus;
}

export const initialState: GeneratorState = {
  categories: [],
  subcategories: [],
  incomes: [],
  locale: null
};
