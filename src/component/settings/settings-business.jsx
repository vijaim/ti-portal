import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabPanel ,TabList ,Tab } from "react-tabs"
import Header from '../header/header-insights'

function SettingsBusiness() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [buttonActive, setButtonActive] = useState(0)

  const handleBusinessSelect = (index) => {
    setSelectedIndex(index)
  }

  const handleBusiness1 = () => {
    setSelectedIndex(0)
    setButtonActive(0)
  }

  const handleBusiness2 = () => {
    setSelectedIndex(1)
    setButtonActive(1)
  }

  const handleBusiness3 = () => {
    setSelectedIndex(2)
    setButtonActive(2)
  }  

  return (
    <>
      <Header />
      <div>
        <main>
          <section className="bg-white pb-20 position-relative shadow-sm">
            <div className="container">
              <form action="#" className="mb-60">
                <input type="text" className="form-control" id="inputVerificationCode" placeholder="Search for a metric (e.g. sales, profit) " required />
              </form>
              <h1 className="fw-bold h4 mb-12 text-dark">Settings</h1>
            </div>
          </section>
          <section className="bg-section section-padding-tab">
            <div className="container position-relative">
              <nav className="nav page-tabs">
                <Link className="nav-link active" to="/settingsBusiness">Businesses</Link>
                <Link className="nav-link" to="/settingsProfile">Profile</Link>
              </nav>
            </div>
            <div className="container pb-40 pt-40">
              <div className="gy-3 mb-40 row">
                <div className="col-md-4 col-lg-3">
                  <div className="nav flex-column nav-pills me-3 business-tabs" id="business-tab" role="tablist" aria-orientation="vertical">
                    <button className={((buttonActive === 0) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness1}>Business Name 1</button>
                    <button className={((buttonActive === 1) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness2}>Business Name 2</button>
                    <button className={((buttonActive === 2) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness3}>Business Name 3</button>
                  </div>
                </div>
                <div className="col-md-8 col-lg-9">
                  <Tabs className="tab-content" selectedIndex={selectedIndex} onSelect={handleBusinessSelect}>                    
                    <TabPanel className="tab-pane fade show active">
                      <div className="listing-item pt-20 pb-20">
                        <div className="row">
                          <div className="col-xl-8">
                            <form>
                              <div className="mb-12">
                                <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" id="inputName" name="inputName" placeholder="John Smith" required />
                              </div>
                              <div className="mb-12">
                                <label htmlFor="inputBusiness" className="form-label fw-bold">Business category</label>
                                <select defaultValue="Select a category" className="form-select" aria-label="Business category" id="inputBusiness">
                                  <option value>Select a category</option>
                                  <option value={1}>One</option>
                                  <option value={2}>Two</option>
                                  <option value={3}>Three</option>
                                </select>
                              </div>
                              <div className="mb-12">
                                <label htmlFor="inputPlatform" className="form-label fw-bold">App platform</label>
                                <select defaultValue="Select a category" className="form-select" aria-label="App platform" id="inputPlatform">
                                  <option value>Select a category</option>
                                  <option value={1}>One</option>
                                  <option value={2}>Two</option>
                                  <option value={3}>Three</option>
                                </select>
                              </div>
                              <div className="mb-12">
                                <label htmlFor="inputURL" className="form-label fw-bold">URL</label>
                                <input type="url" className="form-control" id="inputURL" placeholder="https://" />
                              </div>
                              <div className="mb-12">
                                <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
                                <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
                                <div className="form-text text-end mt-2">
                                  <a href="#">Copy tracking code</a>
                                </div>
                              </div>
                              <div className="mb-40">
                                <label className="form-label fw-bold">Notification</label>
                                <div className="mb-20">
                                  <span className="me-3">Send by</span>
                                  <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="checkboxEmail" defaultValue defaultChecked />
                                    <label className="form-check-label" htmlFor="checkboxEmail">Email</label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="checkboxSMS" defaultValue />
                                    <label className="form-check-label" htmlFor="checkboxSMS">SMS</label>
                                  </div>
                                </div>
                                <div>
                                  <p className="mb-2">Frequency</p>
                                  <div className="row g-2 align-items-center">
                                    <div className="col-sm-auto">
                                      <select defaultValue="Once a day" className="form-select" aria-label="Frequency period" id="inputFrqPeriod">
                                        <option value>Once a day</option>
                                        <option value>Once a week</option>
                                        <option value>Once a month</option>
                                      </select>
                                    </div>
                                    <div className="col-6 col-sm-auto">
                                      <select defaultValue={1} className="form-select" aria-label="Frequency hour" id="inputFrqHour">
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                      </select>
                                    </div>
                                    <div className="col-6 col-sm-auto">
                                      <select defaultValue="am" className="form-select" aria-label="Frequency AM/PM" id="inputFrqAMPM">
                                        <option value="am">am</option>
                                        <option value="pm">pm</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="tab-pane fade show active">Tabs 2</TabPanel>
                    <TabPanel className="tab-pane fade show active">Tabs 3</TabPanel>
                    <TabList className="disable">
                      <Tab></Tab>
                      <Tab></Tab>
                      <Tab></Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SettingsBusiness
