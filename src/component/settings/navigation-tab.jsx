import React from 'react'
import { Link } from 'react-router-dom'
import { NAVIGATION_TABS } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'

const NavigationTab = (props) => {
  const routePath = GetRoutesPathName()
  const { navType } = props
  const app = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  return (
    <div className="container position-relative">
      <nav className="nav page-tabs">
        {
          NAVIGATION_TABS.map((navTab) => (
            navType === navTab.type && (
              (navTab.isNavigation && navTab.type !== 'home'
                ? <Link
                key={navTab.id}
                className={routePath.includes(navTab.routePath) ? 'nav-link active' : 'nav-link'}
                to={navTab.routePath}
              >
                {navTab.name}
              </Link>
                : <Link
                onClick={() => props.tabRender(navTab)}
                key={navTab.id}
                className={routePath === `${navTab.routePath}/${app.id}/${navTab.id}` ? 'nav-link active' : 'nav-link'}
                to={`${navTab.routePath}/${app.id}/${navTab.id}`}
              >
                {navTab.name}
              </Link>
              )
            )
          ))
        }
      </nav>
    </div>
  )
}

export default NavigationTab
