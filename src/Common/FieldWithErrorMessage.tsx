import React from "react";
import { Field, getIn, FieldProps } from "formik";

interface Props {
  name: string;
}

const FieldWithErrorMessage: React.FC<Props> = ({ name }: Props) => {
  return (
    <Field name={name}>
      {({ form, field }: FieldProps): JSX.Element | null => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);

        const inputElement = (
          <input
            name={name}
            value={field.value || ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            type="text"
            className={"form-control " + (touch && error ? "is-invalid" : "")}
            placeholder="Category"
          />
        );

        return (
          <>
            {inputElement}
            {touch && error ? (
              <div className="invalid-feedback">{error}</div>
            ) : null}
          </>
        );
      }}
    </Field>
  );
};

export default FieldWithErrorMessage;
