import {
  SubcategorySection,
  EntityStatus,
  Subcategory,
} from '../../redux/state';
import subcategoryReducer from './slice';
import {
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
  setSubcategoryForm,
  setSubcategoryPromptVisibility,
  enterSubcategoryAmount,
  moveSubcategory,
} from './slice';
import { deleteCategory } from '../manageCategory/slice';

describe('Subcategory reducer', () => {
  it('Should return trimmmed name property when adding new category', () => {
    const initState: SubcategorySection = {
      formValues: {
        id: 'e45c447f-2fab-4b18-97a8-c720ca3ef6bb',
        name: '',
        status: EntityStatus.New,
        amount: null,
        categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
      },
      subcategories: [],
      onlyOneEditAllowedPrompt: false,
    };

    const newCategory: Subcategory = {
      name: '   Candy  ',
      id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
      status: EntityStatus.Saved,
      categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
      amount: null,
    };

    const state = subcategoryReducer(initState, addSubcategory(newCategory));

    expect(state.subcategories[0]).toEqual({
      ...newCategory,
      name: 'Candy',
      status: EntityStatus.Saved,
    });
  });

  it('Should return trimmmed name property when saving existing category', () => {
    const initState: SubcategorySection = {
      formValues: {
        id: 'e45c447f-2fab-4b18-97a8-c720ca3ef6bb',
        name: '',
        status: EntityStatus.New,
        amount: null,
        categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
      },
      subcategories: [
        {
          id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
          name: ' Candy',
          status: EntityStatus.Editing,
          categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
          amount: null,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };

    const changedCategory: Subcategory = {
      name: '   Sweets  ',
      id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
      status: EntityStatus.Saved,
      categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
      amount: null,
    };

    const state = subcategoryReducer(
      initState,
      editSubcategory(changedCategory)
    );

    expect(state.subcategories[0]).toEqual({
      ...changedCategory,
      name: 'Sweets',
      status: EntityStatus.Saved,
    });
  });
  it("Should return subcategories that category wasn't deleted", () => {
    const initState: SubcategorySection = {
      formValues: {
        id: 'e45c447f-2fab-4b18-97a8-c720ca3ef6bb',
        name: '',
        status: EntityStatus.New,
        amount: null,
        categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
      },
      subcategories: [
        {
          id: 'ae1f9c34-6e8e-43a9-a194-68c80bb939fe',
          name: 'Candy',
          status: EntityStatus.Editing,
          categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
          amount: null,
        },
        {
          id: '15f63088-51e9-4b91-881b-d38fe9a9c441',
          name: 'Soda',
          status: EntityStatus.Editing,
          categoryId: '5a42fed2-e58e-498d-81eb-1668caad3fbe',
          amount: null,
        },
        {
          id: 'bc3aa3b3-9c03-47b8-bed1-793e9348ee7a',
          name: 'Internet',
          status: EntityStatus.Editing,
          categoryId: '23a58077-798c-471e-a098-4250378b5827',
          amount: null,
        },
      ],
      onlyOneEditAllowedPrompt: false,
    };

    const deletedCategoryId = '5a42fed2-e58e-498d-81eb-1668caad3fbe';

    const state = subcategoryReducer(
      initState,
      deleteCategory(deletedCategoryId)
    );

    expect(state.subcategories).toHaveLength(1);
    expect(state.subcategories[0]).toEqual({
      id: 'bc3aa3b3-9c03-47b8-bed1-793e9348ee7a',
      name: 'Internet',
      status: EntityStatus.Editing,
      categoryId: '23a58077-798c-471e-a098-4250378b5827',
      amount: null,
    });
  });
});
