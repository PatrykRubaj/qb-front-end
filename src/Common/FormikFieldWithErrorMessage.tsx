import React from "react";
import { Field, getIn, FieldProps } from "formik";
import FieldWithErrorMessage from "./FieldWithErrorMessage";

interface Props {
  name: string;
}

const FormikFieldWithErrorMessage: React.FC<Props> = ({ name }: Props) => {
  return (
    <Field name={name}>
      {({ form, field }: FieldProps): JSX.Element | null => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);

        return (
          <FieldWithErrorMessage
            name={name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            touch={touch}
            error={error}
          />
        );
      }}
    </Field>
  );
};

export default FormikFieldWithErrorMessage;
