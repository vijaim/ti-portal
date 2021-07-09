import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import InsightsHeader from '../insights/insights-header'
import AddBusiness from '../signup/add-business'
import CopyCode from '../signup/copy-code'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const InSightsBusiness = () => {
  const [state, setState] = useState({
    isBusinessModalOpen: false,
    isTrackModalOpen: false,
  })

  const { isBusinessModalOpen, isTrackModalOpen } = state

  const showBusinessModal = () => {
    setState(() => ({ isBusinessModalOpen: true }))
  }

  const hideBusinessModal = () => {
    setState(() => ({ isBusinessModalOpen: false }))
  }

  const showTrackModal = () => {
    setState(() => ({ isTrackModalOpen: true, isBusinessModalOpen: false }))
  }

  const hideTrackModal = () => {
    setState(() => ({ isTrackModalOpen: false }))
  }

  return (
    <div>
      <div>
        <div>
          <main>
            <section className="bg-white pb-20 position-relative shadow-sm">
              <div className="container">
                <div className="align-items-center gy-2 mb-12 row">
                  <div className="col-md col-sm">
                    <InsightsHeader headingTitle="Businesses" />
                  </div>
                  <div className="col-md-auto col-sm-auto text-xl-center">
                    <button type="button" className="btn btn-primary" onClick={showBusinessModal}>Add Business</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-section section-padding">
              <div className="container pb-40 pt-40">
                <Link className="business-item" to={ROUTES_PATH_NAME.FAVORITES}>
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
          <Modal className="modal fade" show={isBusinessModalOpen} onHide={hideBusinessModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="">
              <div className="modal-content border-0 rounded-0">
                <div className="modal-body">
                  <h2 className="fw-bold h4 mb-40 text-center" id="addBusinessModalLabel">Add your business</h2>
                  <AddBusiness onClick={showTrackModal} className="btn btn-primary d-block mt-20 w-100" buttonTitle="Continue" />
                </div>
              </div>
            </div>
          </Modal>
          <Modal className="modal fade" show={isTrackModalOpen} onHide={hideTrackModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="">
              <div className="modal-content border-0 rounded-0">
                <div className="modal-body">
                  <CopyCode />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default InSightsBusiness
