import * as yup from "yup"

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

export default loginSchema
