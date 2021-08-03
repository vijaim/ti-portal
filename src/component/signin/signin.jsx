import React from 'react'
import useForm from '../validation/use-form'
import { HEADING_TITLE, ROUTES_PATH_NAME } from '../../utils/constants'
import { connect } from 'react-redux'
import { setLoginCookie } from './signin-actions'
import { toast, ToastContainer } from 'react-toastify'
import { getCookie, setCookies } from '../../functions/cookie-functions'
import NetworkManager from '../../network-manager/network-config'
import 'react-toastify/dist/ReactToastify.css'

const ValidateForm = (values) => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

const SignIn = (props) => {
  const { setLoginCookie, email } = props
  const { SIGN_IN } = HEADING_TITLE
  const { HOME } = ROUTES_PATH_NAME

  const handleSignIn = () => {
    const payload = {
      email: email,
      password: values.password
    }
    NetworkManager.signIn(payload).then(response => {
      if (response.status === 200) {
        setCookies('trueinsights-cookie', response.data.response_objects.token)
        const loginCookie = getCookie('trueinsights-cookie')
        setLoginCookie(loginCookie)
        props.history.push(HOME)
      }
    })
      .catch(error => {
        console.log(error.response)
        if (error.response.data.response_objects === null) {
          toast('Invalid Login Credentials', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      })
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(handleSignIn, ValidateForm)

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{SIGN_IN}</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={email} placeholder="Email" required disabled={true} />
                    {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-12">
                    <label htmlFor="inputPassword" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} value={values.password || ''} placeholder="*****" required />
                    {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary d-block mt-20 w-100">Sign in</button>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cookie: state.signIn.cookie,
    email: state.signIn.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginCookie: (cookie) => {
      dispatch(setLoginCookie(cookie))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
