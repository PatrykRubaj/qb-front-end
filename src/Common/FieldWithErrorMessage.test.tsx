import * as React from "react";
import FieldWithErrorMessage from "./FieldWithErrorMessage";
import renderer from "react-test-renderer";

describe(`The Field with Error Message component`, () => {
  it(`Should renders successfuly`, () => {
    const name = "email";
    const value = "patryk.pl";
    const onChange = (): void => {};
    const onBlur = (): void => {};
    const touch = true;
    const error = "Invalid email address";

    const tree = renderer
      .create(
        <FieldWithErrorMessage
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          touch={touch}
          error={error}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should have error bootstrap classes applied when input has error and was touched`, () => {
    const name = "email";
    const value = "patryk.pl";
    const onChange = (): void => {};
    const onBlur = (): void => {};
    const touch = true;
    const errorMessage = "Invalid email address";

    const tree = renderer.create(
      <FieldWithErrorMessage
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        touch={touch}
        error={errorMessage}
      />
    );

    const errorDiv = tree.root.findByProps({ className: "invalid-feedback" });
    expect(errorDiv).not.toBeNull();
    expect(errorDiv.children[0]).toEqual(errorMessage);
  });
});
