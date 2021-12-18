import React from "react"
import { Link } from "react-router-dom"

export function LandingPage() {
  return (
    <section>
      <h1>What To Do?</h1>
      <h2>Let's Jot It Down</h2>
      <Link to="/auth">
        <button>Get Started</button>
      </Link>
    </section>
  )
}

export default LandingPage
