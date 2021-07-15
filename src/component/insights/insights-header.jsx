import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME, IMAGE_URL } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'

const InsightsHeader = (props) => {
  const routePath = GetRoutesPathName()
  const { FAVORITES, SALES, TRACKING } = ROUTES_PATH_NAME

  return (
    <>
      {routePath === FAVORITES || routePath === SALES || routePath === TRACKING
        ?
          <p className="mb-12 text-muted">{props.businessName}</p>
        : ''
      }
      {routePath === SALES
        ? 
          (<Link to={FAVORITES} className="mb-1 d-inline-flex align-items-center">
            <img src={IMAGE_URL.ARROW_LEFT_BLUE} alt="Arrow Left" className="me-2" height={10} width={5} />
            Back to all insights
          </Link>)
        : ''
      }
      <h1 className="fw-bold h4 mb-0 text-dark">{props.headingTitle}</h1>
    </>
  )
}

export default InsightsHeader
