import React, { useState, useEffect } from "react"
import { loginSchema } from "../../../schemas"
import * as yup from "yup"
import authFormStyles from "../authForm.module.css"

const initialFormValues = {
  username: "",
  password: ""
}

function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState({
    "username": "Username is required",
    "password": "Password is required"
  })

  function handleChange(e) {
    validate(e.target.name, e.target.value)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    /*
    const registerPayload = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    }

    Axios call to DB would go here

    */
    setFormValues(initialFormValues)
  }

  // Validation
  function validate(inputName, inputValue) {
    yup.reach(loginSchema, inputName)
      .validate(inputValue)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [inputName]: ""
        })
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [inputName]: err.errors[0]
        })
      })
  }

  useEffect(() => {
    loginSchema
      .isValid(formValues)
      .then(valid => {
        if (valid) {
          setSubmitDisabled(false)
        } else {
          setSubmitDisabled(true)
        }
      })
  }, [formValues])

  return (
    <form
      className={authFormStyles.form}
      onSubmit={handleSubmit}
    >

      <h2 className={authFormStyles.formTitle}>Login</h2>

      <div className={authFormStyles.formItem}>
        <div className={authFormStyles.inputContainer}>
          <label for="username" className={authFormStyles.label}>Username</label>
          <div className={authFormStyles.inputAndSubtitle}>
            <input
              name="username"
              type="text"
              id="username"
              className={
                (formErrors.username === "")
                  ? `${authFormStyles.input} ${authFormStyles.validInput}` // valid
                  : `${authFormStyles.input} ${authFormStyles.invalidInput}` // invalid
              }
              value={formValues.username}
              onChange={handleChange}
            />
            {
              (formErrors.username !== "")
              && <p className={`${authFormStyles.subtitle} ${authFormStyles.invalidSubtitle}`}>{formErrors.username}</p>
            }
          </div>
        </div>
      </div>

      <div className={authFormStyles.formItem}>
        <div className={authFormStyles.inputContainer}>
          <label for="password" className={authFormStyles.label}>Password</label>
          <div className={authFormStyles.inputAndSubtitle}>
            <input
              name="password"
              type="text"
              id="password"
              className={
                (formErrors.password === "")
                  ? `${authFormStyles.input} ${authFormStyles.validInput}` // valid
                  : `${authFormStyles.input} ${authFormStyles.invalidInput}` // invalid
              }
              value={formValues.password}
              onChange={handleChange}
            />
            {
              (formErrors.password !== "")
              && <p className={`${authFormStyles.subtitle} ${authFormStyles.invalidSubtitle}`}>{formErrors.password}</p>
            }
          </div>
        </div>
      </div>

      <div className={authFormStyles.formItem}>
        <button
          disabled={submitDisabled}
          type="submit"
          className={
            (submitDisabled === true)
              ? `${authFormStyles.button} ${authFormStyles.disabledButton}` // disabled
              : `${authFormStyles.button} ${authFormStyles.enabledButton}` // enabled
          }
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
