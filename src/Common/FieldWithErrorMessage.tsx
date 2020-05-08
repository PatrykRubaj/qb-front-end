import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string;
  touch: boolean;
  name: string;
}

const FieldWithErrorMessage: React.FC<Props> = (props: Props) => {
  return (
    <>
      <input
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type="text"
        className={
          "form-control " + (props.touch && props.error ? "is-invalid" : "")
        }
        placeholder="Category"
      />
      {props.touch && props.error ? (
        <div className="invalid-feedback">{props.error}</div>
      ) : null}
    </>
  );
};

export default FieldWithErrorMessage;
