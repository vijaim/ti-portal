/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './component/signin/signin'
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
import { ROUTES_PATH_NAME } from './utils/constants'

const Routes = () => {
  const {
    SIGN_IN, SIGN_UP, VERIFY_CODE, PASSWORD, BUSINESS, TRACK_CODE, HOME, FAVORITES, SALES,
    TRACKING, SETTINGS_BUSINESS, SETTINGS_PROFILE
  } = ROUTES_PATH_NAME
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={SIGN_IN} component={SignIn} />
        <Route exact path={SIGN_UP} component={SignUp} />
        <Route exact path={VERIFY_CODE} component={VerifyCode} />
        <Route exact path={PASSWORD} component={Password} />
        <Route exact path={BUSINESS} component={Business} />
        <Route exact path={TRACK_CODE} component={TrackCode} />
        <Route exact path={HOME} component={InSightsBusiness} />
        <Route exact path={FAVORITES} component={Favorites} />
        <Route exact path={SALES} component={Sales} />
        <Route exact path={TRACKING} component={Tracking} />
        <Route exact path={SETTINGS_BUSINESS} component={SettingsBusiness} />
        <Route exact path={SETTINGS_PROFILE} component={SettingsProfile} />
      </Switch>
    </Router>
  )
}

export default Routes
