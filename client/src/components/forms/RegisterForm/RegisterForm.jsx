import React, { useEffect, useState } from "react"
import * as yup from "yup"

import registerInitialValues from "./registerInitialValues.json"
import { registerSchema } from "../../../schemas"

function RegisterForm() {
  // State
  const [formValues, setFormValues] = useState(registerInitialValues)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState({
    first_name: false,
    last_name: false,
    username: true,
    email: true,
    password: true
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
          [inputName]: false
        })
      })
      .catch(() => {
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

    <form className="
    d-grid gap-1 col-6 mx-auto position-absolute
     top-50 start-50 translate-middle
    shadow-lg p-5 mb-5 bg-body rounded
    " onSubmit={handleSubmit}>
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
            (formErrors.username !== false)
              ? "form-control is-invalid floatingInputInvalid"
              : "form-control is-valid floatingInput"
          }
          value={formValues.username}
          onChange={handleChange}
        />
        <label className={
          (formErrors.username !== false)
            ? "floatingInputInvalid"
            : "floatingInput"
        }>Username</label>
        <div class="valid-feedback">
          Valid username.
        </div>
      </div>

      <div className="mb-3 form-floating">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={
            (formErrors.email !== false)
              ? "form-control is-invalid floatingInputInvalid"
              : "form-control is-valid floatingInput"
          }
          value={formValues.email}
          onChange={handleChange}
        />
        <label className={
          (formErrors.email !== false)
            ? "floatingInputInvalid"
            : "floatingInput"
        }>Email</label>
        <div class="valid-feedback">
          Valid email.
        </div>
      </div>

      <div className="mb-3 form-floating">
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={
            (formErrors.password !== false)
              ? "form-control is-invalid floatingInputInvalid"
              : "form-control is-valid floatingInput"
          }
          value={formValues.password}
          onChange={handleChange}
        />
        <label className={
          (formErrors.password !== false)
            ? "floatingPasswordInvalid"
            : "floatingPassword"
        }>Password</label>
        <div class="valid-feedback">
          Valid Password.
        </div>
        <div className="invalid-feedback">
          Minimum of 6 characters.
        </div>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          disabled={submitDisabled}
          type="button"
          className={
            (formErrors.password !== false)
              ? "btn p-3 btn-dark opacity-25"
              : "btn p-3 btn-success"
          }
        >
          Register
        </button>
      </div>
    </form>

  )
}

export default RegisterForm
