import { RegisterForm, LoginForm } from "../../forms"
import { Routes, Route, NavLink, Navigate } from "react-router-dom"

import authPageStyles from "./authPage.module.css"

function AuthPage() {
  return (
    <section className={authPageStyles.page}>
      <div className={authPageStyles.container}>
        <Routes>
          <Route path="login" element=
            {
              <>
                <LoginForm />
                <p className={authPageStyles.route}>
                  Don't have an account?
                  <NavLink
                    className={authPageStyles.navLink}
                    to="/auth/register"
                  >
                    Register
                  </NavLink>
                </p>
              </>
            } />
          <Route path="register" element=
            {
              <>
                <RegisterForm />
                <p className={authPageStyles.route}>
                  <span>Already have an account?</span>
                  <NavLink
                    className={authPageStyles.navLink}
                    to="/auth/login"
                  >
                    Log In
                  </NavLink>
                </p>
              </>
            } />
          <Route path="/*" element={<Navigate replace to="login" />} />
        </Routes>
      </div>
    </section>
  )
}

export default AuthPage
