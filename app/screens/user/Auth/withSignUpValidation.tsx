import { InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import firebase from 'firebase'

interface IFormValues {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
}

type FormProps = {title?: string};

export type WithSignUpFormProps = InjectedFormikProps<FormProps, IFormValues> &
  Partial<IFormValues> & {onSignUpDone : () => void | null};

export default (Component: React.ComponentType) =>
  withFormik<FormProps, IFormValues>({
    handleSubmit: (values) => {

      firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((res) => console.log({res}))
      .catch(err => console.log({err}))
    },
    mapPropsToValues: () => ({
      agreeTerms: false,
      firstname: '',
      lastname: '',
      mobile: '',
      newsletter: false,
      email: '',
      password: '',
      passwordConfirm: '',
    }),
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      agreeTerms: Yup.boolean().oneOf(
        [true],
        'Please accept the terms and conditions'
      ),
      newsletter: Yup.boolean(),
      firstname: Yup.string().required('Please enter your first name'),
      lastname: Yup.string().required('Please enter your last name'),
      mobile: Yup.string()
        .min(9, 'Please enter a valid number')
        .max(11, 'Please enter a valid number')
        .required('Please enter your number'),
      email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Please enter your email address.'),
      id_no: Yup.string()
        .min(13, 'Please enter a valid  ID number.')
        .max(13, 'Please enter a valid ID number.'),
      // .required('Please complete the following fields'),
      password: Yup.string().required("Password is required"),
     passwordConfirm: Yup.string().required("Please confirm your password.")
     .oneOf([Yup.ref('password'), undefined], 'Passwords must match.')
    })
  })(Component);
