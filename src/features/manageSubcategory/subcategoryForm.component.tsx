import React from 'react';
import { useFormik } from 'formik';
import { Subcategory, Category, EntityStatus } from '../../redux/state';
import * as Yup from 'yup';

interface Props {
  addSaveNewSubcategory: Function;
  newSubcategory: Subcategory;
  categories: Category[];
  subcategoryNameInputRef: React.RefObject<HTMLInputElement>;
  subcategories: Subcategory[];
}

const SubcategoryForm = ({
  newSubcategory,
  addSaveNewSubcategory,
  categories,
  subcategoryNameInputRef,
  subcategories,
}: Props) => {
  const initialValues: Subcategory = {
    id: newSubcategory.id,
    categoryId: newSubcategory.categoryId,
    name: newSubcategory.name,
    amount: newSubcategory.amount,
    status: newSubcategory.status,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('Name is required')
      .notOneOf(
        subcategories
          .filter((x) => x.status !== EntityStatus.Editing)
          .map((x) => x.name),
        'Subcategory must be unique in a category'
      ),
    categoryId: Yup.mixed()
      .oneOf(
        categories.map((x) => x.id),
        "Selected category doesn't exist"
      )
      .required('Select category before adding subcategory'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      addSaveNewSubcategory(values);
    },
    enableReinitialize: true,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fom-row">
        {formik.errors.categoryId && formik.touched.categoryId ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.categoryId}
          </div>
        ) : null}
        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
          Category:{' '}
          {categories.find((x) => x.id === newSubcategory.categoryId)?.name ||
            ''}
        </label>
      </div>
      <div className="form-row">
        <div className="col">
          <input
            type="text"
            className={
              'form-control ' +
              (formik.errors.name && formik.touched.name ? 'is-invalid' : '')
            }
            placeholder="Subcategory"
            name="name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={subcategoryNameInputRef}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            {newSubcategory.status === EntityStatus.Editing ? 'Save' : '+ Add'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubcategoryForm;
