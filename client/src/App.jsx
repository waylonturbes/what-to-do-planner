import React from "react"
import { Routes, Route } from "react-router-dom"

import { LandingPage, AuthPage } from "./components/pages"

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
