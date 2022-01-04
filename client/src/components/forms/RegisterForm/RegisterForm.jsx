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
      <label
        for="first_name"
        className=""
      >
        First Name
      </label>
      <input
        name="first_name"
        type="text"
        id="first_name"
        className=""
        placeholder="First Name"
        value={formValues.first_name}
        onChange={handleChange}
      />

      <label
        for="last_name"
        className=""
      >
        Last Name
      </label>
      <input
        name="last_name"
        type="text"
        id="last_name"
        className=""
        placeholder="Last Name"
        value={formValues.last_name}
        onChange={handleChange}
      />

      <label
        for="username"
        className={
          (formErrors.username === "")
            ? "" // valid
            : "" // invalid
        }>
        Username
      </label>
      <input
        name="username"
        type="text"
        id="username"
        placeholder="Username"
        className={
          (formErrors.username === "")
            ? "" // valid
            : "" // invalid
        }
        value={formValues.username}
        onChange={handleChange}
      />
      <p className="">
        Valid username.
      </p>
      <p className="">
        {formErrors.username}
      </p>

      <label for="email" className={
        (formErrors.email === "")
          ? "" // valid
          : "" // invalid
      }>Email</label>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="Email"
        className={
          (formErrors.email === "")
            ? "" // valid
            : "" // invalid
        }
        value={formValues.email}
        onChange={handleChange}
      />
      <p className="">
        Valid email.
      </p>
      <p className="">
        {formErrors.email}
      </p>

      <label for="password" className={
        (formErrors.password === "")
          ? "" // valid
          : "" // invalid
      }>Password</label>
      <input
        name="password"
        type="password"
        id="password"
        placeholder="Password"
        className={
          (formErrors.password === "")
            ? "" // valid
            : "" // invalid
        }
        value={formValues.password}
        onChange={handleChange}
      />
      <p className="">
        Valid Password.
      </p>
      <p className="">
        {formErrors.password}
      </p>

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
    </form>

  )
}

export default RegisterForm
