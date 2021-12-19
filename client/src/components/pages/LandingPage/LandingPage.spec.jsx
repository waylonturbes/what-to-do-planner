import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import LandingPage from "./LandingPage"

describe("Landing Page", () => {
  it("renders without errors", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    )
  })

  it("routes to /auth when 'get started' is clicked", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    )

    const getStartedButton = screen.getByText(/get started/i)
    userEvent.click(getStartedButton)

    expect(window.location.pathname).toMatch(/auth/i)
  })
})
