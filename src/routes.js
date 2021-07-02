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

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/verifyCode" component={VerifyCode} />
        <Route exact path="/password" component={Password} />
        <Route exact path="/business" component={Business} />
        <Route exact path="/trackCode" component={TrackCode} />
        <Route exact path="/home" component={InSightsBusiness} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/sales" component={Sales} />
        <Route exact path="/tracking" component={Tracking} />
        <Route exact path="/settingsBusiness" component={SettingsBusiness} />
        <Route exact path="/settingsProfile" component={SettingsProfile} />
      </Switch>
    </Router>
  )
}

export default Routes
