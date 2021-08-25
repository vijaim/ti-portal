import React from 'react'
import { GoogleLogin } from 'react-google-login'
const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID

const GoogleSignIn = ({ onGoogleSignPressed, btnName }) => {
  return (
    <GoogleLogin
      className="mb-40"
      clientId={clientId}
      buttonText={btnName}
      theme="dark"
      onSuccess={onGoogleSignPressed}
      onFailure={onGoogleSignPressed}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleSignIn
