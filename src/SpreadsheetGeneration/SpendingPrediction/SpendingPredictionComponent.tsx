import React from "react";
import { Category, Subcategory } from "../state";
import { Formik, Form, Field, FieldArray } from "formik";
import { render } from "@testing-library/react";
import * as Yup from "yup";

interface Props {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  enterSubcategoryAmount: Function;
}

const SpendingPredictionComponent: React.FC<Props> = ({
  categories,
  subcategories,
  enterSubcategoryAmount
}: Props) => {
  const onInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    subcategory: Subcategory
  ): void => {
    const target = e.currentTarget;
    const value = target.value;
    enterSubcategoryAmount(subcategory.id, +value);
  };

  const schema = Yup.object().shape({
    subcategories: Yup.array()
      .of(
        Yup.object().shape({
          amount: Yup.number()
            .typeError("Amount must be a number")
            .required("Amount is required")
            .min(0, "Amount must be >= 0")
        })
      )
      .required("Must have subcategories") // these constraints are shown if and only if inner constraints are satisfied
  });

  return (
    <div className="row">
      <div className="col">
        <h2>Spending plan</h2>
        {/* <form>
          {categories.map(category => (
            <React.Fragment key={category.id}>
              <h3>{category.name}</h3>
              {subcategories
                .filter(x => x.categoryId === category.id)
                .map(subcategory => (
                  <div className="form-group" key={`${subcategory.id}`}>
                    <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategory.name}`}</label>
                    <input
                      name="amount"
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder={`Subcategory ${subcategory.name}`}
                      onChange={(e): void => onInputChange(e, subcategory)}
                    />
                  </div>
                ))}
            </React.Fragment>
          ))}
        </form> */}

        {categories.map((category, catIndex) => (
          <Formik
            key={category.id}
            enableReinitialize={true}
            isInitialValid={true}
            validateOnBlur={true}
            initialValues={{
              subcategories: subcategories.filter(
                x => x.categoryId === category.id
              )
            }}
            onSubmit={(values): void => {
              console.log("sent ", values);
            }}
            validationSchema={schema}
            render={({ values, errors }) => (
              <Form>
                <h3>{category.name}</h3>
                {console.log(errors)}
                <FieldArray
                  name={`subcategories`}
                  render={arrayHelpers => (
                    <>
                      {values.subcategories.map((subcategory, index) => {
                        console.log("index: ", index, "subcaT:", subcategory);
                        return (
                          <div className="form-group" key={`${subcategory.id}`}>
                            <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategory.name}`}</label>
                            {/* <input
                              name="amount"
                              type="text"
                              className="form-control"
                              placeholder={`Subcategory ${subcategory.name}`}
                              onChange={(e): void =>
                                onInputChange(e, subcategory)
                              }
                            /> */}
                            <Field
                              name={`subcategories.${index}.amount`}
                              className="form-control"
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              </Form>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SpendingPredictionComponent;
