import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/header-insights'

function SettingsProfile() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="bg-white pb-20 position-relative shadow-sm">
            <div className="container">
              <form action="#" className="mb-60">
                <input type="text" className="form-control" id="inputVerificationCode" placeholder="Search for a metric (e.g. sales, profit) " />
              </form>
              <h1 className="fw-bold h4 mb-12 text-dark">Settings</h1>
            </div>
          </section>
          <section className="bg-section">
            <div className="container position-relative">
              <nav className="nav page-tabs">
                <Link className="nav-link" to="/settingsBusiness">Businesses</Link>
                <Link className="nav-link active" to="/settingsProfile">Profile</Link>
              </nav>
            </div>
            <div className="container pb-40 pt-40">
              <div className="row">
                <div className="col-lg-9 col-xl-6">
                  <div className="listing-item pt-20 pb-20 mb-20">
                    <div className="row">
                      <div className="col-md-8">
                        <form action="#">
                          <div className="mb-20">
                            <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                            <input type="text" className="form-control" id="inputName" name="inputName" placeholder="John Smith" required />
                          </div>
                          <button type="submit" className="btn btn-primary">Change</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item pt-20 pb-20 mb-20">
                    <div className="row">
                      <div className="col-md-8">
                        <form action="#">
                          <div className="mb-20">
                            <label htmlFor="inputPassword" className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" id="inputPassword" name="inputPassword" placeholder="******" required />
                          </div>
                          <button type="submit" className="btn btn-primary">Change</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item pt-20 pb-20 mb-20">
                    <div className="row">
                      <div className="col-md-8">
                        <form action="#">
                          <div className="mb-20">
                            <label htmlFor="inputEmail" className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="john@email.com" required />
                          </div>
                          <button type="submit" className="btn btn-primary">Change</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SettingsProfile
