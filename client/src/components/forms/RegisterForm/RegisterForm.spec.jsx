import React from "react"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { RegisterForm } from "./RegisterForm"

describe("Registration Form", () => {
  it("renders without errors", () => {
    render(<RegisterForm />)
  })

  it("allows input into all fields", async () => {
    render(<RegisterForm />)
    let firstNameInput = screen.getByLabelText(/first name/i)
    let lastNameInput = screen.getByLabelText(/last name/i)
    let usernameInput = screen.getByLabelText(/username/i)
    let emailInput = screen.getByLabelText(/email/i)
    let passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(firstNameInput, "Ulfric")
    userEvent.type(lastNameInput, "Stormcloak")
    userEvent.type(usernameInput, "ulfric_stormcloak")
    userEvent.type(emailInput, "ustormcloak@windhelm.net")
    userEvent.type(passwordInput, "true_high_king")

    firstNameInput = await screen.findByLabelText(/first name/i)
    lastNameInput = await screen.findByLabelText(/last name/i)
    usernameInput = await screen.findByLabelText(/username/i)
    emailInput = await screen.findByLabelText(/email/i)
    passwordInput = await screen.findByLabelText(/password/i)
    expect(firstNameInput.value).toBe("Ulfric")
    expect(lastNameInput.value).toBe("Stormcloak")
    expect(usernameInput.value).toBe("ulfric_stormcloak")
    expect(emailInput.value).toBe("ustormcloak@windhelm.net")
    expect(passwordInput.value).toBe("true_high_king")
  })
})
