import React from "react";
import { useFormik } from "formik";
import { Category } from "../state";
import * as Yup from "yup";

interface Props {
  editMode: boolean;
  newCategory: Category;
  addSaveCategory: Function;
  categoryNameInputRef: React.RefObject<HTMLInputElement>;
}

const CategoryForm: React.FC<Props> = ({
  editMode,
  newCategory,
  addSaveCategory,
  categoryNameInputRef
}: Props) => {
  const initialValues: Category = {
    id: newCategory.id,
    name: newCategory.name
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      addSaveCategory(values);
    },
    enableReinitialize: true,
    isInitialValid: true,
    validateOnBlur: false
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-row">
        <div className="col">
          <input
            name="name"
            value={formik.values.name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={categoryNameInputRef}
            type="text"
            className={
              "form-control " +
              (formik.errors.name && formik.touched.name ? "is-invalid" : "")
            }
            placeholder="Category"
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

export default CategoryForm;
