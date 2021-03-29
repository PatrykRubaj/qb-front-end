import React from "react";
import { useFormik } from "formik";
import { Category, EntityStatus } from "../../../redux/state";
import * as Yup from "yup";

interface Props {
  newCategory: Category;
  addSaveCategory: Function;
  categoryNameInputRef: React.RefObject<HTMLInputElement>;
  categories: Category[];
}

const CategoryForm = ({
  newCategory,
  addSaveCategory,
  categoryNameInputRef,
  categories,
}: Props) => {
  const initialValues: Category = {
    id: newCategory.id,
    name: newCategory.name,
    status: newCategory.status,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .notOneOf(
        categories
          .filter((x) => x.status === EntityStatus.Saved)
          .map((x) => x.name),
        "Category must be unique"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      addSaveCategory(values);
    },
    enableReinitialize: true,
    validateOnBlur: false,
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
            {newCategory.status === EntityStatus.Editing ? "Save" : "+ Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
