import React from "react";
import { useFormik } from "formik";
import { Subcategory, Category } from "../state";
import * as Yup from "yup";

interface Props {
  addSaveNewSubcategory: Function;
  editMode: boolean;
  newSubcategory: Subcategory;
  categories: Category[];
  subcategoryNameInputRef: React.RefObject<HTMLInputElement>;
}

const SubcategoryForm: React.FC<Props> = ({
  editMode,
  newSubcategory,
  addSaveNewSubcategory,
  categories,
  subcategoryNameInputRef
}: Props) => {
  const initialValues: Subcategory = {
    id: newSubcategory.id,
    categoryId: newSubcategory.categoryId,
    name: newSubcategory.name,
    amount: newSubcategory.amount
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required"),
    categoryId: Yup.string()
      .trim()
      .required()
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      addSaveNewSubcategory(values);
    },
    enableReinitialize: true,
    isInitialValid: true,
    validateOnBlur: false
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fom-row">
        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
          Category:{" "}
          {categories.filter(x => x.id === newSubcategory.categoryId)[0]
            ?.name || ""}
        </label>
      </div>
      <div className="form-row">
        <div className="col">
          <input
            type="text"
            className={
              "form-control " +
              (formik.errors.name && formik.touched.name ? "is-invalid" : "")
            }
            placeholder="Subcategory"
            name="name"
            value={formik.values.name || ""}
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
            {editMode ? "Save" : "+ Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubcategoryForm;
