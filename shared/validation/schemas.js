import * as yup from 'yup';

export const User = yup.object().shape({
  firstName: yup.string().required('Please enter your first name.'),
  lastName: yup.string().required('Please enter your last name.'),
  email: yup.string().email('Please enter a valid email address.'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const Login = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.'),
  password: yup.string().required('Password is required'),
});
