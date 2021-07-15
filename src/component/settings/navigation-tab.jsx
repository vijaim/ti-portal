import React from 'react'
import { Link } from 'react-router-dom'
import { NAVIGATION_TABS } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'

const NavigationTab = (props) => {
  const routePath = GetRoutesPathName()
  const { navType } = props

  return (
    <div className="container position-relative">
      <nav className="nav page-tabs">
        {
          NAVIGATION_TABS.map((navTab) => (
            navType === navTab.type && (
              <Link
                key={navTab.id}
                className={routePath === navTab.routePath ? 'nav-link active' : 'nav-link'}
                to={navTab.routePath}
              >
                {navTab.name}
              </Link>
            )
          ))
        }
      </nav>
    </div>
  )
}

export default NavigationTab
