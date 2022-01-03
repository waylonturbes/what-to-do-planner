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
      className=""
      onSubmit={handleSubmit}
    >
      <label for="username" className={
        (formErrors.username === "")
          ? "" // valid
          : "" // invalid
      }>Username</label>
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
        Login
      </button>
    </form>
  )
}

export default LoginForm
