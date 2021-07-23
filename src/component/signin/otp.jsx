import React from 'react'
import useForm from '../validation/use-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  return errors
}

const Otp = () => {
  const { SIGN_IN } = ROUTES_PATH_NAME
  const { SIGN_IN: SignIn } = HEADING_TITLE
  const otp = () => {
    window.location.href = SIGN_IN
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(otp, ValidateForm)
  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{SignIn}</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                    {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Get OTP</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Otp
