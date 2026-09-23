import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('invalidEmail').required('requiredEmail'),
  password: yup.string().required('requiredPassword'),
});

export const registerSchema = yup.object({
  fullName: yup.string().required('reqiredFullName'),
  email: yup.string().email('invalidEmail').required('requiredEmail'),
  password: yup.string().required('requiredPassword'),
  confirmPassword: yup
    .string()
    .required('requiredConfirmPassword')
    .oneOf([yup.ref('password')], 'matchPass'),
});