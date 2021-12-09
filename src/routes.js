/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
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
import Tutorial from './component/insights/tutorial'
import AddCustomMetric from './component/insights/add-custom-metric'
import { connect } from 'react-redux'
import { ROUTES_PATH_NAME } from './utils/constants'
import { history } from './utils/util-methods'
import { getCookie } from './functions/cookie-functions'
import { ToastContainer } from 'react-toastify'

const Routes = (props) => {
  const {
    SIGN_UP, VERIFY_CODE, PASSWORD, BUSINESS, TRACK_CODE, HOME, FAVORITES, SALES,
    TRACKING, SETTINGS_BUSINESS, SETTINGS_PROFILE, SIGN_IN, TUTORIAL, CREATECUSTOMMETRIC
  } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    isLoggedIn: false
  })
  const { isLoggedIn } = state
  const { cookie } = props

  useEffect(async () => {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        const token = localStorage.getItem('localLoginCookie')
        if (!token && localStorage.getItem('logout')) {
          history.push(SIGN_IN)
          localStorage.clear()
        }
      }
    })
    const loginCookie = getCookie('trueinsights-cookie')
    setState(() => ({ isLoggedIn: (loginCookie === null || loginCookie === '') ? false : true }), () => {
      if (isLoggedIn && (SIGN_IN || SIGN_UP || VERIFY_CODE || PASSWORD)) {
        history.push(HOME)
      }
    })
  }, [cookie])

  return (
    <Router history={history}>
      <Header history={history} />
      <ToastContainer />
      <Switch>
        <Route exact path={SIGN_IN} component={SignIn} />
        <Route exact path={SIGN_UP} component={SignUp} />
        <Route exact path={VERIFY_CODE} component={VerifyCode} />
        <Route exact path={PASSWORD} component={Password} />
        <Route exact path={BUSINESS} component={Business} />
        <Route exact path={TRACK_CODE} component={TrackCode} />
        {isLoggedIn && <Route exact path={HOME} component={InSightsBusiness} /> }
        {isLoggedIn && <Route exact path={`${FAVORITES}/:id/all`} component={Favorites} /> }
        {isLoggedIn && <Route exact path={`${FAVORITES}/:id/favorites`} component={Favorites} /> }
        {isLoggedIn && <Route exact path={`${FAVORITES}/:id/hiddens`} component={Favorites} /> }
        {isLoggedIn && <Route exact path={`${SETTINGS_BUSINESS}/:id/customInsights`} component={SettingsBusiness} /> }
        {isLoggedIn && <Route exact path={SALES} component={Sales} /> }
        {isLoggedIn && <Route exact path={TRACKING} component={Tracking} /> }
        {isLoggedIn && <Route exact path={SETTINGS_BUSINESS} component={SettingsBusiness} /> }
        {isLoggedIn && <Route exact path={`${SETTINGS_BUSINESS}/:id`} component={SettingsBusiness} /> }
        {isLoggedIn && <Route exact path={SETTINGS_PROFILE} component={SettingsProfile} /> }
        {isLoggedIn && <Route exact path={TUTORIAL} component={Tutorial} /> }
        {isLoggedIn && <Route exact path={`${FAVORITES}/:id${CREATECUSTOMMETRIC}`} component={AddCustomMetric} /> }
        {isLoggedIn && <Route exact path={`${FAVORITES}/:id${CREATECUSTOMMETRIC}/:narrativeId`} component={AddCustomMetric} /> }
        {isLoggedIn && <Route exact path="*" component={InSightsBusiness} />}
        {!isLoggedIn && <Route exact path="*" component={SignIn} />}
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
