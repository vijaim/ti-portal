import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../header/search-bar'
import { ROUTES_PATH_NAME, HEADER_NAVIGATION, IMAGE_URL } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'

const Header = () => {
  const routePath = GetRoutesPathName()
  const { SIGN_IN, SIGN_UP, VERIFY_CODE, PASSWORD, BUSINESS, TRACK_CODE, HOME, FAVORITES,
    SALES, SETTINGS_BUSINESS, SETTINGS_PROFILE } = ROUTES_PATH_NAME

  const setRoutesPath = (routePath) => {
    if (routePath === FAVORITES || routePath === SALES) {
      return HOME
    } else if (routePath === SETTINGS_PROFILE) {
      return SETTINGS_BUSINESS
    } else if (routePath === VERIFY_CODE || routePath === PASSWORD || routePath === BUSINESS
        || routePath === TRACK_CODE) {
      return SIGN_UP
    }
    return routePath
  }

  const checkAuthHeader = () => {
    return routePath === SIGN_IN || routePath === SIGN_UP || routePath === VERIFY_CODE
      || routePath === PASSWORD || routePath === BUSINESS || routePath === TRACK_CODE
  }

  return (
    <>
      {
      checkAuthHeader()
      ?
        <header>
          <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
            <div className="container">
              <Link to="/#" className="navbar-brand text-primary">
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
      :
        <>
          <header>
            <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
              <div className="container">
                <Link to="/#" className="navbar-brand text-primary">
                  <img src={IMAGE_URL.TRUEINSIGHTS_LOGO} alt="Trueinsight logo" width={132} height={29} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                  <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                    {
                      HEADER_NAVIGATION.map((headerNav) => (
                        headerNav.type === 'dashboard' && (
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
