import React from "react"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginForm from "./LoginForm"

describe("Login Form", () => {
  it("renders without errors", () => {
    render(<LoginForm />)
  })

  it("displays a username and password field", () => {
    render(<LoginForm />)

    screen.getByLabelText(/username/i)
    screen.getByLabelText(/password/i)
  })

  it("allows user to input a username and password", async () => {
    render(<LoginForm />)
    let usernameInput = screen.getByLabelText(/username/i)
    let passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(usernameInput, "general_tullius")
    userEvent.type(passwordInput, "for_the_empire")

    usernameInput = await screen.findByLabelText(/username/i)
    passwordInput = await screen.findByLabelText(/password/i)
    expect(usernameInput.value).toBe("general_tullius")
    expect(passwordInput.value).toBe("for_the_empire")
  })

  it("allows submission when both fields have input", async () => {
    render(<LoginForm />)
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(usernameInput, "text_to_delete")
    userEvent.type(passwordInput, "more_garbagio")

    const submitButton = await screen.findByText(/submit/i)
    expect(submitButton.disabled).toBe(false)
  })

  it("re-disables submission if field is cleared after previously valid input", async () => {
    render(<LoginForm />)
    let usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(usernameInput, "general_tullius")
    userEvent.type(passwordInput, "for_the_empire")
    usernameInput = await screen.findByLabelText(/username/i)
    userEvent.type(usernameInput, "{selectall}{del}")

    const submitButton = await screen.findByText(/submit/i)
    expect(submitButton.disabled).toBe(true)
  })
})
