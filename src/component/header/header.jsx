/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../header/search-bar'
import { ROUTES_PATH_NAME, HEADER_NAVIGATION, IMAGE_URL } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'
import { deleteCookie, getCookie } from '../../functions/cookie-functions'
import { connect } from 'react-redux'
import { setLoginCookie } from '../signin/signin-actions'

const Header = (props) => {
  const routePath = GetRoutesPathName()
  const {
    SIGN_UP, VERIFY_CODE, PASSWORD, BUSINESS, TRACK_CODE, HOME, FAVORITES,
    SALES, SETTINGS_BUSINESS, SETTINGS_PROFILE, SIGN_IN, TRACKING
  } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    cookieHeader: false
  })
  const { isHeaderShow } = state
  const { cookie, setLoginCookie, path } = props

  useEffect(() => {
    const loginCookie = getCookie('trueinsights-cookie')
    setState(() => ({ isHeaderShow: loginCookie !== undefined && loginCookie !== '' && loginCookie !== null ? true : false }))
  }, [cookie])

  const setRoutesPath = (routePath) => {
    if (routePath === FAVORITES || routePath === SALES) {
      return isHeaderShow ? HOME : SIGN_IN
    } else if (routePath === SETTINGS_PROFILE) {
      return isHeaderShow ? SETTINGS_BUSINESS : SIGN_IN
    } else if (routePath === PASSWORD || routePath === BUSINESS ||
      routePath === TRACK_CODE) {
      return SIGN_UP
    } else if (routePath === VERIFY_CODE) {
      return path === SIGN_UP ? SIGN_UP : SIGN_IN
    } else if (routePath === SETTINGS_BUSINESS) {
      return isHeaderShow ? SETTINGS_BUSINESS : SIGN_IN
    } else if (routePath === HOME) {
      return isHeaderShow ? HOME : SIGN_IN
    } else if (routePath === TRACKING) {
      return isHeaderShow ? TRACKING : SIGN_IN
    }
    return routePath
  }

  const checkAuthHeader = () => {
    return routePath === SIGN_UP || routePath === VERIFY_CODE ||
    routePath === PASSWORD || routePath === BUSINESS || routePath === TRACK_CODE || routePath === SIGN_IN
  }

  const logOut = () => {
    setLoginCookie(null)
    localStorage.clear()
    deleteCookie('trueinsights-cookie')
  }

  return (
    <>
      {
      checkAuthHeader()
        ? (
          <header>
            <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
              <div className="container">
                <Link to="#" className="navbar-brand text-primary">
                  <img src={IMAGE_URL.TRUEINSIGHTS_LOGO} alt="Trueinsight logo" width={132} height={29} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                  <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                    {
                      HEADER_NAVIGATION.map((headerNav) => (
                        headerNav.type === 'auth' && (
                          <li key={headerNav.id} className="nav-item">
                            <Link
                              className={setRoutesPath(routePath) === headerNav.routePath ? 'btn btn-primary ms-lg-3' : 'nav-link'}
                              to={headerNav.routePath}
                            >
                              {headerNav.name}
                            </Link>
                          </li>
                        )
                      ))
                    }
                  </ul>
                </div>
              </div>
            </nav>
          </header>
          )
        : (
          <>
            <header>
              <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
                <div className="container">
                  <Link to="#" className="navbar-brand text-primary">
                    <img src={IMAGE_URL.TRUEINSIGHTS_LOGO} alt="Trueinsight logo" width={132} height={29} />
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                      {
                        HEADER_NAVIGATION.map((headerNav) => (
                          headerNav.type === (isHeaderShow ? 'dashboard' : 'auth') && (
                            <li key={headerNav.id} className="nav-item">
                              <Link
                                className={setRoutesPath(routePath) === headerNav.routePath ? 'btn btn-primary ms-lg-3' : 'nav-link'}
                                onClick={headerNav.id === 'logOut' ? logOut : ''}
                                to={headerNav.routePath}>
                                {headerNav.name}
                              </Link>
                            </li>
                          )
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
            { isHeaderShow
              ? (
                <div className="container">
                  <form className="mb-60">
                    <SearchBar />
                  </form>
                </div>
                )
              : '' }
          </>
          )
        }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cookie: state.signIn.cookie,
    path: state.signIn.path
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginCookie: (cookie) => {
      dispatch(setLoginCookie(cookie))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
