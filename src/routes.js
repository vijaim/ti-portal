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

function Routes() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path={ROUTES_PATH_NAME.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES_PATH_NAME.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES_PATH_NAME.VERIFY_CODE} component={VerifyCode} />
        <Route exact path={ROUTES_PATH_NAME.PASSWORD} component={Password} />
        <Route exact path={ROUTES_PATH_NAME.BUSINESS} component={Business} />
        <Route exact path={ROUTES_PATH_NAME.TRACK_CODE} component={TrackCode} />
        <Route exact path={ROUTES_PATH_NAME.HOME} component={InSightsBusiness} />
        <Route exact path={ROUTES_PATH_NAME.FAVORITES} component={Favorites} />
        <Route exact path={ROUTES_PATH_NAME.SALES} component={Sales} />
        <Route exact path={ROUTES_PATH_NAME.TRACKING} component={Tracking} />
        <Route exact path={ROUTES_PATH_NAME.SETTINGS_BUSINESS} component={SettingsBusiness} />
        <Route exact path={ROUTES_PATH_NAME.SETTINGS_PROFILE} component={SettingsProfile} />
      </Switch>
    </Router>
  )
}

export default Routes
