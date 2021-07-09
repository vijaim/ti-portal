import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SearchBar from '../header/search-bar'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const Header = () => {
  const location = useLocation()
  return (
    <>
      {(location.pathname === ROUTES_PATH_NAME.SIGN_IN) || (location.pathname === ROUTES_PATH_NAME.SIGN_UP) || (location.pathname === ROUTES_PATH_NAME.VERIFY_CODE) || (location.pathname === ROUTES_PATH_NAME.PASSWORD) || (location.pathname === ROUTES_PATH_NAME.BUSINESS) || (location.pathname === ROUTES_PATH_NAME.TRACK_CODE) ?
        <header>
          <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
            <div className="container">
              <Link className="navbar-brand text-primary"><img src="images/trueInsights-logo.png" alt="Trueinsight logo" width={132} height={29} /></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className={((location.pathname === ROUTES_PATH_NAME.SIGN_UP) || (location.pathname === ROUTES_PATH_NAME.VERIFY_CODE) || (location.pathname === ROUTES_PATH_NAME.PASSWORD) || (location.pathname === ROUTES_PATH_NAME.BUSINESS) || (location.pathname === ROUTES_PATH_NAME.TRACK_CODE) ? 'nav-link' : 'btn btn-primary ms-lg-3')} to="/signUp">Sign up</Link>
                  </li>
                </ul>
                <Link className={((location.pathname === ROUTES_PATH_NAME.SIGN_IN) ? 'nav-link' : 'btn btn-primary ms-lg-3')} to="/">Sign in</Link>
              </div>
            </div>
          </nav>
        </header> :
        <>
          <header>
            <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
              <div className="container">
                <Link className="navbar-brand text-primary"><img src="images/trueInsights-logo.png" alt="Trueinsight logo" width={132} height={29} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                  <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className={((location.pathname === ROUTES_PATH_NAME.HOME) || (location.pathname === ROUTES_PATH_NAME.FAVORITES) || (location.pathname === ROUTES_PATH_NAME.SALES) ? 'btn btn-primary ms-lg-3' : 'nav-link')} to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={((location.pathname === ROUTES_PATH_NAME.TRACKING) ? 'btn btn-primary ms-lg-3' : 'nav-link')} to="/tracking">Tracking</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={((location.pathname === ROUTES_PATH_NAME.SETTINGS_BUSINESS) || (location.pathname === ROUTES_PATH_NAME.SETTINGS_PROFILE) ? 'btn btn-primary ms-lg-3' : 'nav-link')} to="/settingsBusiness">Settings</Link>
                    </li>
                  </ul>
                  <Link className="nav-link" to="/">Logout</Link>
                </div>
              </div>
            </nav>
          </header>
          <div className="container">
            <form className="mb-60">
              <SearchBar />
            </form>
          </div>
        </>
      }
    </>
  )
}

export default Header
