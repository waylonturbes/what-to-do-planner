import React, { useEffect, useState } from "react"
import registerInitialValues from "./registerInitialValues.json"
import registerSchema from "../../schemas/register-form-schema"
import * as yup from "yup"

function RegisterForm() {
  // State
  const [formValues, setFormValues] = useState(registerInitialValues)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState(registerInitialValues)

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
        console.log(formErrors)
        setFormErrors({
          ...formErrors,
          [inputName]: false
        })
      })
      .catch(() => {
        console.log(formErrors)
        setFormErrors({
          ...formErrors,
          [inputName]: true
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
    <form className="form--register" onSubmit={handleSubmit}>
      <label className="form__label">
        First Name
        <input
          name="first_name"
          type="text"
          className=""
          value={formValues.first_name}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Last Name
        <input
          name="last_name"
          type="text"
          className=""
          value={formValues.last_name}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Username
        <input
          name="username"
          type="text"
          className={
            (formErrors.username_name !== false)
              ? "form__input form__input--size-medium"
              : "form__input form__input--size-medium form__input--state-error"
          }
          value={formValues.username}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Email
        <input
          name="email"
          type="email"
          className={
            (formErrors.email !== false)
              ? "form__input form__input--size-medium"
              : "form__input form__input--size-medium form__input--state-error"
          }
          value={formValues.email}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Password
        <input
          name="password"
          type="password"
          className={
            (formErrors.password !== false)
              ? "form__input form__input--size-medium"
              : "form__input form__input--size-medium form__input--state-error"
          }
          value={formValues.password}
          onChange={handleChange}
        />
      </label>
      <button disabled={submitDisabled} className={
        (submitDisabled === false)
          ? "button form__button form__button--submit"
          : "button form__button--submit form__button--submit-disabled"
      }>
        Submit</button>
    </form>
  )
}

export default RegisterForm
