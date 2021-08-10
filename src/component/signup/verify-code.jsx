import React, { useEffect } from 'react'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'
import { ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'
import { connect } from 'react-redux'
import { setLoginCookie, setPreviousPath } from '../signin/signin-actions'
import { toast } from 'react-toastify'
import { getCookie, setCookies } from '../../functions/cookie-functions'
import NetworkManager from '../../network-manager/network-config'
import 'react-toastify/dist/ReactToastify.css'

const VerifyCode = (props) => {
  const { HOME } = ROUTES_PATH_NAME
  const { VERIFICATION_CODE } = HEADING_TITLE
  const { setLoginCookie, email, setPreviousPath } = props

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
        props.history.push(HOME)
      }
    })
      .catch(error => {
        if (error.response.data.message === 'password is not allowed to be empty') {
          console.log(error)
        } else if (error.response.data.message === 'password length must be less than or equal to 5 characters long') {
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        } else {
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
  } = useForm({ code: '' }, validateForm)

  useEffect(() => {
    const previousPath = props.history.location.state.from
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
                    <input type="password" className="form-control" name="code" onChange={handleChange} value={values.code || ''} placeholder="*****" required />
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode)
