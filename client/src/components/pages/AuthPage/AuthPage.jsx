import { RegisterForm, LoginForm } from "../../forms"
import { Routes, Route, NavLink } from "react-router-dom"

import authPageStyles from "./authPage.module.css"

function AuthPage() {
  return (
    <section className={authPageStyles.page}>
      <div className={authPageStyles.container}>
        <nav className="">
          <NavLink
            className={({ isActive }) => "" + (isActive ? " " : "")}
            to="/auth/login"
          >
            Log In
          </NavLink>
          <NavLink
            className={({ isActive }) => "" + (isActive ? " " : "")}
            to="/auth/register"
          >
            Register
          </NavLink>
        </nav>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Routes>
      </div>
    </section>
  )
}

export default AuthPage
