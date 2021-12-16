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
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(6)
})

export default registerSchema;
