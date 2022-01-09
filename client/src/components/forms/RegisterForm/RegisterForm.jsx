import React, { useEffect, useState } from "react"
import * as yup from "yup"

import authFormStyles from "../authForm.module.css"

import registerInitialValues from "./registerInitialValues.json"
import { registerSchema } from "../../../schemas"

function RegisterForm() {
  // State
  const [formValues, setFormValues] = useState(registerInitialValues)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState({
    "first_name": "",
    "last_name": "",
    "username": "Username is required",
    "email": "Email address is required",
    "password": "Password is required"
  })

  // Event Handlers
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
    setFormValues(registerInitialValues)
  }

  // Validation
  function validate(inputName, inputValue) {
    yup.reach(registerSchema, inputName)
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
    registerSchema
      .isValid(formValues)
      .then(function (valid) {
        setSubmitDisabled(!valid)
      })
  }, [formValues])

  return (
    <form
      className={authFormStyles.form}
      onSubmit={handleSubmit}
    >
      <h2 className={authFormStyles.formTitle}>Register</h2>

      <div className={authFormStyles.formItem}>
        <div className={authFormStyles.inputContainer}>
          <label
            for="first_name"
            className={authFormStyles.label}
          >
            First Name
          </label>
          <div className={authFormStyles.inputAndSubtitle}>
            <input
              name="first_name"
              type="text"
              id="name"
              className={authFormStyles.input}
              value={formValues.first_name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className={authFormStyles.formItem}>
        <div className={authFormStyles.inputContainer}>
          <label
            for="last_name"
            className={authFormStyles.label}
          >
            Last Name
          </label>
          <div className={authFormStyles.inputAndSubtitle}>
            <input
              name="last_name"
              type="text"
              id="last_name"
              className={authFormStyles.input}
              value={formValues.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

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
          <label for="email" className={authFormStyles.label}>Email</label>
          <div className={authFormStyles.inputAndSubtitle}>
            <input
              name="email"
              type="text"
              id="email"
              className={
                (formErrors.email === "")
                  ? `${authFormStyles.input} ${authFormStyles.validInput}` // valid
                  : `${authFormStyles.input} ${authFormStyles.invalidInput}` // invalid
              }
              value={formValues.email}
              onChange={handleChange}
            />
            {
              (formErrors.email !== "")
              && <p className={`${authFormStyles.subtitle} ${authFormStyles.invalidSubtitle}`}>{formErrors.email}</p>
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
          Register
        </button>
      </div>
    </form>

  )
}

export default RegisterForm
