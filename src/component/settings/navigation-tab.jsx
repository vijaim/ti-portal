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
              (navTab.isNavigation
                ? <Link
                key={navTab.id}
                className={routePath === navTab.routePath ? 'nav-link active' : 'nav-link'}
                to={navTab.routePath}
              >
                {navTab.name}
              </Link>
                : <div key={navTab.name} onClick={() => props.tabRender(navTab)} className={props.currentTab === navTab.id ? 'nav-link active' : 'nav-link'}>
                  {navTab.name}
               </div>)
            )
          ))
        }
      </nav>
    </div>
  )
}

export default NavigationTab
