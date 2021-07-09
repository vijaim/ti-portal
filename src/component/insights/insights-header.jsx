import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const InsightsHeader = (props) => {
  const location = useLocation()

  return (
    <>
      {(location.pathname === ROUTES_PATH_NAME.FAVORITES) || (location.pathname === ROUTES_PATH_NAME.SALES) || (location.pathname === ROUTES_PATH_NAME.TRACKING) ? <p className="mb-12 text-muted">{props.businessName}</p> : ''}
      {(location.pathname === ROUTES_PATH_NAME.SALES) ? (
        <Link to={ROUTES_PATH_NAME.FAVORITES} className="mb-1 d-inline-flex align-items-center">
          <img src="images/icons/icon-arrow-left-blue.png" alt="Arrow Left" className="me-2" height={10} width={5} />
          Back to all insights
        </Link> ) : ''      
      }
      <h1 className="fw-bold h4 mb-0 text-dark">{props.headingTitle}</h1>
    </>
  )
}

export default InsightsHeader
