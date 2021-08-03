import React from 'react'
import useForm from '../validation/use-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.verifyCode) {
    errors.verifyCode = 'Verification code is required'
  }
  return errors
}

const VerifyCode = (props) => {
  const { PASSWORD } = ROUTES_PATH_NAME
  const { VERIFICATION_CODE } = HEADING_TITLE

  const verifyCode = () => {
    props.history.push(PASSWORD)
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(verifyCode, ValidateForm)

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{VERIFICATION_CODE}</h1>
                <p className="mb-20">We’ve sent a verification code to your email. Enter the code below.</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputVerificationCode" className="form-label fw-bold">Verification code</label>
                    <input type="text" className="form-control" name="verifyCode" onChange={handleChange} value={values.verifyCode || ''} placeholder="******" required />
                    {errors.verifyCode && (
                    <div className="text-danger">{errors.verifyCode}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Continue</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default VerifyCode
