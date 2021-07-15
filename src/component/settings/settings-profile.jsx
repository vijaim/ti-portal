import React from 'react'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from './navigation-tab'
import { HEADING_TITLE } from '../../utils/constants'

const SettingsProfile = () => {
  const { SETTINGS } = HEADING_TITLE
  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle={SETTINGS} />
          </div>
        </section>
        <section className="bg-section">
          <NavigationTab navType="settings" />
          <div className="container pb-40 pt-40">
            <div className="row">
              <div className="col-lg-9 col-xl-6">
                <div className="listing-item pt-20 pb-20 mb-20">
                  <div className="row">
                    <div className="col-md-8">
                      <form>
                        <div className="mb-20">
                          <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                          <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Username" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Change</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="listing-item pt-20 pb-20 mb-20">
                  <div className="row">
                    <div className="col-md-8">
                      <form>
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
                      <form>
                        <div className="mb-20">
                          <label htmlFor="inputEmail" className="form-label fw-bold">Email</label>
                          <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Email" required />
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
    </>
  )
}

export default SettingsProfile
