import React from 'react'
import useForm from '../validation/use-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Name is required'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(values.password)) {
    errors.password = 'At least 6 characters, 1 number, 1 special character'
  }
  if (!values.retypePassword) {
    errors.retypePassword = 'Password is required'
  } else if (values.retypePassword !== values.password) {
    errors.retypePassword = "Password didn't match...try again"
  }
  return errors
}

const Password = () => {
  const { BUSINESS } = ROUTES_PATH_NAME
  const { PASSWORD } = HEADING_TITLE
  const password = () => {
    window.location.href = BUSINESS
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(password, ValidateForm)
  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{PASSWORD}</h1>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} value={values.name || ''} placeholder="Username" required />
                    {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-12">
                    <label htmlFor="inputPassword" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} value={values.password || ''} placeholder="******" required />
                    {errors.password && (
                    <div className="text-danger" >{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-12">
                    <label htmlFor="inputRePassword" className="form-label fw-bold">Re-enter password</label>
                    <input type="password" className="form-control" name="retypePassword" onChange={handleChange} value={values.retypePassword || ''} placeholder="******" required />
                    {errors.retypePassword && (
                    <div className="text-danger">{errors.retypePassword}</div>
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

export default Password
