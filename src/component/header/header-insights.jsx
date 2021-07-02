import React from 'react'
import { Link } from 'react-router-dom'

function HeaderInSights() {
  const currentPath = window.location.pathname
  return (
    <>
      <header>
        <nav className="bg-white navbar navbar-expand-lg pb-lg-3 pt-lg-3">
          <div className="container">
            <a className="navbar-brand text-primary" href="#"><img src="images/trueInsights-logo.png" alt="Trueinsight logo" width={132} height={29} /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={((currentPath === '/home') || (currentPath === '/favorites') || (currentPath === '/sales') ? 'nav-link active' : 'nav-link')} to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={((currentPath === '/tracking') ? 'nav-link active' : 'nav-link')} to="/tracking">Tracking</Link>
                </li>
                <li className="nav-item">
                  <Link className={((currentPath === '/settingsBusiness') || (currentPath === '/settingsProfile') ? 'nav-link active' : 'nav-link')} to="/settingsBusiness">Settings</Link>
                </li>
              </ul>
              <Link className="nav-link" to="/">Logout</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default HeaderInSights
