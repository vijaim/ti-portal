/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from './navigation-tab'
import AddBusiness from '../signup/add-business'
import { HEADING_TITLE, BUSINESSKEYS } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { connect } from 'react-redux'
import { setBusinessById } from '../signin/signin-actions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SettingsBusiness = (props) => {
  const [state, setState] = useState({
    selectedIndex: 0,
    buttonActive: 0,
    businessObj: {},
    businessData: []
  })
  const { selectedIndex, buttonActive, businessObj, businessData } = state
  const { SETTINGS } = HEADING_TITLE
  const { APPS } = BUSINESSKEYS
  const { setBusinessById } = props
  const loginCookie = localStorage.getItem('localLoginCookie')

  const handleBusinessSelect = (index) => {
    setState(() => ({ selectedIndex: index }))
  }

  const handleBusiness = (id) => {
    setState(() => ({ selectedIndex: 0, buttonActive: id, businessObj: businessObj }))
    getBusinessById(id, businessObj)
  }

  const businessLists = () => {
    const loginCookie = localStorage.getItem('localLoginCookie')
    localStorage.setItem('prevPath', props.history.location.pathname)
    NetworkManager.getBusiness(loginCookie).then(response => {
      if (response.data.response_objects.app_ids === null) {
        setState(() => ({ businessObj: {}, selectedIndex: 0 }))
      } else {
        setState(() => ({ businessObj: response.data.response_objects, selectedIndex: 0 }))
        getBusinessById(response.data.response_objects.app_ids[0], response.data.response_objects)
      }
    })
      .catch(error => {
        toast(error.response, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const getBusinessById = (id, businessObj) => {
    const payload = {
      id: id
    }
    NetworkManager.copyTrackCode(payload, loginCookie).then(response => {
      if (response.status === 200) {
        if (response.data.response_objects === null) {
          setState(() => ({ businessData: [] }))
        } else {
          setState(() => ({ businessData: response.data.response_objects, selectedIndex: 0, businessObj: businessObj, buttonActive: id }))
          setBusinessById(response.data.response_objects)
        }
      }
    })
      .catch(error => {
        if (error.response) {
        }
      })
  }

  useEffect(() => {
    businessLists()
    return () => {
      setState({})
    }
  }, [])

  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle={SETTINGS} />
          </div>
        </section>
        <section className="bg-section section-padding-tab">
          <NavigationTab navType="settings" />
          <div className="container pb-40 pt-40">
            <div className="gy-3 mb-40 row">
              <div className="col-md-4 col-lg-3">
                {businessObj &&
                  (Object.entries(businessObj).map(([key, value]) => (
                    key === APPS && (
                      businessObj[APPS].map(business => (
                  <div key={business.id} className="nav flex-column nav-pills me-3 business-tabs" id="business-tab" role="tablist" aria-orientation="vertical">
                    <button className={((buttonActive ? buttonActive === business.id : '') ? 'nav-link active' : 'nav-link')} onClick={() => handleBusiness(business.id)}>{business.name}</button>
                  </div>
                      ))
                    )
                  ))
                  )
                }
              </div>
              {businessObj &&
                (Object.entries(businessObj).map(([key, value]) => (
                  key === APPS && (
                <div className="col-md-8 col-lg-9">
                  <Tabs className="tab-content" selectedIndex={selectedIndex} onSelect={handleBusinessSelect}>
                    <TabPanel className="tab-pane fade show active">
                      <div className="listing-item pt-20 pb-20">
                        <div className="row">
                            <div className="col-xl-8">
                              <AddBusiness className="btn btn-primary" buttonTitle="Save" businessData= {businessData} onClick= {businessLists} />
                            </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabList className="disable">
                      <Tab />
                    </TabList>
                  </Tabs>
                </div>
                  )
                ))
                )
              }
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBusinessById: (businessList) => {
      dispatch(setBusinessById(businessList))
    }
  }
}

export default connect(null, mapDispatchToProps)(SettingsBusiness)
