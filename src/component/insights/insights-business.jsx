import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Header from '../header/header-insights'

function InSightsBusiness() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTrackOpen, setIsTrackOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const showTrackModal = () => {
    setIsTrackOpen(true)
    setIsOpen(false)
  }

  const hideTrackModal = () => {
    setIsTrackOpen(false)
  }

  return (
    <>
      <Header />
      <div>
        <div>
          <div>
            <main>
              <section className="bg-white pb-20 position-relative shadow-sm">
                <div className="container">
                  <form action="#" className="mb-60">
                    <input type="text" className="form-control" id="inputVerificationCode" placeholder="Search for a metric (e.g. sales, profit) " required />
                  </form>
                  <div className="align-items-center gy-2 mb-12 row">
                    <div className="col-md col-sm">
                      <h1 className="fw-bold h4 mb-0 text-dark">Businesses</h1>
                    </div>
                    <div className="col-md-auto col-sm-auto text-xl-center">
                      <button type="button" className="btn btn-primary" onClick={showModal}>Add Business</button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-section section-padding">
                <div className="container pb-40 pt-40">
                  <Link className="business-item" to="/favorites">
                    <div className="listing-item">
                      <div className="align-items-center gy-3 row">
                        <div className="col-xl-4">
                          <h2 className="fw-bold h6 mb-1">Barney’s Departmental Stores</h2>
                          <span>businessname.com</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <img src="images/icons/icon-computer.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />
                          <span>Web app</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <span>Ecommerce</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">57</h2>
                          <span className="text-muted-2">key metrics</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">5</h2>
                          <span className="text-muted-2">insights today</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <a href="#" className="business-item">
                    <div className="listing-item">
                      <div className="align-items-center gy-3 row">
                        <div className="col-xl-4">
                          <h2 className="fw-bold h6 mb-1">Barney’s Online Shopping</h2>
                          <span>businessname.com</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <img src="images/icons/icon-mobile.png" width={24} height={24} alt="Mobile" className="me-2 icon-base" />
                          <span>iOS app</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <span>Ecommerce</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">57</h2>
                          <span className="text-muted-2">key metrics</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">5</h2>
                          <span className="text-muted-2">insights today</span>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="business-item">
                    <div className="listing-item">
                      <div className="align-items-center gy-3 row">
                        <div className="col-xl-4">
                          <h2 className="fw-bold h6 mb-1">Barney’s Fitness</h2>
                          <span>businessname.com</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <img src="images/icons/icon-computer.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />
                          <span>Web app</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl">
                          <span>Ecommerce</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">57</h2>
                          <span className="text-muted-2">key metrics</span>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">5</h2>
                          <span className="text-muted-2">insights today</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </section>
            </main>
            {/* Add Business Modal */}
            <Modal className="modal fade" show={isOpen} onHide={hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
              <div className="">
                <div className="modal-content border-0 rounded-0">
                  <div className="modal-body">
                    <h2 className="fw-bold h4 mb-40 text-center" id="addBusinessModalLabel">Add your business</h2>
                    <form action="#">
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
                        <select defaultValue="Select a category" className="form-select" aria-label="Business category" id="inputPlatform">
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
                      <button type="submit" className="btn btn-primary d-block mt-20 w-100" onClick={showTrackModal}>Continue</button>
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
            {/* Add Business Modal end */}
            {/* Tracking Code Modal */}
            <Modal className="modal fade" show={isTrackOpen} onHide={hideTrackModal} aria-labelledby="contained-modal-title-vcenter" centered>
              <div className="">
                <div className="modal-content border-0 rounded-0">
                  <div className="modal-body">
                    <h2 className="fw-bold h4 mb-40 text-center" id="trackingCodeModalLabel">Copy the tracking code</h2>
                    <ul className="mb-40">
                      <li>Copy the tracking code</li>
                      <li>Paste this tracking code inside the tag in the pages where transactions happen</li>
                      <li>Receive insights in your email</li>
                    </ul>
                    <div className="mb-20">
                      <label htmlFor="inputTrackingCode" className="form-label fw-bold">Example textarea</label>
                      <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
                    </div>
                    <button type="button" className="btn btn-primary d-block w-100">Copy</button>
                  </div>
                </div>
              </div>
            </Modal>
            {/* Tracking Code Modal end */}
          </div>
        </div>
      </div>
    </>
  )
}

export default InSightsBusiness
