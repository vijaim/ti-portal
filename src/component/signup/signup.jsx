import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../validation/use-form'
import GoogleSignIn from '../signin/google-signin'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.name) {
    errors.name = 'Name is required'
  }
  return errors
}

const SignUp = () => {
  const { SIGN_UP_FORM, GENERATE_OTP } = ROUTES_PATH_NAME
  const { SIGN_UP } = HEADING_TITLE
  const signUp = () => {
    window.location.href = SIGN_UP_FORM
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(signUp, ValidateForm)
  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{SIGN_UP}</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                    {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-12">
                    <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} value={values.name || ''} placeholder="Name" required />
                    {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Continue</button>
                </form>
                <div className="text-center">
                  <p>Or,</p>
                  <GoogleSignIn />
                  <p>Have an account? <Link to={GENERATE_OTP}>Sign in</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default SignUp
