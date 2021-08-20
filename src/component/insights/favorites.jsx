/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-new-func */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from '../settings/navigation-tab'
// import { Link } from 'react-router-dom'
import { IMAGE_URL, HEADING_TITLE, anosHiddenListFirstFive } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { setSearchBar } from '../signin/signin-actions'

let responseList = []
const Favorites = (props) => {
  const {
    TODAY, ORDERS, STAR_ACTIVE, STAR, ARROW_LEFT, HIDDEN, VISIBLE
    // DECREASE, TRANSACTIONS, , CUSTOMERS, PRODUCTS, INCREASE, DISLIKE, LOCATION, LIKE, DISLIKE_ACTIVE, LIKE_ACTIVE,
  } = IMAGE_URL
  const { FAVORITES } = HEADING_TITLE
  const [tabName, setTabName] = useState('all')
  const [anosList, setAnosList] = useState(new Map())
  const [pageNo, setPageNo] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { cookie, userId, searchValue, setSearchBarValue} = props
  const loginCookie = localStorage.getItem('localLoginCookie')
  const user_Id = localStorage.getItem('userId')
  useEffect(() => {
    setIsLoading(true)
    inSightsList(tabName, 0)
    return () => {
      // componentWillUnmount events
      setSearchBarValue('')
      setEmptyList(null, false)
    }
  }, [])

  const inSightsList = (path, offSet) => {
    const params = {
      cookie: cookie || loginCookie,
      userId: userId || user_Id,
      type: path === 'all' ? '' : `/${path}`,
      offSet: offSet * limit,
      limit: (limit)
    }
    setIsLoadMore(false)
    setPageNo(offSet)
    NetworkManager.getAnos(params).then(response => {
      setIsLoading(false)
      if (response.status === 200 && response.data.response_objects && response.data.response_objects.narratives) {
        const responseLists = response.data.response_objects
        if (response.data.response_objects.narratives.length >= limit) {
          setIsLoadMore(true)
        } else {
          setIsLoadMore(false)
        }
        const result = getConstructFormat(responseLists, path)
        setAnosList(result)
      }
    })
      .catch(error => {
        setIsLoading(true)
        console.log('error', error)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const getConstructFormat = (data, tab) => {
    const responseObject = []
    for (let i = 0; i < data.narratives.length; i++) {
      const narrative = data.narratives[i]
      const innerObj = {}
      innerObj.created_at = `${data.anos[i].created_at}`.split('T')[0]
      innerObj.category_name = narrative.category_name
      innerObj.category_image_url = narrative.category_image_url
      innerObj.output_html = narrative.output_html
      innerObj.narrative_id = narrative.narrative_id
      innerObj.values = data.anos[i].values
      innerObj.date_range = data.anos[i].date_range
      innerObj.isFavorite = tab === 'favorites' ? true : (data.favourite_ids) ? data.favourite_ids.includes(narrative.narrative_id) : false
      innerObj.isHidden = (tab === 'hiddens')
      responseObject.push(innerObj)
    }
    Array.prototype.push.apply(responseList, responseObject)
    const dateMap = new Map()
    for (let i = 0; i < responseList.length; i++) {
      const resObj = responseList[i]
      const dateKey = resObj.created_at
      let dateCategoryMap = dateMap.get(dateKey)
      if (dateCategoryMap === undefined) {
        dateCategoryMap = new Map()
      }
      let valueList = dateCategoryMap.get(resObj.category_name)
      if (valueList === undefined) {
        valueList = []
      }
      valueList.push(resObj)
      dateCategoryMap.set(resObj.category_name, valueList)
      dateMap.set(dateKey, dateCategoryMap)
    }

    return dateMap
  }

  const setTabValue = (tab) => {
    setIsLoading(true)
    setTabName(tab.id)
    setEmptyList(tab.id, true)
  }

  const setEmptyList = (tabName, isRequestFlag) => {
    responseList = []
    setAnosList(new Map())
    if (isRequestFlag) {
      inSightsList(tabName, 0)
    }
  }

  const iconPressed = (item, action) => {
    if ((action === 'favorites' && item.isFavorite) || (action !== 'favorites' && tabName === 'hiddens')) {
      deleteAction(action, item.narrative_id)
    } else {
      putAction(action, item.narrative_id)
    }
  }

  const putAction = (path, narrativeId) => {
    const params = {
      cookie: cookie || loginCookie,
      userId: userId || user_Id,
      narrativeId,
      type: `/${path}`
    }
    NetworkManager.putAnosIconAction(params).then(response => {
      if (response.status === 200) {
        setEmptyList(tabName, true)
      }
    })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const deleteAction = (path, narrativeId) => {
    const params = {
      cookie: cookie || loginCookie,
      userId: userId || user_Id,
      narrativeId,
      type: `/${path}`
    }
    NetworkManager.deleteAnosIconAction(params).then(response => {
      if (response.status === 200) {
        setEmptyList(tabName, true)
      }
    })
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const loadMoreData = (pageNo) => {
    setIsLoading(true)
    inSightsList(tabName, pageNo + 1)
  }

  const displayDateFormat = (date) => {
    const dateValue = new Date(date)
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateValue)
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateValue)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateValue)
    return `${month}-${day}-${year}`
  }

  const renderTabContent = (tab) => {
    const anosListValues = Array.from(anosList, ([name, value]) => ({ name, value }))
    return anosListValues.map((value, key) => {
      const categoryList = Array.from(value.value, ([name, value]) => ({ name, value }))
      return <div key={`${value.name}_key_`} className="container pb-20 pt-10">
        <div className=" gy-3 mb-40 row">
        <h2 className="fw-bold h4 mb-40 text-center text-dark">{displayDateFormat(value.name)}
          <img src={TODAY} width={24} height={24} alt="Computer" className="ms-3 icon-base" />
        </h2>
        { categoryList.map((subvalue, subKey) => {
          const categoryTypeImage = subvalue.value[0].category_image_url ? subvalue.value[0].category_image_url : ORDERS
          const outputvalueCheck = subvalue.value.map(item => `${item.output_html}`.toLowerCase().includes(searchValue.toLowerCase()))
          if (!searchValue !== '' && (`${subvalue.name}`.toLowerCase().includes(searchValue.toLowerCase()) || outputvalueCheck.includes(true))) {
            return <React.Fragment> <div className="col-lg-3 col-xl-2">
              <h3 className="insightTitle">
                <img src={categoryTypeImage} width={24} height={24} alt="Computer" className="me-2 icon-base" />{`${subvalue.name}`}
              </h3>
            </div>
            <div className="col-lg-9 col-xl-10">
            { subvalue.value.map((subvalueItem, anosIndex) => {
              if (!searchValue !== '' && `${subvalueItem.output_html}`.toLowerCase().includes(searchValue.toLowerCase()) || `${subvalue.name}`.includes(searchValue)) {
                return <div key={`${subvalueItem.narrative_id}_key_${anosIndex}`} className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl-11">
                      <div className="insightStatus-content">
                      <span dangerouslySetInnerHTML={ {__html: subvalueItem.output_html}} />
                      </div>
                    </div>
                    <div className="col-xl-1">
                      <div className="insightAction d-flex justify-content-start align-items-center">
                        <span className="insightAction-link inSightAction-PaddingRight mr-5" onClick={() => iconPressed(subvalueItem, 'hiddens')}>
                          <img className="insightAction-icon mt-1" src={subvalueItem.isHidden ? HIDDEN : VISIBLE} alt="EYE Icon Down Active" height={24} width={24} />
                        </span>
                        <span className={`insightAction-link  ${subvalueItem.isFavorite ? 'active' : ''}`} onClick={() => iconPressed(subvalueItem, 'favorites')}>
                          <img className="insightAction-icon" src={subvalueItem.isFavorite ? STAR_ACTIVE : STAR} alt="Icon Star" height={24} width={24} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              } else {
                return null
              }
            })
            }
            </div>
            </React.Fragment>
          } else {
            return null
          }
        })}
         </div>
    </div>
    })
  }
  const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle={FAVORITES} businessName={apps.name} />
          </div>
        </section>
        <section className="bg-section">
          <NavigationTab currentTab={tabName} navType="home" tabRender={setTabValue} />
            <div className="container pb-40 pt-40">
              {/* Insights Data */}
              { anosList.size > 0 && renderTabContent(tabName)}
              {/* Insights Data end */}
              {isLoading && <div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
              {isLoadMore && <div className="text-center pt-20 pb-20" onClick={() => loadMoreData(pageNo, limit)}>
                <span className="btn btn-primary disabled-link"><img className="btn-icon" src={ARROW_LEFT} alt="Arrow Left" height={16} width={16} />Load More</span>
              </div>}
            </div>
        </section>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cookie: state.signIn.cookie,
    userId: state.signIn.userId,
    searchValue: state.signIn.searchValue
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setSearchBarValue: (value) => {
      dispatch(setSearchBar(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
