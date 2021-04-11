import React from 'react';
import { useFormik } from 'formik';
import { Income, EntityStatus } from '../../redux/state';
import * as Yup from 'yup';

interface Props {
  addSaveNewIncome: Function;
  initialValues: Income;
  incomeNameInputRef: React.RefObject<HTMLInputElement>;
  incomes: Income[];
}

const IncomeForm = ({
  initialValues,
  addSaveNewIncome,
  incomeNameInputRef,
  incomes,
}: Props) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('Name is required')
      .notOneOf(
        incomes
          .filter((x) => x.status === EntityStatus.Saved)
          .map((x) => x.name),
        'Income name must be unique'
      ),
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .min(0, 'Amount must be >= 0'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      addSaveNewIncome(values);
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
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={incomeNameInputRef}
            type="text"
            className={
              'form-control ' +
              (formik.errors.name && formik.touched.name ? 'is-invalid' : '')
            }
            placeholder="Source"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="col">
          <input
            type="text"
            className={
              'form-control ' +
              (formik.errors.amount && formik.touched.amount
                ? 'is-invalid'
                : '')
            }
            placeholder="Amount"
            name="amount"
            value={formik.values.amount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.amount && formik.touched.amount ? (
            <div className="invalid-feedback">{formik.errors.amount}</div>
          ) : null}
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            {initialValues.status === EntityStatus.Editing ? 'Save' : '+ Add'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default IncomeForm;
