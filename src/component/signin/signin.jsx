import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../validation/use-form'
import GoogleSignIn from '../signin/google-signin'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const ValidateForm = (values) => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

const SignIn = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(handleSignIn, ValidateForm)

  function handleSignIn() {
    window.location.href = ROUTES_PATH_NAME.HOME
  }

  return (
    <div>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">Sign in</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                    {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-12">
                    <label htmlFor="inputPassword" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} value={values.password || ''} placeholder="******" required />
                    {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Sign in</button>
                </form>
                <div className="text-center">
                  <p>Or,</p>
                  <GoogleSignIn />
                  <p>Create account? <Link to={ROUTES_PATH_NAME.SIGN_UP}>Sign up</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignIn
