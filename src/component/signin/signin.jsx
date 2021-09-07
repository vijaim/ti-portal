/* eslint-disable no-empty */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME, HEADING_TITLE, UTM_SOURCE_WORDPRESS } from '../../utils/constants'
import GoogleSignIn from './google-signin'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'
import { connect } from 'react-redux'
import { setEmail, setLoginCookie, setUserId } from './signin-actions'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie, setCookies } from '../../functions/cookie-functions'
import { GetRoutesPathName } from '../../utils/util-methods'

const SignIn = (props) => {
  const { VERIFY_CODE, SIGN_UP, SIGN_IN, HOME, FAVORITES, BUSINESS } = ROUTES_PATH_NAME
  const { SIGN_IN: signin } = HEADING_TITLE
  const { setEmail, cookie, setLoginCookie, setUserId } = props
  const routePath = GetRoutesPathName()

  useEffect(() => {
    if (getCookie('trueinsights-cookie')) {
      if (localStorage.getItem('prevPath')) {
        props.history.push(localStorage.getItem('prevPath'))
      } else {
        props.history.push(HOME)
      }
    }
    if (routePath.includes(UTM_SOURCE_WORDPRESS)) {
      values.email = routePath.split('&')[1].split('=')[1]
    }
  }, [cookie])

  const otpGenerate = () => {
    if (!routePath.includes(UTM_SOURCE_WORDPRESS)) {
      localStorage.setItem('prevActionPath', window.location.pathname)
    }
    const payload = {
      email: values.email
    }
    NetworkManager.generateOtp(payload).then(response => {
      if (response.status === 200) {
        setEmail(values.email)
        props.history.push({
          pathname: VERIFY_CODE,
          state: {
            from: SIGN_IN
          }
        })
      }
    })
      .catch(error => {
        if (error.response.data.message === 'email is required') {
        } else if (error.response.data.message === 'Incorrect email.') {
        } else {
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      })
  }

  const onGoogleSignPressed = (googleSignInInfo) => {
    localStorage.setItem('prevActionPath', window.location.pathname)
    const prevActionPath = localStorage.getItem('prevActionPath')
    if (!googleSignInInfo.error) {
      const payload = {
        id_token: googleSignInInfo.tokenObj.id_token
      }
      NetworkManager.googleSignIn(payload).then(async response => {
        if (response.status === 200) {
          setEmail(googleSignInInfo.profileObj.email)
          setCookies('trueinsights-cookie', response.data.response_objects.token)
          const loginCookie = getCookie('trueinsights-cookie')
          localStorage.setItem('localLoginCookie', loginCookie)
          setUserId(response.data.response_objects.user_id)
          localStorage.setItem('userId', response.data.response_objects.user_id)
          if (!response.data.response_objects.is_new_user) {
            if (prevActionPath !== SIGN_IN) {
              if (prevActionPath.includes(FAVORITES)) {
                getBussinessDetails(loginCookie)
              } else {
                setLoginCookie(loginCookie)
                props.history.push(prevActionPath)
              }
            } else {
              setLoginCookie(loginCookie)
              props.history.push(prevActionPath)
            }
          } else {
            setLoginCookie(loginCookie)
            props.history.push(BUSINESS)
          }
        }
      })
        .catch(error => {
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        })
    } else {
      if (googleSignInInfo.error !== 'popup_closed_by_user') {
        toast(googleSignInInfo.error, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  }

  const getBussinessDetails = (loginCookie) => {
    const prevActionPath = localStorage.getItem('prevActionPath')
    const payload = {
      cookie: localStorage.getItem('localLoginCookie'),
      appId: prevActionPath.split('/')[2]
    }
    NetworkManager.getBusinessById(payload).then(response => {
      if (response.status === 200) {
        localStorage.setItem('selectedAppsInfo', JSON.stringify(response.data.response_objects))
        setLoginCookie(loginCookie)
        props.history.push(prevActionPath)
      }
    })
      .catch(error => {
        setLoginCookie(loginCookie)
        props.history.push(HOME)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({ email: '' }, validateForm)

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">{signin}</h1>
                <form className="mb-40" onSubmit={handleSubmit} noValidate>
                  <div className="mb-12">
                    <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <button type="submit" onClick={otpGenerate} className="btn btn-primary d-block mt-20 w-100">Continue</button>
                </form>
                {!routePath.includes(UTM_SOURCE_WORDPRESS) && <div className="text-center">
                  <p>Or,</p>
                  <GoogleSignIn btnName={'Sign in with Google'} onGoogleSignPressed={onGoogleSignPressed} />
                  <p>Create an account?
                    <Link to={SIGN_UP}> Sign up</Link>
                    {/* <Link to={'businesses/20/all'}> click</Link> */}
                  </p>
                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
