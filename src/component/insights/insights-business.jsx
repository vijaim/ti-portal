/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import InsightsHeader from '../insights/insights-header'
import AddBusiness from '../signup/add-business'
import CopyCode from '../signup/copy-code'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import { ROUTES_PATH_NAME, IMAGE_URL, HEADING_TITLE, BUSINESSKEYS } from '../../utils/constants'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'

const InSightsBusiness = (props) => {
  const [state, setState] = useState({
    isBusinessModalOpen: false,
    isTrackModalOpen: false,
    businessObj: {}
  })
  const { isBusinessModalOpen, isTrackModalOpen, businessObj } = state
  const { FAVORITES } = ROUTES_PATH_NAME
  const { COMPUTER } = IMAGE_URL
  const { BUSINESSES, ADD_BUSINESS } = HEADING_TITLE
  const { APPS, VERTICALS, PLATFORMS } = BUSINESSKEYS
  const { cookie } = props

  const showBusinessModal = () => {
    setState(() => ({ isBusinessModalOpen: true }))
  }

  const hideBusinessModal = () => {
    setState(() => ({ isBusinessModalOpen: false }))
    businessList()
  }

  const showTrackModal = () => {
    setState(() => ({ isTrackModalOpen: true, isBusinessModalOpen: false }))
  }

  const hideTrackModal = () => {
    setState(() => ({ isTrackModalOpen: false }))
    businessList()
  }

  const businessList = () => {
    NetworkManager.getBusiness(cookie).then(response => {
      if (response.status === 200) {
        if (response.data.response_objects.app_ids === null) {
          setState(() => ({ businessObj: {} }))
        } else {
          setState(() => ({ businessObj: response.data.response_objects }))
        }
      }
    })
      .catch(error => {
        console.log('error', error)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  useEffect(() => {
    businessList()
  }, [])

  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <div className="align-items-center gy-2 mb-12 row">
              <div className="col-md col-sm">
                <InsightsHeader headingTitle={BUSINESSES} />
              </div>
              <div className="col-md-auto col-sm-auto text-xl-center">
                <button type="button" className="btn btn-primary" onClick={showBusinessModal}>Add Business</button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-section section-padding">
          <div className="container pb-40 pt-40">
            { businessObj !== null && businessObj !== undefined && (
              Object.entries(businessObj).map(([key, value]) => (
                key === APPS && (
                  businessObj[APPS].map(business => (
                  <Link className="business-item" to={FAVORITES} key={business.id}>
                    <div className="listing-item">
                      <div className="align-items-center gy-3 row">
                        <div className="col-xl-4">
                          <h2 className="fw-bold h6 mb-1">{business.name}</h2>
                          <span>{business.url}</span>
                        </div>
                        {businessObj[PLATFORMS].map(platform => (
                          platform.id === business.platform_id && (
                          <div className="col-lg-3 col-sm-6 col-xl" key={platform.id}>
                            <img src={COMPUTER} width={24} height={24} alt="Computer" className="me-2 icon-base" />
                            <span>{platform.name}</span>
                          </div>
                          )
                        ))}
                        {businessObj[VERTICALS].map(vertical => (
                          vertical.id === business.vertical_id && (
                            <div className="col-lg-3 col-sm-6 col-xl" key={vertical.id}>
                              <span>{vertical.name}</span>
                            </div>
                          )
                        ))}
                        <div className="col-lg-3 col-sm-6 col-xl text-xl-center">
                          <h2 className="fw-bold h5 mb-0">{business.insights_today_count}</h2>
                          <span className="text-muted-2">insights today</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  ))
                )
              ))
            )}
          </div>
        </section>
      </main>
      <Modal className="modal fade" show={isBusinessModalOpen} onHide={hideBusinessModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="modal-content border-0 rounded-0">
          <div className="modal-body">
            <h2 className="fw-bold h4 mb-40 text-center" id="addBusinessModalLabel">{ADD_BUSINESS}</h2>
            <AddBusiness onClick={showTrackModal} className="btn btn-primary d-block mt-20 w-100" buttonTitle="Continue" />
          </div>
        </div>
      </Modal>
      <Modal className="modal fade" show={isTrackModalOpen} onHide={hideTrackModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="modal-content border-0 rounded-0">
          <div className="modal-body">
            <CopyCode onClick={hideTrackModal} />
          </div>
        </div>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cookie: state.signIn.cookie
  }
}

export default connect(mapStateToProps, null)(InSightsBusiness)
