const yup = require("yup")

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("username is required"),
  password: yup
    .string()
    .trim()
    .required("password is required")
})

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
    .required("username is required")
    .min(3, "username must contain at least 3 characters"),
  email: yup
    .string()
    .trim()
    .email("invalid email address")
    .required("email address is required"),
  password: yup
    .string()
    .trim()
    .required("password is required")
    .min(6, "password must contain at least 6 characters")
})

module.exports = {
  loginSchema,
  registerSchema
} 
