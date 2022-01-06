import React, { useEffect, useState } from "react"
import * as yup from "yup"

import registerStyles from "./registerForm.module.css"

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
      className={registerStyles.form}
      onSubmit={handleSubmit}
    >
      <h3 className={registerStyles.formTitle}>Register</h3>

      <div className={registerStyles.formItem}>
        <div className={registerStyles.inputContainer}>
          <div className={registerStyles.inputAndSubtitle}>
            <input
              name="first_name"
              type="text"
              id="name"
              className={`${registerStyles.input} + ${registerStyles.smallInput}`}
              value={formValues.first_name}
              onChange={handleChange}
            />
            <label
              for="first_name"
              className={registerStyles.subtitle}
            >
              First Name
            </label>
          </div>
          <div className={registerStyles.inputAndSubtitle}>
            <input
              name="last_name"
              type="text"
              id="last_name"
              className={`${registerStyles.input} + ${registerStyles.smallInput}`}
              value={formValues.last_name}
              onChange={handleChange}
            />
            <label
              for="last_name"
              className={registerStyles.subtitle}
            >
              Last Name
            </label>
          </div>
        </div>
      </div>

      <div className={registerStyles.formItem}>
        <div className={registerStyles.inputContainer}>
          <label for="username" className={registerStyles.label}>Username</label>
          <div className={registerStyles.inputAndSubtitle}>
            <input
              name="username"
              type="text"
              id="username"
              className={
                (formErrors.username === "")
                  ? `${registerStyles.input}` + ` ${registerStyles.validInput}` // valid
                  : `${registerStyles.input}` + ` ${registerStyles.invalidInput}` // invalid
              }
              value={formValues.username}
              onChange={handleChange}
            />
            {
              (formErrors.username === "")
                ? <p className={`${registerStyles.subtitle}` + ` ${registerStyles.validSubtitle}`}>Valid username.</p>
                : <p className={`${registerStyles.subtitle}` + ` ${registerStyles.invalidSubtitle}`}>{formErrors.username}</p>
            }
          </div>
        </div>
      </div>

      <div className={registerStyles.formItem}>
        <div className={registerStyles.inputContainer}>
          <label for="email" className={registerStyles.label}>Email</label>
          <div className={registerStyles.inputAndSubtitle}>
            <input
              name="email"
              type="text"
              id="email"
              className={
                (formErrors.email === "")
                  ? `${registerStyles.input}` + ` ${registerStyles.validInput}` // valid
                  : `${registerStyles.input}` + ` ${registerStyles.invalidInput}` // invalid
              }
              value={formValues.email}
              onChange={handleChange}
            />
            {
              (formErrors.email === "")
                ? <p className={`${registerStyles.subtitle}` + ` ${registerStyles.validSubtitle}`}>Valid email.</p>
                : <p className={`${registerStyles.subtitle}` + ` ${registerStyles.invalidSubtitle}`}>{formErrors.email}</p>
            }
          </div>
        </div>
      </div>

      <div className={registerStyles.formItem}>
        <div className={registerStyles.inputContainer}>
          <label for="password" className={registerStyles.label}>Password</label>
          <div className={registerStyles.inputAndSubtitle}>
            <input
              name="password"
              type="text"
              id="password"
              className={
                (formErrors.password === "")
                  ? `${registerStyles.input}` + ` ${registerStyles.validInput}` // valid
                  : `${registerStyles.input}` + ` ${registerStyles.invalidInput}` // invalid
              }
              value={formValues.password}
              onChange={handleChange}
            />
            {
              (formErrors.password === "")
                ? <p className={`${registerStyles.subtitle}` + ` ${registerStyles.validSubtitle}`}>Valid password.</p>
                : <p className={`${registerStyles.subtitle}` + ` ${registerStyles.invalidSubtitle}`}>{formErrors.password}</p>
            }
          </div>
        </div>
      </div>

      <div className={registerStyles.formItem}>
        <button
          disabled={submitDisabled}
          type="submit"
          className={
            (submitDisabled === true)
              ? "" // disabled
              : "" // enabled
          }
        >
          Register
        </button>
      </div>
    </form>

  )
}

export default RegisterForm
