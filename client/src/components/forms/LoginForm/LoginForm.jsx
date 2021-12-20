import React, { useState, useEffect } from "react"
import { loginSchema } from "../../../schemas"
import * as yup from "yup"

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
      className="container-custom d-grid gap-1 mx-auto p-4 mb-5 bg-body"
      onSubmit={handleSubmit}
    >
      {/* <label>
        Username:
        <input
          name="username"
          onChange={handleChange}
          type="text"
          value={formValues.username}
        />
      </label> */}
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
              ? "btn p-2 btn-dark btn-lg opacity-25"
              : "btn p-2 btn-lg btn-success"
          }
        >
          Login
        </button>
      </div>
      {/* <label>
        Password:
        <input
          name="password"
          onChange={handleChange}
          type="password"
          value={formValues.password}
        />
      </label>
      <button disabled={submitDisabled}>
        Submit
      </button> */}
    </form>
  )
}

export default LoginForm
