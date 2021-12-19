import React, { useEffect, useState } from "react"
import * as yup from "yup"

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
      className="container-custom d-grid gap-1 col-xs-6 mx-auto position-absolute top-50 start-50 translate-middle shadow-lg p-4 mb-5 bg-body"
      onSubmit={handleSubmit}
    >
      <h4 className="card-title text-center py-2">Register Form</h4>
      <div className="mb-3 form-floating">
        <input
          name="first_name"
          type="text"
          className="form-control"
          placeholder="First Name"
          value={formValues.first_name}
          onChange={handleChange}
        />
        <label className="floatingInput">First Name</label>
      </div>

      <div className="mb-3 form-floating">
        <input
          name="last_name"
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={formValues.last_name}
          onChange={handleChange}
        />
        <label className="floatingInput">Last Name</label>
      </div>


      <div className="mb-3 form-floating">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className={
            (formErrors.username === "")
              ? "form-control is-valid floatingInput"
              : "form-control is-invalid floatingInputInvalid"
          }
          value={formValues.username}
          onChange={handleChange}
        />
        <label className={
          (formErrors.username === "")
            ? "floatingInput"
            : "floatingInputInvalid"
        }>Username</label>
        <div className="valid-feedback">
          Valid username.
        </div>
        <div className="invalid-feedback">
          {formErrors.username}
        </div>
      </div>

      <div className="mb-3 form-floating">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={
            (formErrors.email === "")
              ? "form-control is-valid floatingInput"
              : "form-control is-invalid floatingInputInvalid"
          }
          value={formValues.email}
          onChange={handleChange}
        />
        <label className={
          (formErrors.email === "")
            ? "floatingInput"
            : "floatingInputInvalid"
        }>Email</label>
        <div className="valid-feedback">
          Valid email.
        </div>
        <div className="invalid-feedback">
          {formErrors.email}
        </div>
      </div>

      <div className="mb-3 form-floating">
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={
            (formErrors.password === "")
              ? "form-control is-valid floatingInput"
              : "form-control is-invalid floatingInputInvalid"
          }
          value={formValues.password}
          onChange={handleChange}
        />
        <label className={
          (formErrors.password === "")
            ? "floatingPassword"
            : "floatingPasswordInvalid"
        }>Password</label>
        <div className="valid-feedback">
          Valid Password.
        </div>
        <div className="invalid-feedback">
          {formErrors.password}
        </div>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          disabled={submitDisabled}
          type="button"
          className={
            (submitDisabled === true)
              ? "btn p-2 btn-dark btn-sm opacity-25"
              : "btn p-2 btn-success btn-sm"
          }
        >
          Register
        </button>
      </div>
    </form>

  )
}

export default RegisterForm
