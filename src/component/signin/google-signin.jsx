import React from 'react'
import { GoogleLogin } from 'react-google-login'

const GoogleSignIn = ({ onGoogleSignPressed, btnName }) => {
  return (
    <GoogleLogin
      className="mb-40"
      clientId={process.env.REACT_GOOGLE_SIGNIN_KEY}
      buttonText={btnName}
      theme="dark"
      onSuccess={onGoogleSignPressed}
      onFailure={onGoogleSignPressed}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleSignIn
