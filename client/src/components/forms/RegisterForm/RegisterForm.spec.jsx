import React from "react"
import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import RegisterForm from "./RegisterForm"

describe("Registration Form", () => {
  it("renders without errors", () => {
    render(<RegisterForm />)
  })

  it("allows input into all fields", async () => {
    render(<RegisterForm />)
    let firstNameInput = screen.getByPlaceholderText(/first name/i)
    let lastNameInput = screen.getByPlaceholderText(/last name/i)
    let usernameInput = screen.getByPlaceholderText(/username/i)
    let emailInput = screen.getByPlaceholderText(/email/i)
    let passwordInput = screen.getByPlaceholderText(/password/i)

    userEvent.type(firstNameInput, "Ulfric")
    userEvent.type(lastNameInput, "Stormcloak")
    userEvent.type(usernameInput, "ulfric_stormcloak")
    userEvent.type(emailInput, "ustormcloak@windhelm.net")
    userEvent.type(passwordInput, "true_high_king")

    await waitFor(() => { return }) // wait for userEvent to finish

    expect(firstNameInput.value).toBe("Ulfric")
    expect(lastNameInput.value).toBe("Stormcloak")
    expect(usernameInput.value).toBe("ulfric_stormcloak")
    expect(emailInput.value).toBe("ustormcloak@windhelm.net")
    expect(passwordInput.value).toBe("true_high_king")
  })
})
