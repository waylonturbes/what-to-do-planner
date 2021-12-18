import React, { useState, useEffect } from "react"
import { loginSchema } from "../../../schemas"

const initialFormValues = {
  username: "",
  password: ""
}

export function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [submitDisabled, setSubmitDisabled] = useState(true)

  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
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
    <form>
      <label>
        Username:
        <input
          name="username"
          onChange={handleChange}
          type="text"
          value={formValues.username}
        />
      </label>
      <label>
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
      </button>
    </form>
  )
}

export default LoginForm
