import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const SelectBar = () => {
  const location = useLocation()

  return (
    <div className="container position-relative">
      <nav className="nav page-tabs">
        {(location.pathname === ROUTES_PATH_NAME.FAVORITES) ?
          <>
            <Link className="nav-link active" to ={ROUTES_PATH_NAME.FAVORITES}>Favorites</Link>
            <Link className="nav-link" to={ROUTES_PATH_NAME.SALES}>All</Link>
          </> :
          <>
            <Link className={(location.pathname === ROUTES_PATH_NAME.SETTINGS_BUSINESS) ? 'nav-link active' : 'nav-link'} to={ROUTES_PATH_NAME.SETTINGS_BUSINESS}>Businesses</Link>
            <Link className={(location.pathname === ROUTES_PATH_NAME.SETTINGS_PROFILE) ? 'nav-link active' : 'nav-link'} to={ROUTES_PATH_NAME.SETTINGS_PROFILE}>Profile</Link>
          </>
        }
      </nav>
    </div>
  )
}

export default SelectBar
