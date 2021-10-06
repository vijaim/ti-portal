/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from './navigation-tab'
import AddBusiness from '../signup/add-business'
import { HEADING_TITLE, ROUTES_PATH_NAME } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { connect } from 'react-redux'
import { setBusinessById } from '../signin/signin-actions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const SettingsBusiness = (props) => {
  const [state, setState] = useState({
    selectedIndex: 0,
    buttonActive: 0,
    businessObj: {},
    businessData: []
  })
  const { buttonActive } = state
  const [businessId, setBusinessId] = useState(props.match.params?.id ? parseInt(props.match.params.id) : 0)
  const [businessMap, setBusinessMap] = useState(new Map())
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const { SETTINGS_BUSINESS } = ROUTES_PATH_NAME
  const { SETTINGS } = HEADING_TITLE
  const { setBusinessById } = props
  const loginCookie = localStorage.getItem('localLoginCookie')

  const handleBusiness = (id) => {
    console.log('   ', businessId, ' ', id)
    if (businessId !== id) {
      setBusinessMap(businessMap)
      setState(() => ({ buttonActive: id }))
      getBusinessById(id, businessMap)
    }
  }

  const businessLists = () => {
    setBusinessId(props.match.params?.id ? parseInt(props.match.params.id) : 0)
    const loginCookie = localStorage.getItem('localLoginCookie')
    NetworkManager.getBusiness(loginCookie).then(response => {
      if (response.data.response_objects.app_ids === null) {
        setBusinessMap(new Map())
      } else {
        const newResponseList = response.data.response_objects
        const businessList = constructBussinessList(newResponseList)
        setBusinessMap(businessList)
        const id = (businessId === 0) ? response.data.response_objects.app_ids[0] : businessId
        setSelectedBusiness({})
        getBusinessById(id, businessList)
      }
    })
      .catch(error => {
        toast(error.response, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const constructBussinessList = (data) => {
    const businessMap = new Map()
    for (let i = 0; i < data.apps.length; i++) {
      const apps = data.apps[i]
      businessMap.set(apps.id, apps)
    }

    return businessMap
  }

  const getBusinessById = (id, businessObj) => {
    const payload = {
      id: id
    }
    NetworkManager.copyTrackCode(payload, loginCookie).then(response => {
      if (response.status === 200) {
        if (response.data.response_objects === null) {
          setSelectedBusiness({})
        } else {
          setBusinessId(id)
          setState(() => ({ buttonActive: id }))
          setBusinessMap(businessObj)
          setSelectedBusiness(response.data.response_objects)
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
      localStorage.setItem('prevPath', '')
      setState({})
    }
  }, [])
  const businessList = Array.from(businessMap, ([name, value]) => ({ name, value }))
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
                {
                 businessList && businessList.map((item, key) => {
                   return <div key={item.value.id} className="nav flex-column nav-pills me-3 business-tabs" id="business-tab" role="tablist" aria-orientation="vertical">
                    <Link to={`${SETTINGS_BUSINESS}/${item.value.id}`} className={((buttonActive ? buttonActive === parseInt(item.value.id) : '') ? 'nav-link active' : 'nav-link')} onClick={() => handleBusiness(item.value.id)}>{item.value.name}</Link>
                  </div>
                 })
                }
              </div>
              {
               Object.keys(selectedBusiness).length > 0 && <div className="col-md-8 col-lg-9">
                  <div className="listing-item pt-20 pb-20">
                    <div className="row">
                        <div className="col-xl-8">
                          <AddBusiness className="btn btn-primary" buttonTitle="Save" businessData= {selectedBusiness} onClick= {businessLists} />
                        </div>
                    </div>
                  </div>
                </div>
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
