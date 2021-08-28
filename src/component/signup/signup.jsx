/* eslint-disable no-empty */
import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'
import GoogleSignIn from '../signin/google-signin'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'
import { setEmail, setLoginCookie, setUserId } from '../signin/signin-actions'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie, setCookies } from '../../functions/cookie-functions'

const SignUp = (props) => {
  const { VERIFY_CODE, SIGN_IN, SIGN_UP, BUSINESS, TERMS_OF_USE } = ROUTES_PATH_NAME
  const { SIGN_UP: signup } = HEADING_TITLE
  const { setEmail } = props

  const otpGenerate = () => {
    const payload = {
      email: values.email
    }
    NetworkManager.generateOtp(payload).then(response => {
      if (response.status === 200) {
        setEmail(values.email)
        props.history.push({
          pathname: VERIFY_CODE,
          state: {
            from: SIGN_UP
          }
        })
      }
    })
      .catch(error => {
        if (error.response.data.response_objects === null) {
        }
      })
  }

  const signUp = (googleSignInInfo) => {
    const payload = {
      email: values.email,
      name: values.name
    }
    NetworkManager.signUp(payload).then(response => {
      if (response.status === 200) {
        if (values.type && values.type === 1) {
          const payload = {
            id_token: googleSignInInfo.tokenObj.id_token
          }
          NetworkManager.googleSignIn(payload).then(async response => {
            if (response.status === 200) {
              setEmail(googleSignInInfo.profileObj.email)
              setCookies('trueinsights-cookie', response.data.response_objects.token)
              const loginCookie = getCookie('trueinsights-cookie')
              setLoginCookie(loginCookie)
              setUserId(response.data.response_objects.user_id)
              localStorage.setItem('localLoginCookie', loginCookie)
              localStorage.setItem('userId', response.data.response_objects.user_id)
              props.history.push(BUSINESS)
              window.location.reload()
            }
          })
            .catch(error => {
              toast(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
              })
            })
        } else {
          otpGenerate()
        }
      }
    })
      .catch(error => {
        values.email = ''
        values.name = ''
        if (error.response.data.message === 'You have already signed up. Please try using signin.') {
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      })
  }

  const onGoogleSignPressed = async (googleSignInInfo) => {
    values.email = googleSignInInfo.profileObj.email
    values.name = googleSignInInfo.profileObj.name
    values.type = 1
    signUp(googleSignInInfo)
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({ email: '', name: '' }, validateForm)

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{signup}</h1>
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
                    <input type="text" className="form-control" name="name" maxLength="25" onChange={handleChange} value={values.name || ''} placeholder="Name" required />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <button type="submit" onClick={signUp} className="btn btn-primary d-block mt-20 w-100">Continue</button>
                </form>
                <div className="text-center">
                  <p>Or,</p>
                  <GoogleSignIn btnName={'Sign up with Google'} onGoogleSignPressed={onGoogleSignPressed} />
                  <p>Have an account? <Link to={SIGN_IN}>Sign in</Link></p>
                </div>
                <div className="text-center">
                  By signing up, you agree to <Link to={{ pathname: TERMS_OF_USE }} target="_blank" >terms of use</Link>
                </div>
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
    email: state.signIn.email,
    cookie: state.signIn.cookie
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => {
      dispatch(setEmail(email))
    },
    setLoginCookie: (cookie) => {
      dispatch(setLoginCookie(cookie))
    },
    setUserId: (userId) => {
      dispatch(setUserId(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
