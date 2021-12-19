import { RegisterForm, LoginForm } from "../../forms"
import { Routes, Route, NavLink } from "react-router-dom"

function AuthPage() {
  return (
    <section className="">
      <div>
        <nav className="pagination pagination-lg">
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
      </div>
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Routes>
    </section>
  )
}

export default AuthPage
