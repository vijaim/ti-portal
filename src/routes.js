/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import SignUp from './component/signup/signup'
import VerifyCode from './component/signup/verify-code'
import Password from './component/signup/password'
import Business from './component/signup/business'
import TrackCode from './component/signup/track-code'
import InSightsBusiness from './component/insights/insights-business'
import Favorites from './component/insights/favorites'
import Sales from './component/insights/sales'
import Tracking from './component/insights/tracking'
import SettingsBusiness from './component/settings/settings-business'
import SettingsProfile from './component/settings/settings-profile'
import Header from './component/header/header'
import SignIn from './component/signin/signin'
import { connect } from 'react-redux'
import { ROUTES_PATH_NAME } from './utils/constants'
import { history } from './utils/util-methods'
import { getCookie } from './functions/cookie-functions'
import { ToastContainer } from 'react-toastify'

const Routes = (props) => {
  const {
    SIGN_UP, VERIFY_CODE, PASSWORD, BUSINESS, TRACK_CODE, HOME, FAVORITES, SALES,
    TRACKING, SETTINGS_BUSINESS, SETTINGS_PROFILE, SIGN_IN
  } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    isLoggedIn: false
  })
  const { isLoggedIn } = state
  const { cookie } = props

  useEffect(() => {
    const loginCookie = getCookie('trueinsights-cookie')
    setState(() => ({ isLoggedIn: loginCookie !== undefined && loginCookie !== '' && loginCookie !== null ? true : false }))
  }, [cookie])

  return (
    <Router history={history}>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path={SIGN_IN} component={SignIn} />
        <Route exact path={SIGN_UP} component={SignUp} />
        <Route exact path={VERIFY_CODE} component={VerifyCode} />
        <Route exact path={PASSWORD} component={Password} />
        <Route exact path={BUSINESS} component={Business} />
        <Route exact path={TRACK_CODE} component={TrackCode} />
        {isLoggedIn && <Route exact path={HOME} component={InSightsBusiness} /> }
        {isLoggedIn && <Route exact path={FAVORITES} component={Favorites} /> }
        {isLoggedIn && <Route exact path={SALES} component={Sales} /> }
        {isLoggedIn && <Route exact path={TRACKING} component={Tracking} /> }
        {isLoggedIn && <Route exact path={SETTINGS_BUSINESS} component={SettingsBusiness} /> }
        {isLoggedIn && <Route exact path={SETTINGS_PROFILE} component={SettingsProfile} /> }
        <Route exact path="*" component={SignIn} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    cookie: state.signIn.cookie
  }
}

export default connect(mapStateToProps, null)(Routes)
