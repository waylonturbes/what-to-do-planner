import React from "react"
import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/LandingPage"
import AuthPage from "./components/auth/AuthPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
