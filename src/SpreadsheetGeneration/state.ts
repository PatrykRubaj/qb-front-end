export interface GeneratorState {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  incomes: Array<Income>;
  expectedSpendings: Array<ExpectedSpending>;
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
  amount: number;
}

export interface ExpectedSpending {
  id: string;
  subcategoryId: string;
  amount: number;
}

export const initialState: GeneratorState = {
  categories: [],
  subcategories: [],
  incomes: [],
  expectedSpendings: []
};
