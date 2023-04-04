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
  ROUTES_PATH_NAME, IMAGE_URL, HEADING_TITLE, PeriodRange, CHART_TYPE_LINE, DELETE_MODAL_CONFIRM, BUTTON_NAME_YES, BUTTON_NAME_NO,
  BUTTON_NAME_OK, MODAL_BUSINESS_TITLE, ERROR_MESSAGE_NETWORK, MODAL_TITLE_DELETE_CUSTOM_NARRATIVE, MODAL_TITLE_CUSTOM_NARRATIVE_DELETE, NAVIGATION_TABS, BLOGS_SUCESS_MODAL_MESSAGE, MODAL_CUSTOM_INSIGHT_TITLE
} from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { setSearchBar } from '../signin/signin-actions'
import { Link } from 'react-router-dom'
import { ImageSaver, GetRoutesPathName } from '../../utils/util-methods'
import { v4 as uuidv4 } from 'uuid'
import ChartComponent from './Charts'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import AddCustomMetric from './add-custom-metric'
import DateRangePicker from './datePicker'
import moment from 'moment'
import { set } from 'date-fns'

let responseList = []
const BlogInsights = (props) => {
  const {
    TODAY, ORDERS, STAR_ACTIVE, STAR, ARROW_LEFT, HIDDEN, VISIBLE, INCREASE, DECREASE
    // DECREASE, TRANSACTIONS, , CUSTOMERS, PRODUCTS, INCREASE, DISLIKE, LOCATION, LIKE, DISLIKE_ACTIVE, LIKE_ACTIVE,
  } = IMAGE_URL
  let timeOutId = 0
  const routePath = GetRoutesPathName()
  const { CREATECUSTOMMETRIC } = ROUTES_PATH_NAME
  const { FAVORITES } = HEADING_TITLE
  const [tabName, setTabName] = useState(props.history.location.pathname.split('/')[3])
  let [tabList, setTabList] = useState([NAVIGATION_TABS[0]])
  const [anosList, setAnosList] = useState(new Map())
  const [pageNo, setPageNo] = useState(1)
  const [limit, setLimit] = useState(30)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isManageTabLoadMore, setIsManageTabLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { cookie, userId, searchValue, setSearchBarValue } = props
  const loginCookie = localStorage.getItem('localLoginCookie')
  const user_Id = localStorage.getItem('userId')
  const anosListContainerRef = React.createRef()
  const manageTabContainerRef = React.createRef()
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  let [anosGraphList, setAnosGraphList] = useState([])
  const [isGraphData, setIsGraphData] = useState(false)
  let [chartType, setChartType] = useState('Bar')
  let [dateRangePeriod, setDateRangePeriod] = useState('')
  const [chartPageNo, setChartPageNo] = useState(1)
  let [periodRange, setPeriodRange] = useState(PeriodRange)
  let [ShowChartId, setShowChartId] = useState(0)
  let [customOffset, setCustomOffset] = useState(0)
  let [customLimit, setCustomLimit] = useState(10)
  let [isShowCustomInsightModal, setIsShowCustomInsightModal] = useState(false)
  let [manageInsightModal, setManageInsightModal] = useState(false)
  let [isCustomLoadMore, setIsCustomLoadMore] = useState(false)
  let [modalDetail, setModalDetail] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  let [selectedCustomNarrative, setSelectedCustomNarrative] = useState('')
  let [customNarrativeList, setCustomNarrativeList] = useState([])
  let [isCustomInsight, setIsCustomInsight] = useState(true) // if you want load custom insight design set true otherwise loads blogInsight design
  let [dateValue, setDateValue] = useState(new Date())
  let [blogList, setBlogList] = useState([])
  let [selectedTab, setSelectedTab] = useState(NAVIGATION_TABS[0])
  let [preViewText, setPreViewText] = useState(null)
  let [autoCompleteValue, setAutoCompleteValue] = useState('')
  let [autoCompleteOptions, setAutoCompleteOptions] = useState([])
  const outputKey = ['count', 'duration', 'past_count', 'current_count', 'percentage', 'bounce_rate', 'bounces', 'clicks', 'average_session_length', 'avg_time']
  // const [isExpandOpen, setIsExpandOpen] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    localStorage.setItem('selectedNarrativeId', undefined)
    getBussinessDetails()
    if (tabName !== 'customNarratives') {
      inSightsList(tabName, 0)
    }
    // blogInSightsList(new Date())
    // getAllCustomNarratives(0)
    return () => {
      // componentWillUnmount events
      setSearchBarValue('')
      setEmptyList(null, false)
      localStorage.setItem('prevPath', '')
    }
  }, [])

  const blogInSightsAll = (customOffset) => {
    let params = {
      cookie: cookie || loginCookie
    }
    setIsLoadMore(false)
    if (!isCustomInsight) {
      NetworkManager.getAllAnbos(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects && response.data.response_objects.app_narrative_blogs) {
          tabList = [...response.data.response_objects.app_narrative_blogs, ...tabList]
          // blogList = [...response.data.response_objects.app_narrative_blogs, ...blogList]
          setTabList(tabList)
          // setBlogList(blogList)
        }
      })
        .catch(error => {
          setIsLoading(true)
          console.log('error', error)
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        })
    } else {
      let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
      params = { ...params, appId: apps.id, offSet: customOffset * customLimit, limit: customLimit }
      NetworkManager.getAllCustomNarratives(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects && response.data.response_objects.custom_narratives) {
          if (response.data.response_objects.custom_narratives.length >= customLimit) {
            setIsManageTabLoadMore(true)
          } else {
            setIsManageTabLoadMore(false)
          }
          tabList = [...response.data.response_objects.custom_narratives, ...tabList]
          selectedTab = tabList[0]
          setSelectedTab(selectedTab)
          // blogList = [...response.data.response_objects.app_narrative_blogs, ...blogList]
          setTabList(tabList)
          blogInSightsList(new Date(), selectedTab.id)
          // setBlogList(blogList)
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
  }
  const getBussinessDetails = (loginCookie) => {
    const payload = {
      cookie: localStorage.getItem('localLoginCookie'),
      appId: props.history.location.pathname.split('/')[2]
    }
    NetworkManager.getBusinessById(payload).then(response => {
      if (response.status === 200) {
        localStorage.setItem('selectedAppsInfo', JSON.stringify(response.data.response_objects))
        blogInSightsAll(0)
      }
    })
      .catch(error => {
        toast(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }
  const blogInSightsList = (date, id) => {
    let params = {
      cookie: cookie || loginCookie,
      userId: userId || user_Id,
      date: moment(date).format('MM-DD-YYYY'),
      id: id
    }
    setIsLoadMore(false)
    if (isCustomInsight) {
      params.id = selectedTab.narrative_id
      params = { ...params, narrativeId: selectedTab.id }
      NetworkManager.getAnosByDate(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects && response.data.response_objects.anos) {
          setBlogList(response.data.response_objects.narratives)
        } else {
          setBlogList([])
        }
      })
        .catch(error => {
          setIsLoading(true)
          console.log('error', error)
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        })
    } else {
      NetworkManager.getAnbosByDate(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects && response.data.response_objects.anbos) {
          setBlogList(response.data.response_objects.anbos)
        } else {
          setBlogList([])
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
  }

  const inSightsList = (path, offSet, date) => {
    const params = {
      cookie: cookie || loginCookie,
      userId: userId || user_Id,
      type: path === 'all' ? '' : `/${path}`,
      offSet: offSet * limit,
      limit: limit,
      date: moment(date || new Date()).format('MM-DD-YYYY')
    }
    setIsLoadMore(false)
    setPageNo(offSet)
    NetworkManager.getOverViewAnosByDate(params).then(response => {
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
      if (narrative.trend_value_change !== null && narrative.trend_value !== null && (narrative.trend_value - narrative.trend_value_change) !== 0) {
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
    selectedTab = tab
    setSelectedTab(selectedTab)
    if (tab.id === 'all') {
      setIsLoadMore(false)
      blogList = []
      setBlogList(blogList)
      setIsCustomLoadMore(false)
      setIsLoading(true)
      setEmptyList(tab.id, tab.id !== 'customNarratives')
    } else {
      setDateValue(new Date())
      blogInSightsList(new Date(), tab.id)
      localStorage.setItem('selectedTab', JSON.stringify(tab))
      // getAllCustomNarratives(0)
    }
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

  const manageLoadMore = (customOffset) => {
    setIsLoading(true)
    blogInSightsAll(customOffset + 1)
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
    setShowChartId(narrativeInfo.narrative_id)
    if (ShowChartId !== narrativeInfo.narrative_id) {
      setIsGraphData(true)
      getMetricsList(0, businessMetricInfo.dateRange)
    }
  }

  const getMetricsList = (page, period) => {
    const params = {
      userId: parseInt(localStorage.getItem('userId')),
      appId: JSON.parse(localStorage.getItem('businessMetricInfo')).AppId,
      narrativeId: JSON.parse(localStorage.getItem('businessMetricInfo')).narrativeId,
      offset: 0,
      period: period,
      limit: 5
    }
    NetworkManager.getBussinessMetricsById(params, localStorage.getItem('localLoginCookie')).then(response => {
      if (response.status === 200 && response.data.response_objects) {
        const valueKeyCount = Object.keys(response.data.response_objects.anos[0].values[0]).length > 0 ? Object.keys(response.data.response_objects.anos[0].values[0]).length : 0
        const chartType = getChartType(valueKeyCount, Object.values(response.data.response_objects.anos[0].values[0])[0])
        let displayData = constructDisplayData(valueKeyCount, chartType, response.data.response_objects)
        setChartType(chartType)
        setAnosGraphList(displayData)
        setPeriodRange(response.data.response_objects.anos[0].narrative_date_ranges)
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
            graphData.push(['created_at', getResponseOutputKey(data.anos[0].values[0]), { role: 'annotation' }])
          }
        } else if (chartType === 0) {
          graphData.push(['created_at', ...Object.keys(data.anos[0].values[0])])
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
          const valueTwo = Object.values(item.values[0])
          const valueOne = item.created_at
          graphData.push([valueOne, ...valueTwo])
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
  const handleDateChange = (date) => {
    setDateValue(date)
    if (selectedTab.id === 'all') {
      responseList = []
      setAnosList(new Map())
      inSightsList(selectedTab.id, 0, date)
    } else {
      blogInSightsList(date, selectedTab.id)
    }
  }
  const renderBlogList = () => {
    let pastDate = tabList.length > 1 ? tabList.filter(item => selectedTab.narrative_id === item.narrative_id) : new Date()
    let insightsId = uuidv4()
    pastDate = (pastDate instanceof Date || pastDate.length === 0) ? pastDate : moment.utc(pastDate[0].created_at)
    return <div id={insightsId} >
      <div ref={anosListContainerRef} className="container pb-20 pt-10 justify-content-center align-items-center  d-flex flex-wrap" id='accordionSample'>
        {blogList.map((item, blogItemIndex) => {
          return <div key={`${blogItemIndex}_key_`} className="insightStatus-content d-flex flex-column position-relative bg-light px-2 justify-content-md-between align-items-md-start mx-2 my-2 w-100 p-3" >
            <div className='position-relative d-flex justify-content-end align-items-center mb-3 w-100'>
              <span className='mt-1 text-dark'>Generated on :</span>
              <div className='d-flex align-items-center'>
                {<DateRangePicker minimumDate={pastDate} disable={false} dateValue={dateValue} dateChange={handleDateChange} />}
                <span className="disabled-link pr-3 mt-1 px-3" onClick={() => editCustomNarratives(selectedTab)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" className="bi bi-pencil icon-color form-check-label" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </span>
                {blogList.length > 0 && <img src={TODAY} style={{ cursor: 'pointer' }} width={20} height={20} alt="Computer" data-html2canvas-ignore="true" onClick={() => ImageSaver(insightsId, selectedTab.name)} className="mt-2 ml-2" />}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: isCustomInsight ? item.output_html : item.output }} />
          </div>
        })}
        {
          blogList.length === 0 && <div className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="fw-bolder">No records found for the selected date.</h5>
            {/* <span>For new businesses, insights should get generated within 15-30 minutes from the time of setup.</span> */}
          </div>
        }
      </div>
    </div>
  }
  const renderTabContent = (tab) => {
    const anosListValues = Array.from(anosList, ([name, value]) => ({ name, value }))
    return anosListValues.map((value, key) => {
      const insightsId = uuidv4()
      value.insightsId = insightsId
      const categoryList = Array.from(value.value, ([name, value]) => ({ name, value }))
      return <div ref={anosListContainerRef} key={`${value.name}_key_`} className="container pb-20 pt-10 accordion" id='accordionSample'>
        <div id={value.insightsId} className=" gy-3 mb-40 row">
          {searchValue === '' && <div className='position-relative d-flex justify-content-end align-items-center mb-3 w-100'>
            <span className='mt-1 text-dark'>Generated on :</span>
            <div className='d-flex align-items-center'>
              {<DateRangePicker minimumDate={false} disable={false} dateValue={dateValue} dateChange={handleDateChange} />}
              <img src={TODAY} style={{ cursor: 'pointer' }} width={24} height={24} alt="Computer" data-html2canvas-ignore="true" onClick={() => ImageSaver(value.insightsId, tab)} className="ms-3 icon-base" />
            </div>
          </div>}
          {categoryList.map((subvalue, subKey) => {
            const categoryTypeImage = subvalue.value[0].category_image_url ? subvalue.value[0].category_image_url : ORDERS
            const outputvalueCheck = subvalue.value.map(item => `${item.output_html}`.toLowerCase().includes(searchValue.toLowerCase()))
            if (!searchValue !== '' && (`${subvalue.name}`.toLowerCase().includes(searchValue.toLowerCase()) || outputvalueCheck.includes(true))) {
              return <React.Fragment key={`${subvalue.name}_key_`}> <div className="col-lg-3 col-xl-2">
                <h3 className="insightTitle">
                  <img src={categoryTypeImage} width={24} height={24} alt="Computer" className="me-2 icon-base" />{`${subvalue.name}`}
                </h3>
              </div>
                <div className="col-lg-9 col-xl-10 ">
                  {subvalue.value.map((subvalueItem, anosIndex) => {
                    if (!searchValue !== '' && `${subvalueItem.output_html}`.toLowerCase().includes(searchValue.toLowerCase()) || `${subvalue.name}`.includes(searchValue)) {
                      return <div key={`${subvalueItem.narrative_id}_key_${anosIndex}`} className={`${subvalueItem.isNew ? 'loadedNewItem_list' : ''} business-listing-item accordion-item ${!subvalueItem.date_range ? 'pointerNone' : ''} `} >
                        {/* <div className="accordion-header" id={`narrative_id_Heading_${subvalueItem.narrative_id}`}> */}
                        <div className="align-items-center justify-content-between gy-2 row accordion-header mx-1 my-2" id={`narrative_id_Heading_${subvalueItem.narrative_id}`}>
                          <div className="col-xl-10">
                            <div className="insightStatus-content d-flex align-items-md-center">
                              {subvalueItem.showTrend && <div className="trendStatus-content">
                                <img className="insightStatus-icon" src={subvalueItem.trendIcon} alt="Increase Icon" height={8} width={14} />
                                <span className={`fs--6 fw-bold text-${subvalueItem.isTrendIncrease ? 'success' : 'danger'}`}>{subvalueItem.trendPercentage}</span>
                              </div>}
                              <span className="px-1" dangerouslySetInnerHTML={{ __html: subvalueItem.output_html }} />
                            </div>
                          </div>
                          <div className="col-xl-2">
                            <div className="insightAction d-flex justify-content-end align-items-center">
                              {/* <span className={`insightAction-link form-check-label ${subvalueItem.isFavorite ? 'active' : ''}`} onClick={() => iconPressed(subvalueItem, 'favorites')}>
                                                                <img className="insightAction-icon icon-active" src={!subvalueItem.isFavorite ? STAR_ACTIVE : STAR} alt="Icon Star" height={24} width={24} />
                                                                <img className="insightAction-icon" src={subvalueItem.isFavorite ? STAR_ACTIVE : STAR} alt="Icon Star" height={24} width={24} />
                                                            </span>
                                                            <span className="insightAction-link  mr-5 form-check-label" onClick={() => iconPressed(subvalueItem, 'hiddens')}>
                                                                <img className="insightAction-icon icon-active" src={!subvalueItem.isHidden ? HIDDEN : VISIBLE} alt="EYE Icon Down Active" height={24} width={24} />
                                                                <img className="insightAction-icon mt-1" data-html2canvas-ignore="true" src={subvalueItem.isHidden ? HIDDEN : VISIBLE} alt="EYE Icon Down Active" height={24} width={24} />
                                                            </span> */}
                              {
                                subvalueItem.date_range ? <span className="accordion-button insightAction-link  mr-5 form-check-label" type="button" data-bs-toggle="collapse" data-bs-target={`#narrative_id_${subvalueItem.narrative_id}`} aria-expanded={anosIndex === 0 ? 'true' : 'false'} aria-controls={`narrative_id_${subvalueItem.narrative_id}`} onClick={() => goToBussinesMetric(subvalueItem)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bar-chart-fill barIcon icon-color" viewBox="0 0 16 16">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                                  </svg>
                                </span>
                                  : <span className="accordion-button insightAction-link inSightAction-PaddingRight mr-40  invisible" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-award icon-color" viewBox="0 0 16 16">
                                      <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
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
                                        periodRange.map(item => {
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
    const typeName = (value === 1 || value === 2) ? CHART_TYPE_LINE : CHART_TYPE_LINE
    return typeName
  }

  const RenderGraph = ({ data, chartType, dateRangePeriod, anosListContainerRef }) => {
    const period = dateRangePeriod.charAt(0).toUpperCase() + dateRangePeriod.slice(1)
    if (chartType !== 0) {
      return <ChartComponent chartData={data} chartType={getChartName(chartType)} period={period} />
    } else {
      return <div className="table-responsive" style={{ height: data.length > 10 ? '400px' : 'auto' }}>
        <table className="table table-striped table-hover" >
          <thead style={{ display: 'flex' }} >
            {/* <th scope="col">#</th> */}
            {
              data[0].map(column => {
                return <th style={{ flex: 1 }} key={column} scope="col">{column}</th>
              })
            }
          </thead>
          <tbody>
            {
              data.map((row, index) => {
                if (index !== 0) {
                  return <tr style={{ display: 'flex' }} key={`${index}_row_index`}>
                    {/* <td>{index}</td> */}
                    {
                      row.map((row, cIndex) => {
                        return <td key={`${cIndex}_index`} style={{ flex: 1, width: 'auto', wordBreak: 'break-word' }}>
                          {
                            row === null ? '-' : row
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

  const getAllCustomNarratives = (offSet, id) => {
    let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    const params = {
      cookie: cookie || loginCookie,
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
        tabList = [...response.data.response_objects.custom_narratives, ...tabList]
        setTabList(tabList)
        setCustomOffset(offSet)
      }
    })
      .catch(error => {
        setIsLoading(false)
        console.log('error', error)
        errorModal(error)
      })
  }

  const loadMoreCustomData = (pageNo) => {
    setIsLoading(true)
    getAllCustomNarratives(pageNo + 1)
    scrollToRef(anosListContainerRef)
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
  const Modal = ({ modalDetail, onPress }) => {
    return <Dialog fullWidth open={showModal || successModal} onClose={() => onPress('cancel')} aria-labelledby="form-dialog-title" >
      <DialogTitle className="text-primary" id="form-dialog-title">{modalDetail.title}</DialogTitle>
      <DialogContent >
        <DialogContentText>
          {modalDetail.message}
          {modalDetail.isNoteEnable && <br />}
          {modalDetail.isNoteEnable && <span><b>Note:</b> Generation of Output will take maximum 30 minutes.</span>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {modalDetail.showNoButton && <button type="button" onClick={() => onPress('cancel')} className="btn btn-secondary" data-bs-dismiss="modal">{modalDetail.cancelButtonName}</button>}
        {modalDetail.showYesButton && <button type="button" onClick={() => onPress('ok')} className="btn btn-primary">{modalDetail.okButtonName}</button>}
      </DialogActions>
    </Dialog>
  }

  const deleteCustomNarrativeConfirm = (customNarrativeItem) => {
    let modalInfo = {
      title: MODAL_TITLE_CUSTOM_NARRATIVE_DELETE,
      message: DELETE_MODAL_CONFIRM,
      okButtonName: BUTTON_NAME_YES,
      cancelButtonName: BUTTON_NAME_NO,
      showYesButton: true,
      showNoButton: true
    }
    modalDetail = modalInfo
    setManageInsightModal(false)
    setSelectedCustomNarrative(customNarrativeItem)
    setModalDetail(modalDetail)
    setShowModal(true)
  }

  const duplicateCustomNarrativeConfirm = (customNarrativeItem) => {
    let params = {
      app_id: customNarrativeItem.app_id,
      user_id: localStorage.getItem('userId'),
      name: `${customNarrativeItem.name} Copy`,
      category_id: customNarrativeItem.category_id,
      narrative: customNarrativeItem.narrative
    }
    NetworkManager.postCustomNarrative(params, loginCookie).then(response => {
      if (response.status === 200) {
        tabList = [NAVIGATION_TABS[0]]
        blogInSightsAll(0)
      }
    })
      .catch(error => {
        errorModal(error)
      })
  }

  const onPressModalButton = (action) => {
    if (action === 'ok') {
      deleteCustomNarratives(selectedCustomNarrative)
      setShowModal(false)
    } else {
      setModalDetail(null)
      setShowModal(false)
      if (typeof selectedCustomNarrative === 'object') {
        setManageInsightModal(true)
      }
      setSelectedCustomNarrative('')
    }
  }

  const handleModalClick = () => {
    setSuccessModal(false)
    setIsLoading(true)
    blogList = []
    tabList = [NAVIGATION_TABS[0]]
    blogInSightsAll(0)
  }

  const deleteCustomNarratives = (customNarrativeItem) => {
    let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    const params = {
      cookie: cookie || loginCookie,
      appId: apps.id,
      narrativeId: customNarrativeItem.id
    }
    if (isCustomInsight) {
      NetworkManager.deleteCustomNarrative(params).then(response => {
        setIsLoading(false)
        if (response.status === 200) {
          let filterData = tabList.filter(fiterItem => fiterItem.id !== params.narrativeId)
          tabList = filterData
          selectedTab = tabList[0]
          setSelectedTab(selectedTab)
          setTabList(tabList)
          setSelectedCustomNarrative('')
          tabList.length > 1 && setManageInsightModal(true)
        }
      })
        .catch(error => {
          setIsLoading(false)
          console.log('error', error)
          errorModal(error)
        })
    } else {
      NetworkManager.deleteAnbos(params).then(response => {
        setIsLoading(false)
        if (response.status === 200) {
          let filterData = tabList.filter(fiterItem => fiterItem.id !== params.narrativeId)
          tabList = filterData
          setTabList(tabList)
          setSelectedCustomNarrative('')
          setManageInsightModal(true)
        }
      })
        .catch(error => {
          setIsLoading(false)
          console.log('error', error)
          errorModal(error)
        })
    }
  }

  const editCustomNarratives = (item) => {
    localStorage.setItem('selectedNarrativeId', 67)
    localStorage.setItem('isEdit', true)
    localStorage.setItem('selectedTab', JSON.stringify(item))
    setSelectedTab(item)
    setTimeout(() => {
      setManageInsightModal(false)
      setIsShowCustomInsightModal(true)
    }, 1000)
  }
  const renderCustomNarratives = () => {
    return <div ref={manageTabContainerRef} className="d-flex flex-column justify-content-end">{tabList.map((customNarrativeItem, index) => {
      if (customNarrativeItem.id !== 'all') {
        return <div className="d-flex" key={`index_${index}`} >
          <div className="col-12 business-listing-item p-3 d-flex justify-content-between align-items-center">
            <div className="insightStatus-content col-10">
              <span className="px-1" > {isCustomInsight ? customNarrativeItem.name : customNarrativeItem.title ?? 'null'} </span>
            </div>
            <div className="insightAction d-flex ">
              <span onClick={() => editCustomNarratives(customNarrativeItem)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil icon-color form-check-label" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </span>
              <div className="mx-2"></div>
              <svg onClick={() => deleteCustomNarrativeConfirm(customNarrativeItem)} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-trash icon-color mr-1 form-check-label" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
              <div className="mx-2"></div>
              <svg onClick={() => duplicateCustomNarrativeConfirm(customNarrativeItem)} version="1.0" fill='currentColor' className=" icon-color mr-1 form-check-label" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 50 50">
                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                  <path d="M190 473 c0 -16 5 -35 10 -43 7 -11 10 -7 10 18 l0 32 75 0 75 0 0
                              -60 0 -60 60 0 60 0 0 -130 0 -130 -75 0 c-43 0 -75 -4 -75 -10 0 -6 35 -10
                              85 -10 l85 0 0 148 0 148 -63 62 -63 62 -92 0 -92 0 0 -27z m235 -53 l39 -40
                              -42 0 -42 0 0 40 c0 22 1 40 3 40 2 0 21 -18 42 -40z"/>
                  <path d="M0 210 l0 -210 155 0 155 0 0 148 0 148 -63 62 -63 62 -92 0 -92 0 0
                              -210z m170 130 l0 -60 60 0 60 0 0 -130 0 -130 -135 0 -135 0 0 190 0 190 75
                              0 75 0 0 -60z m65 0 l39 -40 -42 0 -42 0 0 40 c0 22 1 40 3 40 2 0 21 -18 42
                              -40z"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      }
    })}
      {isLoading && <div className="d-flex justify-content-center align-items-center" >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      {isManageTabLoadMore && <div className="text-center pt-20 pb-20" onClick={() => manageLoadMore(customOffset, limit)}>
        <span className="btn btn-primary disabled-link"><img className="btn-icon" src={ARROW_LEFT} alt="Arrow Left" height={16} width={16} />Load More</span>
      </div>}
    </div>
  }

  const handleCustomInsightModal = (flag, isServiceCall) => {
    setIsShowCustomInsightModal(flag)
    if (isServiceCall) {
      let modalInfo = {
        title: HEADING_TITLE.FAVORITES,
        message: BLOGS_SUCESS_MODAL_MESSAGE,
        cancelButtonName: BUTTON_NAME_OK,
        showYesButton: false,
        showNoButton: true,
        isNoteEnable: false
      }
      modalDetail = modalInfo
      setModalDetail(modalDetail)
      setSuccessModal(true)
    }
  }

  const manageInsightsModal = () => {
    setManageInsightModal(true)
  }

  const closeModal = () => {
    localStorage.removeItem('selectedNarrativeId')
    localStorage.setItem('isEdit', false)
    setManageInsightModal(false)
    setIsShowCustomInsightModal(false)
  }

  const autoCompleteValueChange = (value, isPickerClicked, item) => {
    if (isPickerClicked) {
      setAutoCompleteValue(value)
      if (!item.custom_title) {
        setTabValue(NAVIGATION_TABS[0])
      } else {
        setTabValue(...tabList.filter(filterItem => filterItem.narrative_id === item.narrative_id))
      }
    } else {
      // setAutoCompleteValue(value)
      if (value.length > 2) {
        if (timeOutId > 0) {
          clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(() => {
          getAutoCompleteValue(value)
        }, 500)
      }
      value.length <= 2 && setAutoCompleteOptions([])
    }
  }

  const getAutoCompleteValue = (value) => {
    let params = {
      appId: apps.id,
      offSet: customOffset * customLimit,
      limit: customLimit,
      cookie: cookie || loginCookie,
      searchText: value,
      userId: userId || user_Id,
      date: moment(new Date()).format('YYYY-MM-DD')
    }
    NetworkManager.getSearchAnos(params).then(response => {
      setIsLoading(false)
      if (response.status === 200 && response.data.response_objects && response.data.response_objects.search_anos) {
        if (response.data.response_objects.search_anos.length >= customLimit) {
          setIsManageTabLoadMore(true)
        } else {
          setIsManageTabLoadMore(false)
        }
        autoCompleteOptions = [...response.data.response_objects.search_anos]
        setAutoCompleteOptions(autoCompleteOptions)
      } else {
        setAutoCompleteOptions([])
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
  const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader autoCompleteOption={autoCompleteOptions} autoCompleteValue={autoCompleteValue} autoCompleteValueChange={autoCompleteValueChange} isDisableManageBtn={tabList.length > 1} currentTab={tabName} headingTitle={FAVORITES} businessName={apps.name} manageInsights={manageInsightsModal} />
          </div>
        </section>
        <section className="bg-section">
          <div className="container position-relative d-flex justify-content-between">
            <div>
              <nav className="nav page-tabs ">
                {
                  tabList.map((navTab, index) => (
                    <span
                      key={navTab.id}
                      className={(selectedTab.id === navTab.id) ? 'nav-link active' : 'nav-link'}
                      onClick={() => setTabValue(navTab)}
                    >
                      {navTab.id === 'all' ? navTab.name : isCustomInsight ? navTab.name : navTab.title ?? 'null'}
                    </span>
                  ))
                }
              </nav>
            </div>
            <div className='d-flex align-items-center justify-content-between action-container'>
              {/* {selectedTab.id !== 'all' && <span className="btn btn-primary disabled-link h5 pr-2 mx-auto" style={{ fontSize: 14 }} onClick={() => editCustomNarratives(selectedTab)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-pencil form-check-label" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </span>} */}
              {/* <span className="btn btn-primary disabled-link h4 addCustomBtn" onClick={() => setIsShowCustomInsightModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
              </span> */}
            </div>
          </div>
          <div className="container pb-40 pt-40">
            {/* Insights Data */}
            {(selectedTab.id !== 'all') ? renderBlogList() : (anosList.size > 0) ? renderTabContent(tabName) : (tabName === 'all' && !isLoading) ? <div className="d-flex flex-column align-items-center justify-content-center">
              <h5 className="fw-bolder">No insights yet</h5>
              {<DateRangePicker minimumDate={false} disable={false} dateValue={dateValue} dateChange={handleDateChange} />}
              <span>For new businesses, insights should get generated within 15-30 minutes from the time of setup.</span>
            </div> : null}
            {/* Insights Data end */}
            {isLoading && selectedTab.id === 'all' && <div className="d-flex justify-content-center align-items-center" >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}
            {/* {(isLoadMore && selectedTab.id === 'all') && <div className="text-center pt-20 pb-20" onClick={() => loadMoreData(pageNo, limit)}>
                            <span className="btn btn-primary disabled-link"><img className="btn-icon" src={ARROW_LEFT} alt="Arrow Left" height={16} width={16} />Load More</span>
                        </div>} */}
          </div>
          {
            showModal && <Modal
              modalDetail={modalDetail}
              onPress={onPressModalButton}
            />
          }{
            successModal && <Modal
              modalDetail={modalDetail}
              onPress={handleModalClick}
            />
          }
          {
            (isShowCustomInsightModal || manageInsightModal) && <Dialog disableBackdropClick={!manageInsightModal} maxWidth={'lg'} fullWidth open={isShowCustomInsightModal || manageInsightModal} onClose={() => closeModal()} aria-labelledby="form-dialog-title" >
              <Grid container direction="row" justify="space-between" alignItems="center" >
                <DialogTitle className="text-primary" id="form-dialog-title">
                  {`${manageInsightModal ? 'Manage' : localStorage.getItem('isEdit') === 'true' ? 'Edit' : 'Create'} Insights`}
                </DialogTitle>
                {!manageInsightModal && <DialogActions>
                  <svg onClick={() => handleCustomInsightModal(false)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </DialogActions>}
              </Grid>
              <DialogContent >
                {
                  manageInsightModal ? renderCustomNarratives() : <AddCustomMetric isCustomInsight={isCustomInsight} dateValue={dateValue} isDisplayByModal={true} customInsightId={selectedTab.id} isEdit={localStorage.getItem('isEdit')} handleModal={handleCustomInsightModal} />}
              </DialogContent>
            </Dialog>
          }
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
export default connect(mapStateToProps, mapDispatchToProps)(BlogInsights)
