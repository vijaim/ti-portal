import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../utils/constants'

const GoogleSignIn = () => {
  const { GOOGLE_SIGN_IN } = IMAGE_URL

  return (
    <Link to="#" className="d-inline-block mb-40">
      <img src={GOOGLE_SIGN_IN} alt="Sign in with Google" width={192} height={46} />
    </Link>
  )
}

export default GoogleSignIn
