/* eslint-disable no-empty */
import React, { useEffect } from 'react'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'
import { connect } from 'react-redux'
import { setLoginCookie, setPreviousPath, setUserId } from '../signin/signin-actions'
import { toast } from 'react-toastify'
import { getCookie, setCookies } from '../../functions/cookie-functions'
import NetworkManager from '../../network-manager/network-config'
import 'react-toastify/dist/ReactToastify.css'

const VerifyCode = (props) => {
  const { BUSINESS, SIGN_IN, HOME, FAVORITES, VERIFY_CODE } = ROUTES_PATH_NAME
  const { VERIFICATION_CODE } = HEADING_TITLE
  const { setLoginCookie, email, setPreviousPath, setUserId } = props
  const previousPath = props.history.location.state.from
  const prevActionPath = localStorage.getItem('prevActionPath')

  const verificationCode = () => {
    const payload = {
      email: email,
      password: values.code
    }
    NetworkManager.signIn(payload).then(response => {
      if (response.status === 200) {
        setCookies('trueinsights-cookie', response.data.response_objects.token)
        const loginCookie = getCookie('trueinsights-cookie')
        setLoginCookie(loginCookie)
        setUserId(response.data.response_objects.user_id)
        localStorage.setItem('localLoginCookie', loginCookie)
        localStorage.setItem('userId', response.data.response_objects.user_id)
        if (prevActionPath != null && prevActionPath !== VERIFY_CODE && prevActionPath !== SIGN_IN) {
          (prevActionPath.includes(FAVORITES)) ? getBussinessDetails(loginCookie) : props.history.push(prevActionPath)
        } else if (previousPath === SIGN_IN) {
          props.history.push(HOME)
        } else {
          props.history.push(BUSINESS)
        }
      }
    })
      .catch(error => {
        if (error.response.data.message === 'password is required') {
        } else {
          toast('invalid login credentials', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      })
  }

  const getBussinessDetails = (loginCookie) => {
    const payload = {
      cookie: localStorage.getItem('localLoginCookie'),
      appId: prevActionPath.split('/')[2]
    }
    NetworkManager.getBusinessById(payload).then(response => {
      if (response.status === 200) {
        localStorage.setItem('selectedAppsInfo', JSON.stringify(response.data.response_objects))
        setLoginCookie(loginCookie)
        setTimeout(() => props.history.push(prevActionPath), 1000)
      }
    })
      .catch(error => {
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
  } = useForm({ code: '' }, validateForm)

  useEffect(() => {
    setPreviousPath(previousPath)
  }, [])

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
                    <input type="password" className="form-control" name="code" maxLength="5" onChange={handleChange} value={values.code || ''} placeholder="*****" required />
                    {errors.code && (
                    <div className="text-danger">{errors.code}</div>
                    )}
                  </div>
                  <button type="submit" onClick={verificationCode} className="btn btn-primary d-block mt-20 w-100">Continue</button>
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
    },
    setPreviousPath: (path) => {
      dispatch(setPreviousPath(path))
    },
    setUserId: (userId) => {
      dispatch(setUserId(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode)
