/* eslint-disable prefer-const */
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
import {
  ROUTES_PATH_NAME, IMAGE_URL, HEADING_TITLE, anosHiddenListFirstFive, IMAGES_ID, PeriodRange, PeriodRangeValue,
  CHART_TYPE_BAR
} from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { setSearchBar } from '../signin/signin-actions'
import { Link } from 'react-router-dom'
import { ImageSaver} from '../../utils/util-methods'
import { v4 as uuidv4 } from 'uuid'
import ChartComponent from './Charts'

let responseList = []
const Favorites = (props) => {
  const {
    TODAY, ORDERS, STAR_ACTIVE, STAR, ARROW_LEFT, HIDDEN, VISIBLE, INCREASE, DECREASE
    // DECREASE, TRANSACTIONS, , CUSTOMERS, PRODUCTS, INCREASE, DISLIKE, LOCATION, LIKE, DISLIKE_ACTIVE, LIKE_ACTIVE,
  } = IMAGE_URL
  const { FAVORITES } = HEADING_TITLE
  const [tabName, setTabName] = useState(props.history.location.pathname.split('/')[3])
  const [anosList, setAnosList] = useState(new Map())
  const [pageNo, setPageNo] = useState(1)
  const [limit, setLimit] = useState(30)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { cookie, userId, searchValue, setSearchBarValue} = props
  const loginCookie = localStorage.getItem('localLoginCookie')
  const user_Id = localStorage.getItem('userId')
  const anosListContainerRef = React.createRef()
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  let [anosGraphList, setAnosGraphList] = useState([])
  const [isGraphData, setIsGraphData] = useState(false)
  let [chartType, setChartType] = useState('Bar')
  let [dateRangePeriod, setDateRangePeriod] = useState('')
  const [chartPageNo, setChartPageNo] = useState(1)
  const outputKey = ['count', 'duration', 'past_count', 'current_count', 'percentage', 'bounce_rate', 'bounces', 'clicks', 'average_session_length', 'avg_time']
  // const [isExpandOpen, setIsExpandOpen] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    inSightsList(tabName, 0)
    return () => {
      // componentWillUnmount events
      setSearchBarValue('')
      setEmptyList(null, false)
      localStorage.setItem('prevPath', '')
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
      localStorage.setItem('prevPath', props.history.location.pathname)
      setIsLoading(false)
      if (response.status === 200 && response.data.response_objects && response.data.response_objects.narratives) {
        const newResponseList = response.data.response_objects
        if (response.data.response_objects.narratives.length >= limit) {
          setIsLoadMore(true)
        } else {
          setIsLoadMore(false)
        }
        const result = getConstructFormat(newResponseList, path)
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
    const responseObject = [];
    (responseList.length > 0) && responseList.map(item => {
      item.isNew = false
      return item
    })
    for (let i = 0; i < data.narratives.length; i++) {
      const narrative = data.narratives[i]
      const innerObj = {}
      let trendPercentage = ''
      let trendIcon = ''
      let isTrendIncrease = false
      if (narrative.trend_value_change !== null && narrative.trend_value !== null) {
        trendPercentage = narrative.trend_value_change > 0 ? `${((narrative.trend_value_change / (narrative.trend_value - narrative.trend_value_change)) * 100).toFixed(1)}%` : `${((narrative.trend_value_change / (narrative.trend_value - narrative.trend_value_change)) * 100).toFixed(1)}%`
        trendIcon = narrative.trend_value_change > 0 ? INCREASE : DECREASE
        isTrendIncrease = (narrative.trend_value_change > 0)
      }
      innerObj.created_at = `${data.anos[i].created_at}`.split('T')[0]
      innerObj.category_name = narrative.category_name
      innerObj.category_image_url = narrative.category_image_url
      innerObj.output_html = narrative.output_html
      innerObj.narrative_id = narrative.narrative_id
      innerObj.values = data.anos[i].values
      innerObj.date_range = data.anos[i].date_range
      innerObj.isNew = (responseList.length > limit - 1)
      innerObj.showTrend = (narrative.trend_value_change > 0 || narrative.trend_value_change < 0)
      innerObj.trendPercentage = trendPercentage
      innerObj.trendIcon = trendIcon
      innerObj.isTrendIncrease = isTrendIncrease
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
    scrollToRef(anosListContainerRef)
  }

  const displayDateFormat = (date) => {
    const dateValue = new Date(date)
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateValue)
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateValue)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateValue)
    return `${month}-${day}-${year}`
  }

  const getChartType = (count, value) => {
    let chartType = 0
    switch (count) {
      case 1:
        if (!isNaN(parseInt(value))) {
          chartType = 1
        }
        break
      case 2:
        chartType = 2
        break
      default:
        chartType = 0
        break
    }
    return chartType
  }

  const goToBussinesMetric = (narrativeInfo) => {
    anosGraphList = []
    const businessMetricInfo = {
      narrativeId: narrativeInfo.narrative_id,
      AppId: JSON.parse(localStorage.getItem('selectedAppsInfo')).id,
      dateRange: narrativeInfo.date_range || 'week'
    }
    localStorage.setItem('businessMetricInfo', JSON.stringify(businessMetricInfo))
    setIsGraphData(true)
    getMetricsList(0, businessMetricInfo.dateRange)
  }

  const getMetricsList = (page, period) => {
    let limitValue = 0
    PeriodRangeValue.map(item => {
      if (item.name === period) {
        limitValue = item.value
      }
      return null
    })
    const params = {
      userId: parseInt(localStorage.getItem('userId')),
      appId: JSON.parse(localStorage.getItem('businessMetricInfo')).AppId,
      narrativeId: JSON.parse(localStorage.getItem('businessMetricInfo')).narrativeId,
      offset: chartPageNo,
      period: period,
      limit: limitValue
    }
    NetworkManager.getBussinessMetricsById(params, localStorage.getItem('localLoginCookie')).then(response => {
      if (response.status === 200 && response.data.response_objects) {
        const valueKeyCount = Object.keys(response.data.response_objects.anos[0].values[0]).length > 0 ? Object.keys(response.data.response_objects.anos[0].values[0]).length : 0
        const chartType = getChartType(valueKeyCount, Object.values(response.data.response_objects.anos[0].values[0])[0])
        let displayData = constructDisplayData(valueKeyCount, chartType, response.data.response_objects)
        setChartType(chartType)
        setAnosGraphList(displayData)
        setDateRangePeriod(period)
        setIsGraphData(false)
      } else {
        setIsGraphData(false)
        setAnosGraphList(['', ''])
      }
    })
      .catch(error => {
        console.log('error', error)
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  const constructDisplayData = (valueKeyCount, chartType, data) => {
    let graphData = [...anosGraphList]
    if (valueKeyCount !== 0) {
      if (anosGraphList.length === 0 || anosGraphList[0] === undefined) {
        if (chartType === 1) {
          graphData.push(['created_at', getResponseOutputKey(data.anos[0].values[0])])
        } else if (chartType === 2) {
          if (isHavePastCount(data.anos[0].values[0])) {
            graphData.push(['created_at', ...Object.keys(data.anos[0].values[0])])
          } else {
            graphData.push(['created_at', getResponseOutputKey(data.anos[0].values[0]), { role: 'annotation'}])
          }
        } else if (chartType === 0) {
          graphData.push(['created_at', Object.keys(data.anos[0].values[0])[0]])
        }
      }
      data.anos.map((item, index) => {
        if (chartType === 1) {
          const valueOne = item.created_at
          const valueTwo = parseInt(Object.values(item.values[0])[0])
          graphData.push([valueOne, valueTwo])
        } else if (chartType === 2) {
          if (isHavePastCount(item.values[0], item.narrative_trend_value)) {
            graphData.push([item.created_at, parseInt(Object.values(item.values[0])[0]), parseInt(Object.values(item.values[0])[1])])
          } else {
            const countIndex = Object.keys(item.values[0]).indexOf(getResponseOutputKey(item.values[0], item.narrative_trend_value))
            const valueOne = item.created_at
            const valueTwo = parseInt(Object.values(item.values[0])[countIndex])
            const valueThree = Object.values(item.values[0])[countIndex === 0 ? 1 : 0]
            graphData.push([valueOne, valueTwo, valueThree])
          }
        } else if (chartType === 0) {
          // const countIndex = Object.keys(item.values[0]).indexOf(getResponseOutputKey(item.values[0], item.narrative_trend_value))
          const valueTwo = Object.values(item.values[0])[0]
          const valueOne = item.created_at
          graphData.push([valueOne, valueTwo])
        }
        return null
      })
    } else {
      const newData = data.narratives
      if (anosGraphList.length > 0) {
        anosList.push(...data.narratives)
        graphData = anosGraphList
      } else {
        graphData = newData
      }
    }
    return graphData
  }

  const isHavePastCount = (item, key) => {
    return getResponseOutputKey(item, key) === 'past_count' || getResponseOutputKey(item, key) === 'current_count'
  }

  const getResponseOutputKey = (response, key) => {
    return Object.keys(response).find(ai => outputKey.indexOf(ai) !== -1)
  }

  const selectPeriodRange = (selectEvent) => {
    setDateRangePeriod(selectEvent.target.value)
    if (chartType !== 'No') {
      let resetData = anosGraphList[0]
      anosGraphList = resetData === undefined ? [] : [resetData]
    }
    getMetricsList(0, selectEvent.target.value)
  }

  const renderTabContent = (tab) => {
    const anosListValues = Array.from(anosList, ([name, value]) => ({ name, value }))
    return anosListValues.map((value, key) => {
      const insightsId = uuidv4()
      value.insightsId = insightsId
      const categoryList = Array.from(value.value, ([name, value]) => ({ name, value }))
      return <div ref={ anosListContainerRef } key={`${value.name}_key_`} className="container pb-20 pt-10 accordion" id='accordionSample'>
        <div id={value.insightsId} className=" gy-3 mb-40 row">
       { searchValue === '' && <h2 className="fw-bold h4 mb-40 text-center text-dark">{displayDateFormat(value.name)}
       <img src={TODAY} style={{cursor: 'pointer'}} width={24} height={24} alt="Computer" data-html2canvas-ignore="true" onClick={() => ImageSaver(value.insightsId, tab)} className="ms-3 icon-base" />
        </h2>}
        { categoryList.map((subvalue, subKey) => {
          const categoryTypeImage = subvalue.value[0].category_image_url ? subvalue.value[0].category_image_url : ORDERS
          const outputvalueCheck = subvalue.value.map(item => `${item.output_html}`.toLowerCase().includes(searchValue.toLowerCase()))
          if (!searchValue !== '' && (`${subvalue.name}`.toLowerCase().includes(searchValue.toLowerCase()) || outputvalueCheck.includes(true))) {
            return <React.Fragment key={`${subvalue.name}_key_`}> <div className="col-lg-3 col-xl-2">
              <h3 className="insightTitle">
                <img src={categoryTypeImage} width={24} height={24} alt="Computer" className="me-2 icon-base" />{`${subvalue.name}`}
              </h3>
            </div>
            <div className="col-lg-9 col-xl-10 ">
            { subvalue.value.map((subvalueItem, anosIndex) => {
              if (!searchValue !== '' && `${subvalueItem.output_html}`.toLowerCase().includes(searchValue.toLowerCase()) || `${subvalue.name}`.includes(searchValue)) {
                return <div key={`${subvalueItem.narrative_id}_key_${anosIndex}`} className={`${subvalueItem.isNew ? 'loadedNewItem_list' : ''} business-listing-item accordion-item ${!subvalueItem.date_range ? 'pointerNone' : ''} `} >
                  {/* <div className="accordion-header" id={`narrative_id_Heading_${subvalueItem.narrative_id}`}> */}
                      <div className="align-items-center gy-2 row accordion-header mx-1 my-2" id={`narrative_id_Heading_${subvalueItem.narrative_id}`}>
                        <div className="col-xl-10">
                                <div className="insightStatus-content d-flex align-items-md-center">
                                {subvalueItem.showTrend && <div className="trendStatus-content">
                                    <img className="insightStatus-icon" src={subvalueItem.trendIcon} alt="Increase Icon" height={8} width={14} />
                                    <span className={`fs--6 fw-bold text-${subvalueItem.isTrendIncrease ? 'success' : 'danger'}`}>{subvalueItem.trendPercentage}</span>
                                </div>}
                                <span className="px-1" dangerouslySetInnerHTML={ {__html: subvalueItem.output_html}} />
                                </div>
                        </div>
                        <div className="col-xl-2">
                          <div className="insightAction d-flex justify-content-evenly align-items-center">
                            <span className={`insightAction-link form-check-label ${subvalueItem.isFavorite ? 'active' : ''}`} onClick={() => iconPressed(subvalueItem, 'favorites')}>
                              <img className="insightAction-icon icon-active" src={!subvalueItem.isFavorite ? STAR_ACTIVE : STAR} alt="Icon Star" height={24} width={24} />
                              <img className="insightAction-icon" src={subvalueItem.isFavorite ? STAR_ACTIVE : STAR} alt="Icon Star" height={24} width={24} />
                            </span>
                            <span className="insightAction-link  mr-5 form-check-label" onClick={() => iconPressed(subvalueItem, 'hiddens')}>
                              <img className="insightAction-icon icon-active" src={!subvalueItem.isHidden ? HIDDEN : VISIBLE} alt="EYE Icon Down Active" height={24} width={24} />
                              <img className="insightAction-icon mt-1" data-html2canvas-ignore="true" src={subvalueItem.isHidden ? HIDDEN : VISIBLE} alt="EYE Icon Down Active" height={24} width={24} />
                            </span>
                            {
                            subvalueItem.date_range ? <span className="accordion-button insightAction-link  mr-5 form-check-label" type="button" data-bs-toggle="collapse" data-bs-target={`#narrative_id_${subvalueItem.narrative_id}`} aria-expanded={anosIndex === 0 ? 'true' : 'false'} aria-controls={`narrative_id_${subvalueItem.narrative_id}`} onClick={() => goToBussinesMetric(subvalueItem)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bar-chart-fill barIcon" viewBox="0 0 16 16">
                                  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                              </span>
                              : <span className="accordion-button insightAction-link inSightAction-PaddingRight mr-40  invisible" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                                  <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                                </svg>
                            </span>
                            }
                          </div>
                        </div>
                      </div>
                  {/* </div> */}
                  <div id={`narrative_id_${subvalueItem.narrative_id}`} className="accordion-collapse collapse" aria-labelledby={`narrative_id_Heading_${subvalueItem.narrative_id}`} data-bs-parent='#accordionSample'>
                      <div className="accordion-body">
                      {
                      // isExpandOpen &&
                      isGraphData ? <div className="d-flex justify-content-center align-items-center" >
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                      </div> : <>
                        <div className="d-flex justify-content-end">
                          <div className="w-25 my-3">
                            <select className="form-select border-primary" aria-label="Default select example" value={dateRangePeriod} onChange={(event) => selectPeriodRange(event)}>
                              {
                                PeriodRange.map(item => {
                                  return <option key={item} value={item}>{item}</option>
                                })
                              }
                            </select>
                          </div>
                        </div>
                        <RenderGraph data={anosGraphList} chartType={chartType} dateRangePeriod={dateRangePeriod} />
                      </>
                    }
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

  const getChartName = (value) => {
    const typeName = (value === 1 || value === 2) ? CHART_TYPE_BAR : 'Line'
    return typeName
  }

  const RenderGraph = ({ data, chartType, dateRangePeriod, anosListContainerRef }) => {
    const period = dateRangePeriod.charAt(0).toUpperCase() + dateRangePeriod.slice(1)
    if (chartType !== 0) {
      return <ChartComponent chartData={data} chartType={getChartName(chartType)} period={period} />
    } else {
      return <div class="table-responsive" style={{height: data.length > 10 ? '400px' : 'auto'}}>
        <table class="table table-striped table-hover" >
            <thead>
            {/* <th scope="col">#</th> */}
            {
              data[0].map(column => {
                return <th scope="col">{column}</th>
              })
            }
            </thead>
            <tbody>
              {
                data.map((row, index) => {
                  if (index !== 0) {
                    return <tr >
                      {/* <td>{index}</td> */}
                      {
                        row.map(row => {
                          return <td>
                            {
                              row
                            }
                            </td>
                        })
                      }
                      </tr>
                  }
                })
              }
            </tbody>
        </table>
      </div>
    }
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
          <NavigationTab appId={apps.id} currentTab={tabName} navType="home" tabRender={setTabValue} />
            <div className="container pb-40 pt-40">
              {/* Insights Data */}
              { anosList.size > 0 ? renderTabContent(tabName) : (tabName === 'favorites' && !isLoading) ? <div className="d-flex flex-column align-items-center justify-content-center">
              <h5 className="fw-bolder">No favorites yet</h5>
              <img className="insightAction-icon my-1" src={STAR} alt="Icon Star" height={200} width={200} />
               <span>Your favorites insights will show up here after you add them to your favorites</span>
               <Link className="text-center pt-20 pb-20" onClick={() => setTabValue({id: 'all'})} to={`${ROUTES_PATH_NAME.FAVORITES}/${apps.id}/all`}>
                <span className="btn btn-primary disabled-link">Add insights to favorites</span>
              </Link>
               </div> : (tabName === 'all' && !isLoading) ? <div className="d-flex flex-column align-items-center justify-content-center">
              <h5 className="fw-bolder">No insights yet</h5>
              {/* <img className="insightAction-icon my-1" src={STAR} alt="Icon Star" height={200} width={200} /> */}
               <span>For new businesses, insights should get generated within 15-30 minutes from the time of setup.</span>
               </div> : null }
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
