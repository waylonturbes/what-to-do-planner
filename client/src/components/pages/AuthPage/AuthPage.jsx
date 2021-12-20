import { RegisterForm, LoginForm } from "../../forms"
import { Routes, Route, NavLink } from "react-router-dom"

function AuthPage() {
  return (
    <section className="d-flex flex-column mx-auto">
      <nav className="btn-group mx-auto mt-4">
        <NavLink
          className={({ isActive }) => "btn btn-lg btn-outline-primary text-center" + (isActive ? " active" : "")}
          to="/auth/login"
        >
          Log In
        </NavLink>
        <NavLink
          className={({ isActive }) => "btn btn-lg btn-outline-primary text-center" + (isActive ? " active" : "")}
          to="/auth/register"
        >
          Register
        </NavLink>
      </nav>
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Routes>
    </section>
  )
}

export default AuthPage
