import React, { useEffect } from 'react';
import { Category, Subcategory } from '../../../redux/state';
import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import FormikFieldWithErrorMessage from '../../common/FormikFieldWithErrorMessage';
import { RootState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import subcategoryActions from '../../../redux/actions/subcategoryActions';
import * as subcategoryTypes from '../../../redux/types/subcategoryTypes';

interface DispatchProps {
  enterSubcategoryAmount: (id: string, amount: number) => void;
}

interface StateProps {
  categories: Array<Category>;
  subcategories: Array<Subcategory>;
}

type Props = DispatchProps & StateProps;

interface FormFields {
  subcategories: Subcategory[];
}

const SpendingPredictionComponent = ({
  categories,
  subcategories,
  enterSubcategoryAmount,
}: Props) => {
  const schema = Yup.object().shape({
    subcategories: Yup.array()
      .of(
        Yup.object().shape({
          amount: Yup.number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .min(0, 'Amount must be >= 0'),
        })
      )
      .required('Must have subcategories'), // these constraints are shown if and only if inner constraints are satisfied
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
              (x) => x.id === subcategory.id
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

        {categories.map((category) => {
          const initialValues: FormFields = {
            subcategories: subcategories.filter(
              (x) => x.categoryId === category.id
            ),
          };

          return (
            <Formik
              key={category.id}
              enableReinitialize={true}
              validateOnBlur={true}
              initialValues={initialValues}
              onSubmit={(values): void => {
                console.log('sent ', values);
              }}
              validationSchema={schema}
            >
              {({ values, errors }): JSX.Element => (
                <Form>
                  <h3>{category.name}</h3>
                  <FieldArray name={`subcategories`}>
                    {(): JSX.Element => (
                      <>
                        {values.subcategories.length > 0 ? (
                          values.subcategories.map((subcategory, index) => {
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
                          })
                        ) : (
                          <div className="alert alert-secondary" role="alert">
                            You didn&apos;t add any subcategories to{' '}
                            {category.name}
                          </div>
                        )}
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    categories: state.categoriesSection.categories,
    subcategories: state.subcategorySection.subcategories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    enterSubcategoryAmount: (
      subcategoryId: string,
      amount: number
    ): subcategoryTypes.SubcategoryActionTypes =>
      dispatch(
        subcategoryActions.enterSubcategoryAmount(subcategoryId, amount)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingPredictionComponent);
