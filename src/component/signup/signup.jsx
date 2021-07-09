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
  return errors
}

const SignUp = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(signUp, ValidateForm)

  function signUp() {
    window.location.href = ROUTES_PATH_NAME.VERIFY_CODE
  }

  return (
    <div>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">Sign up</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                    {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Continue</button>
                </form>
                <div className="text-center">
                  <p>Or,</p>
                  <GoogleSignIn />
                  <p>Have an account? <Link to={ROUTES_PATH_NAME.SIGN_IN}>Sign in</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignUp
