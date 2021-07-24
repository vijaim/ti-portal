import React from 'react'
import useForm from '../validation/use-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

const SignInForm = () => {
  const handleSignIn = () => {
    window.location.href = HOME
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(handleSignIn, ValidateForm)

  const { HOME } = ROUTES_PATH_NAME
  const { SIGN_UP } = HEADING_TITLE

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
                    <input type="email" className="form-control" name="email" onChange={handleChange} value="xyz@gmail.com" placeholder="Email" required disabled={true} />
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
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default SignInForm
