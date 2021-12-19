import * as yup from 'yup';

const registerSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim(),
  last_name: yup
    .string()
    .trim(),
  username: yup
    .string()
    .trim()
    .required("Username is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Minimum of 6 characters")
})

export default registerSchema;
