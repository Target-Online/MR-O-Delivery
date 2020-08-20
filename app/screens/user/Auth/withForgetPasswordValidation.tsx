import { InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

interface IFormValues {
  email: string;
}

type FormProps = {title?: string};

export type WithSignInFormProps = InjectedFormikProps<FormProps, IFormValues> &
  Partial<IFormValues> & {onSignUpDone : () => void | null};

export default (Component:  React.SFC) =>
  withFormik<FormProps, IFormValues>({
    handleSubmit: (values, { setSubmitting, props }) => {
      
    },
    mapPropsToValues: () => ({
      email: '',
    }),
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    })
  })(Component);
