import React, { useEffect } from "react";
import { Category, Subcategory } from "../state";
import { Formik, Form, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import FormikFieldWithErrorMessage from "../../Common/FormikFieldWithErrorMessage";
import { RootState } from "../../Redux/reducers";
import { connect } from "react-redux";

interface Props {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
  enterSubcategoryAmount: Function;
}

interface FormFields {
  subcategories: Subcategory[];
}

const SpendingPredictionComponent: React.FC<Props> = ({
  categories,
  subcategories,
  enterSubcategoryAmount
}: Props) => {
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

  const SaveDataToState = (): null => {
    const { values, errors } = useFormikContext<FormFields>();
    useEffect(() => {
      values.subcategories &&
        values.subcategories.length > 0 &&
        values.subcategories.map((subcategory, subIndex) => {
          if (
            errors.subcategories?.[subIndex] === undefined &&
            subcategory.amount !== null
          ) {
            const stateSubcategory = subcategories.find(
              x => x.id === subcategory.id
            );
            if (stateSubcategory?.amount !== subcategory.amount) {
              enterSubcategoryAmount(subcategory.id, subcategory.amount);
            }
          }

          return null;
        });
    }, [values, errors]);

    return null;
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Spending plan</h2>

        {categories.map(category => {
          const initialValues: FormFields = {
            subcategories: subcategories.filter(
              x => x.categoryId === category.id
            )
          };

          return (
            <Formik
              key={category.id}
              enableReinitialize={true}
              validateOnBlur={true}
              initialValues={initialValues}
              onSubmit={(values): void => {
                console.log("sent ", values);
              }}
              validationSchema={schema}
            >
              {({ values, errors }): JSX.Element => (
                <Form>
                  <h3>{category.name}</h3>
                  <FieldArray name={`subcategories`}>
                    {(): JSX.Element => (
                      <>
                        {values.subcategories.map((subcategory, index) => {
                          return (
                            <div
                              className="form-group"
                              key={`${subcategory.id}`}
                            >
                              <label htmlFor="formGroupExampleInput">{`Subcategory ${subcategory.name}`}</label>
                              <FormikFieldWithErrorMessage
                                name={`subcategories.${index}.amount`}
                                placeholder={`Budget planned for ${subcategory.name}`}
                              />
                              <SaveDataToState />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.categories,
    subcategories: state.subcategories
  };
};

export default connect(mapStateToProps)(SpendingPredictionComponent);
