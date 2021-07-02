import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
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
                  <Link className={((currentPath === '/signUp') || (currentPath === '/verifyCode') || (currentPath === '/password') || (currentPath === '/business') || (currentPath === '/trackCode') ? 'nav-link' : 'btn btn-primary ms-lg-3')} to="/signUp">Sign up</Link>
                </li>
              </ul>
              <Link className={((currentPath === '/') ? 'nav-link' : 'btn btn-primary ms-lg-3')} to="/">Sign in</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
