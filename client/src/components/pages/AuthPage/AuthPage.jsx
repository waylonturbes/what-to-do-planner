import { RegisterForm, LoginForm } from "../../forms"
import { Routes, Route, NavLink } from "react-router-dom"

function AuthPage() {
  return (
    <section className="auth-page">
      <div className="d-lg-flex">
        <nav className="pagination pagination-lg align-items-center justify-content-center my-4">
          <NavLink
            className={({ isActive }) => "page-item page-link" + (isActive ? " page-item active" : "")}
            to="/auth/login"
          >
            Log In
          </NavLink>
          <NavLink
            className={({ isActive }) => "page-item page-link" + (isActive ? " page-item active" : "")}
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
