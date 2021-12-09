/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from './navigation-tab'
import AddBusiness from '../signup/add-business'
import {
  BUSINESS_SETTINGS_TAB, HEADING_TITLE, IMAGE_URL, ROUTES_PATH_NAME, DELETE_MODAL_CONFIRM, BUTTON_NAME_YES, BUTTON_NAME_NO,
  BUTTON_NAME_OK, MODAL_BUSINESS_TITLE, ERROR_MESSAGE_NETWORK, MODAL_TITLE_DELETE_CUSTOM_NARRATIVE, MODAL_TITLE_CUSTOM_NARRATIVE_DELETE
} from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { connect } from 'react-redux'
import { setBusinessById } from '../signin/signin-actions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'

const SettingsBusiness = (props) => {
  const [state, setState] = useState({
    selectedIndex: 0,
    buttonActive: 0,
    businessObj: {},
    businessData: [],
    isLoader: false
  })
  const { ARROW_LEFT } = IMAGE_URL
  const { buttonActive, isLoader } = state
  const [businessId, setBusinessId] = useState(props.match.params?.id ? parseInt(props.match.params.id) : 0)
  const [businessMap, setBusinessMap] = useState(new Map())
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [tabName, setTabName] = useState('general')
  const { SETTINGS_BUSINESS, FAVORITES, CREATECUSTOMMETRIC } = ROUTES_PATH_NAME
  const { SETTINGS } = HEADING_TITLE
  const { setBusinessById } = props
  const loginCookie = localStorage.getItem('localLoginCookie')
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  const anosListContainerRef = React.createRef()
  const [customOffset, setCustomOffset] = useState(0)
  const [customLimit, setCustomLimit] = useState(10)
  const [isCustomLoadMore, setIsCustomLoadMore] = useState(false)
  let [modalDetail, setModalDetail] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedCustomNarrative, setSelectedCustomNarrative] = useState('')
  let [customNarrativeList, setCustomNarrativeList] = useState([])
  let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  const [isLoading, setIsLoading] = useState(false)

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
    if (location.pathname.split('/').pop() === 'customInsights') {
      setTabName('customInsights')
      getAllCustomNarratives(0)
    }
    businessLists()
    return () => {
      localStorage.setItem('prevPath', '')
      setState({})
    }
  }, [])

  const getAllCustomNarratives = (offSet) => {
    const params = {
      cookie: loginCookie,
      appId: apps.id,
      offSet: offSet * customLimit,
      limit: customLimit
    }
    setIsCustomLoadMore(false)
    NetworkManager.getAllCustomNarratives(params).then(response => {
      setIsLoading(false)
      if (response.status === 200 && response.data.response_objects.custom_narratives) {
        if (response.data.response_objects.custom_narratives.length >= customLimit) {
          setIsCustomLoadMore(true)
        } else {
          setIsCustomLoadMore(false)
        }
        customNarrativeList = [...customNarrativeList, ...response.data.response_objects.custom_narratives]
        setCustomNarrativeList(customNarrativeList)
        setCustomOffset(offSet)
      }
      setState(() => ({ isLoader: !isLoader }))
    })
      .catch(error => {
        setIsLoading(false)
        console.log('error', error)
        errorModal(error)
      })
  }

  const errorModal = (error) => {
    let modalInfo = {
      title: MODAL_BUSINESS_TITLE,
      message: error === ERROR_MESSAGE_NETWORK ? error : error?.response?.data?.message,
      cancelButtonName: BUTTON_NAME_OK,
      showYesButton: false,
      showNoButton: true
    }
    modalDetail = modalInfo
    setModalDetail(modalDetail)
  }

  const loadMoreCustomData = (pageNo) => {
    setIsLoading(true)
    getAllCustomNarratives(pageNo + 1)
    scrollToRef(anosListContainerRef)
  }

  const Modal = ({ modalDetail, onPress }) => {
    return <Dialog fullWidth open={showModal} onClose={() => onPress('cancel')} aria-labelledby="form-dialog-title" >
    <DialogTitle className="text-primary" id="form-dialog-title">{modalDetail.title}</DialogTitle>
    <DialogContent >
      <DialogContentText>
        {modalDetail.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {modalDetail.showNoButton && <button type="button" onClick={() => onPress('cancel')} className="btn btn-secondary" data-bs-dismiss="modal">{modalDetail.cancelButtonName}</button>}
      {modalDetail.showYesButton && <button type="button" onClick={() => onPress('ok')} className="btn btn-primary">{modalDetail.okButtonName}</button>}
    </DialogActions>
  </Dialog>
  }

  const goToCreateCustomNarrative = (customNarrativeItem) => {
    localStorage.setItem('selectedNarrativeId', customNarrativeItem.id)
    localStorage.setItem('isEdit', true)
  }

  const renderCustomNarratives = () => {
    return <div ref={anosListContainerRef} className="d-flex flex-column justify-content-end mt-2">{customNarrativeList.map((customNarrativeItem, index) => {
      return <div className="d-flex" key={`index_${index}`} >
          <div className="col-12 business-listing-item p-3 d-flex justify-content-between align-items-center">
            <div className="insightStatus-content col-10">
              <span className="px-1" > {customNarrativeItem.name || ''} </span>
            </div>
            <div className="insightAction d-flex ">
              <Link to={`${FAVORITES}/${apps.id}${CREATECUSTOMMETRIC}/${customNarrativeItem.id}`} onClick={() => goToCreateCustomNarrative(customNarrativeItem)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil form-check-label" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </Link>
              <div className="mx-2"></div>
              <svg onClick={() => deleteCustomNarrativeConfirm(customNarrativeItem)} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-trash icon-color mr-1 form-check-label" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </div>
          </div>
      </div>
    }) }
  </div>
  }

  const deleteCustomNarrativeConfirm = (customNarrativeItem) => {
    const modalInfo = {
      title: MODAL_TITLE_CUSTOM_NARRATIVE_DELETE,
      message: DELETE_MODAL_CONFIRM,
      okButtonName: BUTTON_NAME_YES,
      cancelButtonName: BUTTON_NAME_NO,
      showYesButton: true,
      showNoButton: true
    }
    modalDetail = modalInfo
    setSelectedCustomNarrative(customNarrativeItem)
    setModalDetail(modalDetail)
    setShowModal(true)
  }

  const onPressModalButton = (action) => {
    if (action === 'ok') {
      deleteCustomNarratives(selectedCustomNarrative)
      setShowModal(false)
    } else {
      setModalDetail(null)
      setShowModal(false)
      setSelectedCustomNarrative('')
    }
  }

  const deleteCustomNarratives = (customNarrativeItem) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    const params = {
      cookie: loginCookie,
      appId: apps.id,
      narrativeId: customNarrativeItem.id
    }
    NetworkManager.deleteCustomNarrative(params).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        const filterData = customNarrativeList.filter(fiterItem => fiterItem.id !== params.narrativeId)
        customNarrativeList = filterData
        setCustomNarrativeList(customNarrativeList)
      }
    })
      .catch(error => {
        setIsLoading(false)
        console.log('error', error)
        errorModal(error)
      })
  }

  const changeTabName = (id) => {
    if (id === 'customInsights') {
      setTabName(id)
      setIsLoading(true)
      getAllCustomNarratives(0)
    } else {
      setTabName(id)
      if (location.pathname.split('/').pop() === 'customInsights') {
        props.history.push(`${SETTINGS_BUSINESS}/${apps.id}`)
      }
    }
  }
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
                    <div className="row position-relative">
                    <div>
                      {tabName === 'customInsights' && <Link className="text-end pb-20 position-absolute top-0 end-0" to={ `${FAVORITES}/${selectedBusiness.id}/createCustomMetric`} >
                        <span className="btn btn-primary disabled-link">Add Custom Insights</span>
                      </Link>}
                      <nav className="">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          {BUSINESS_SETTINGS_TAB.map((item) => (
                            <button class={`nav-link ${tabName === item.id ? 'active' : ''}`} id={item.id} data-bs-toggle="tab" data-bs-target={item.id} type="button" role="tab" aria-controls={item.id} aria-selected={ tabName === item.id ? 'true' : 'false'} onClick = { () => changeTabName(item.id)}>{item.name}</button>
                          ))}
                        </div>
                      </nav>
                    </div>
                    <div class="tab-content" id="nav-tabContent">
                      <div class={`tab-pane fade ${tabName === 'general' ? 'show active' : 'fade'}`} id="general" role="tabpanel" aria-labelledby="general">
                        <div className="col-xl-8">
                          <AddBusiness className="btn btn-primary" buttonTitle="Save" businessData= {selectedBusiness} onClick= {businessLists} />
                        </div>
                      </div>
                      <div class={`tab-pane fade ${tabName === 'customInsights' ? 'show active' : 'fade'}`} id="customInsights" role="tabpanel" aria-labelledby="customInsights">
                        { customNarrativeList.length > 0
                          ? renderCustomNarratives()
                          : isLoading
                            ? <div className="d-flex justify-content-center align-items-center mt-2" >
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                            : <div className="d-flex flex-column align-items-center justify-content-center">
                            <h5 className="fw-bolder">No custom narratives yet</h5>
                            <span>Your narratives insights will show up here after you add them to your narratives</span>
                            <Link className="text-center pt-20 pb-20" to={ `${SETTINGS_BUSINESS}/${selectedBusiness.id}/createCustomMetric`}>
                              <span className="btn btn-primary disabled-link">Add Custom Narratives</span>
                            </Link>
                          </div>
                        }
                        {isCustomLoadMore && customNarrativeList.length > 0 && <div className="text-center pt-20 pb-20" onClick={() => loadMoreCustomData(customOffset)}>
                          <span className="btn btn-primary disabled-link"><img className="btn-icon" src={ARROW_LEFT} alt="Arrow Left" height={16} width={16} />Load More</span>
                        </div>}
                        {
                          showModal && <Modal
                              modalDetail={modalDetail}
                              onPress = {onPressModalButton}
                            />
                        }
                      </div>
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
