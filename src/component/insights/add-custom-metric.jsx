/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState, useRef } from 'react'
import InsightsHeader from './insights-header'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NetworkManager from '../../network-manager/network-config'
import { BOOLEAN_VALUES, CONDITION_DROP, FIELD_THREE, IMAGE_URL, PeriodRange, ROUTES_PATH_NAME, HEADING_TITLE } from '../../utils/constants'
import './insights.css'
import Autocomplete from 'react-autocomplete'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import Select from 'react-select'

const ThrashIcon = ({ width, height, styles, onPressRemove }) => (
  <svg onClick={onPressRemove} style={styles} xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-trash icon-color ml-1 form-check-label deleteIconSize" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
)
const AddCustomMetric = (props) => {
  const { FAVORITES, SETTINGS_BUSINESS } = ROUTES_PATH_NAME
  const { ADD, FILTER, LINE } = IMAGE_URL
  const [state, setState] = useState({
    showCustomMetric: false,
    showDataField: false,
    showTimePeriod: false,
    showText: false,
    showAddFilter: false,
    loader: false
  })
  const [metricId, setMetricId] = useState([])
  const [metricAggregator, setMetricAggregator] = useState([])
  const [metricDataIndex, setMetricDataIndex] = useState([])
  const [customFilterCondition, setCustomFilterCondition] = useState([])
  const [customFilterId, setCustomFilterId] = useState([])
  const [customFilterOperator, setCustomFilterOperator] = useState([])
  let ref = useRef(null)
  let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  let selectedInsight = JSON.parse(localStorage.getItem('selectedTab'))
  const loginCookie = localStorage.getItem('localLoginCookie')
  let [responseFilerValues, setFilterValues] = useState([])
  let [responseMetricValues, setResponseMetricValues] = useState([])
  let [customNarrativeList, setCustomNarrativeList] = useState([])
  let [textList, setTextList] = useState([])
  let [pickerOptionLookup, setPickerOptionLookup] = useState([])
  let [autoCompleteLookup, setAutoCompleteLookup] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showTextIndex, setShowTextIndex] = useState('')
  let [richText, setRichText] = useState(EditorState.createEmpty())
  const { showAddFilter, loader } = state
  let isEdit = props.isDisplayByModal ? props.isEdit === 'true' : localStorage.getItem('isEdit') === 'true'
  let customInSightId = props.customInsightId
  let [preViewText, setPreViewText] = useState(null)
  let [title, setTitle] = useState('')
  let [resonseCategoryList, setResonseCategoryList] = useState([])
  let [category, setCategory] = useState('')
  const [isPreviewHighlighted, setIsPreviewHighlighted] = useState(false)
  const handleShowDataField = () => {
    let customNarrativeListObj = {
      data: {
      	metric: { id: 1, aggregator: pickerOptionLookup.aggregator ? pickerOptionLookup.aggregator[0] : 'Average of', date_range: pickerOptionLookup.date_ranges ? pickerOptionLookup.date_ranges[0] : 'yesterday' },
      	filters: []
      }
    }
    customNarrativeList.push(customNarrativeListObj)
    setCustomNarrativeList(customNarrativeList)
    hideShowText()
    setState(() => ({ loader: !loader }))
  }

  const handleShowCustomMetric = (index) => {
    let textObj = { textField: '' }
    textList.push(textObj)
    setTextList(textList)
    setState(() => ({ loader: !loader }))
  }

  const handleShowText = (index) => {
    let textObj = { text: '' }
    customNarrativeList.push(textObj)
    setCustomNarrativeList(customNarrativeList)
    hideShowText()
    setState(() => ({ loader: !loader }))
  }

  const handleShowAddFilter = (index) => {
    let customNarrative = customNarrativeList[index].data.filters
    let filterJsonValue = {
      id: 1,
      operator: 'contains',
      value: '',
      condition: 'AND'
    }
    if (!customNarrative || customNarrative.length === 0) {
      customNarrativeList[index].data.filters = []
      delete filterJsonValue['condition']
      let autoCompleteKeyList = autoCompleteLookup.filter(item => item.id === 1)
      if (autoCompleteKeyList.length === 0) {
        getAutoCompleteLookup(1)
      }
    }
    customNarrativeList[index].data.filters.push(filterJsonValue)
    setCustomNarrativeList(customNarrativeList)
    setState(() => ({ loader: !loader }))
  }

  const hideShowText = () => {
    setShowText(false)
    setShowTextIndex('')
    setState(() => ({ loader: !loader }))
  }

  useEffect(() => {
    getFilterDropdownValues()
    getAllCategory()
    if (isEdit) {
      getCustomNarrativesById()
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      removeNarrativeId()
      closeModal()
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const removeNarrativeId = () => {
    localStorage.removeItem('selectedNarrativeId')
    localStorage.removeItem('selectedTab')
    localStorage.setItem('isEdit', false)
  }
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowTextIndex('')
      setShowText(!showText)
      setState(() => ({ loader: !loader }))
    }
  }

  const onChangeFilterValues = (event, index, pickValue, fieldName, addFieldIndex) => {
    customNarrativeList[addFieldIndex]['data'].filters[index][fieldName] = pickValue ? event : fieldName === 'id' ? parseInt(event.value) : event.value
    if (fieldName === 'value' && !pickValue) {
      customNarrativeList[addFieldIndex]['data'].filters[index][fieldName] = event.value.trim().length === 0 ? event.value.trim() : event.value
    }
    setCustomNarrativeList(customNarrativeList)
    if (fieldName === 'id') {
      let [filter] = responseFilerValues.filter(item => item.id === event.value)
      let lookupList = autoCompleteLookup.filter(item => item.id === filter.id)
      if (filter.data_type === 'boolean') {
        customNarrativeList[addFieldIndex]['data'].filters[index].value = 'true'
      }
      if (lookupList.length === 0 && filter.data_type === 'string') {
        getAutoCompleteLookup(filter.id)
      }
      if (fieldName === 'id') {
        console.log('customFilterId', customFilterId)
        setCustomFilterId(event)
      }
    } else if (fieldName === 'condition') {
      setCustomFilterCondition(event)
    } else if (fieldName === 'operator') {
      setCustomFilterOperator(event)
    } else {
      console.log('fieldName', fieldName)
    }
    setState(() => ({ loader: !loader }))
  }

  const handleFieldValueChange = (event, index, fieldName, objName) => {
    customNarrativeList[index]['data'][objName][fieldName] = fieldName === 'id' ? parseInt(event.value) : event.value
    setCustomNarrativeList(customNarrativeList)
    setState(() => ({ loader: !loader }))
    if (fieldName === 'id') {
      setMetricId(event)
    } else if (fieldName === 'aggregator') {
      setMetricAggregator(event)
    } else {
      setMetricDataIndex(event)
    }
  }
  const onTextChange = (event, index, fieldName) => {
    event.preventDefault()
    customNarrativeList[index][fieldName] = event.target.value.trim().length === 0 ? event.target.value.trim() : event.target.value.replace(/[\r\n]+/gm, ' ')
    setCustomNarrativeList(customNarrativeList)
    setState(() => ({ loader: !loader }))
  }
  const getLookupValue = (itemId) => {
    let [lookupList] = autoCompleteLookup.filter(item => item.id === itemId)
    if (lookupList) {
      return lookupList.list
    }
    return []
  }

  const removeItem = (index, listName, filterIndex) => {
    if (listName === 'textAera') {
      customNarrativeList.splice(index, 1)
      setCustomNarrativeList(customNarrativeList)
    } else if (listName === 'customFilterList') {
      customNarrativeList[index]['data'].filters.splice(filterIndex, 1)
      if (filterIndex === 0 && customNarrativeList[index]['data'].filters.length > 0) {
        delete customNarrativeList[index]['data'].filters[0]['condition']
      }
      setCustomNarrativeList(customNarrativeList)
    } else {
      customNarrativeList.splice(index, 1)
      setCustomNarrativeList(customNarrativeList)
    }
    setState(() => ({ loader: !loader }))
  }

  const ValidateTextField = () => {
    let checkFields = false
    checkFields = customNarrativeList.some(dataField => {
      let checkDataFieldText
      if (Object.keys(dataField).includes('data')) {
        if (dataField['data']['filters']) {
          checkDataFieldText = dataField['data']['filters'].map(filterItem => filterItem.value.length === 0)
          return checkDataFieldText.includes(true)
        } else {
          return false
        }
      } else if (!props.isDisplayByModal) {
        checkDataFieldText = dataField['text'].length === 0
        return checkDataFieldText
      }
    })
    if (title.length === 0 || (category.length === 0 && !props.isDisplayByModal)) {
      checkFields = true
    }
    return (!checkFields)
  }

  const AddMetric = () => {
    let narrativeId = location.pathname.split('/').pop()
    if (ValidateTextField()) {
      customNarrativeList.map(dataField => {
        if (Object.keys(dataField).includes('data')) {
          if (dataField['data']['filters'] && dataField['data']['filters'].length === 0) {
            delete dataField['data']['filters']
          }
          return dataField
        } else {
          dataField['text'] = dataField['text'].replace(/(\r\n|\n|\r)/gm, '')
        }
      })
      let params = {
        app_id: apps.id,
        user_id: localStorage.getItem('userId'),
        name: title,
        category_id: category,
        narrative: customNarrativeList
      }
      if (isEdit) {
        NetworkManager.updateCustomNarrative(params, loginCookie, narrativeId).then(response => {
          navigateToPreviousPage(response, params)
        })
          .catch(error => {
            errorHandle(error)
          })
      } else {
        NetworkManager.postCustomNarrative(params, loginCookie).then(response => {
          navigateToPreviousPage(response, params)
        })
          .catch(error => {
            errorHandle(error)
          })
      }
    } else {
      if (customNarrativeList.length > 0) {
        toast('Pease fill the fields', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  }
  const BlogAddMetric = () => {
    let narrativeId = customInSightId
    if (ValidateTextField()) {
      customNarrativeList.map(dataField => {
        if (Object.keys(dataField).includes('data')) {
          if (dataField['data']['filters'] && dataField['data']['filters'].length === 0) {
            delete dataField['data']['filters']
          }
          return dataField
        }
      })
      let params = {
        app_id: apps.id,
        user_id: localStorage.getItem('userId'),
        title: title,
        narrative: [...customNarrativeList, { text: draftToHtml(convertToRaw(richText.getCurrentContent())) }]
      }
      if (isEdit) {
        NetworkManager.putAnbos(params, loginCookie, narrativeId).then(response => {
          navigateToPreviousPage(response, params)
        })
          .catch(error => {
            errorHandle(error)
          })
      } else {
        NetworkManager.postAnbos(params, loginCookie).then(response => {
          navigateToPreviousPage(response, params)
        })
          .catch(error => {
            errorHandle(error)
          })
      }
    } else {
      if (customNarrativeList.length > 0) {
        toast('Pease fill the fields', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  }
  const previewMetric = () => {
    let narrativeId = location.pathname.split('/').pop()
    if (ValidateTextField()) {
      customNarrativeList.map(dataField => {
        if (Object.keys(dataField).includes('data')) {
          if (dataField['data']['filters'] && dataField['data']['filters'].length === 0) {
            delete dataField['data']['filters']
          }
          return dataField
        }
      })
      let params = {
        app_id: apps.id,
        user_id: localStorage.getItem('userId'),
        name: title,
        category_id: category,
        narrative: customNarrativeList
      }
      setIsPreviewHighlighted(false)
      if (isEdit) {
        NetworkManager.updateCustomNarrative(params, loginCookie, narrativeId).then(response => {
          if (response.status === 200) {
            previewCustomNarrative(params.app_id, loginCookie, narrativeId, true)
          }
        })
          .catch(error => {
            errorHandle(error)
          })
      } else {
        NetworkManager.postCustomNarrative(params, loginCookie).then(response => {
          if (response.status === 200) {
            localStorage.setItem('selectedNarrativeId', response.data.response_objects.id)
            localStorage.setItem('isEdit', true)
            previewCustomNarrative(params.app_id, loginCookie, response.data.response_objects.id, true)
          }
        })
          .catch(error => {
            errorHandle(error)
          })
      }
    } else {
      if (customNarrativeList.length > 0) {
        toast('Pease fill the fields', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  }

  const previewCustomNarrative = (appId, loginCookie, narrativeId, isNavigate) => {
    NetworkManager.previewCustomNarrative(appId, loginCookie, narrativeId).then(response => {
      if (response.status === 200) {
        setPreViewText(response.data.response_objects)
        isNavigate && setIsPreviewHighlighted(true)
        setState(() => ({ loader: !loader }))
        !props.isDisplayByModal && props.history.push(`/businesses/${appId}/createCustomMetric/${narrativeId}`)
      }
    })
      .catch(error => {
        errorHandle(error)
      })
  }

  const navigateToPreviousPage = (response, params) => {
    setIsLoading(false)
    if (response.status === 200) {
      !props.isDisplayByModal ? props.history.push(`${SETTINGS_BUSINESS}/${params.app_id}/customInsights`) : props.handleModal(false, true)
    }
  }

  const errorHandle = (error) => {
    setIsLoading(false)
    setState(() => ({ loader: !loader }))
    if (error.message === 'Network Error') {
      toast(error.message, {
        position: toast.POSITION.TOP_CENTER
      })
    } else if (error?.response?.data?.message) {
      toast(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      toast('Something went to wrong! .', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const getCustomNarrativesById = () => {
    let params = {
      appId: apps.id,
      narrativeId: props.isDisplayByModal ? customInSightId : location.pathname.split('/').pop(),
      cookie: loginCookie
    }
    if (!props.isDisplayByModal) {
      NetworkManager.getCustomNarrativesById(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects.custom_narratives) {
          let narrative = response.data.response_objects.custom_narratives.narrative
          previewCustomNarrative(apps.id, loginCookie, params.narrativeId, false)
          setTitle(response.data.response_objects.custom_narratives.name ?? '')
          setCategory(response.data.response_objects.custom_narratives.category_id ?? '')
          narrative.map(item => {
            if (Object.keys(item).includes('data')) {
              item.data.filters && item.data.filters.map(filterItem => {
                getAutoCompleteLookup(filterItem.id)
              })
            }
          })
          setCustomNarrativeList(narrative)
          setState(() => ({ loader: !loader }))
        }
      })
        .catch(error => {
          errorHandle(error)
        })
    } else {
      NetworkManager.getAnbosById(params).then(response => {
        setIsLoading(false)
        if (response.status === 200 && response.data.response_objects.app_narrative_blog) {
          let app = response.data.response_objects.app_narrative_blog
          let narrative = app.narrative.filter((filterItem, index) => Object.keys(filterItem).includes('data'))
          let text = app.narrative.filter((filterItem, index) => Object.keys(filterItem).includes('text'))
          narrative.map(item => {
            if (Object.keys(item).includes('data')) {
              item.data.filters && item.data.filters.map(filterItem => {
                getAutoCompleteLookup(filterItem.id)
              })
            }
          })
          console.log('text tite ==>', text)
          setTitle(app.title)
          setCustomNarrativeList(narrative)
          const blocksFromHtml = htmlToDraft(text[0].text ?? '')
          const { contentBlocks, entityMap } = blocksFromHtml
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
          setRichText(EditorState.createWithContent(contentState))
          setState(() => ({ loader: !loader }))
        }
      })
        .catch(error => {
          errorHandle(error)
        })
      // if (selectedInsight) {
      //   let app = selectedInsight
      //   let narrative = app.narrative.filter((filterItem, index) => Object.keys(filterItem).includes('data'))
      //   let text = app.narrative.filter((filterItem, index) => Object.keys(filterItem).includes('text'))
      //   narrative.map(item => {
      //     if (Object.keys(item).includes('data')) {
      //       item.data.filters && item.data.filters.map(filterItem => {
      //         getAutoCompleteLookup(filterItem.id)
      //       })
      //     }
      //   })
      //   console.log('text tite ==>', text)
      //   setTitle(app.title)
      //   setCustomNarrativeList(narrative)
      //   setRichText(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(text[0].text ?? ''))))
      //   setState(() => ({ loader: !loader }))
      // }
    }
  }

  const getAutoCompleteLookup = (id) => {
    NetworkManager.getAutoCompleteLookup(apps.id, loginCookie, id).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        let lookupsData = autoCompleteLookup
        let lookupDataKeys
        let newLookupElement = {}
        if (Object.keys(lookupsData).length > 0) {
          lookupDataKeys = Object.keys(lookupsData)
          if (!lookupDataKeys.includes(`${id}`)) {
            newLookupElement.id = id
            newLookupElement.list = response.data.response_objects.lookups ?? []
          }
        } else {
          newLookupElement.id = id
          newLookupElement.list = response.data.response_objects.lookups ?? []
        }
        autoCompleteLookup.push(newLookupElement)
        setAutoCompleteLookup(autoCompleteLookup)
        setState(() => ({ loader: !loader }))
      }
    })
      .catch(error => {
        errorHandle(error)
      })
  }
  const getFilterDropdownValues = () => {
    NetworkManager.getCustomNarrativeLookup(apps.id, loginCookie).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        setFilterValues(response.data.response_objects.filters)
        setResponseMetricValues(response.data.response_objects.metrics)
        setPickerOptionLookup(response.data.response_objects)
        setState(() => ({ loader: !loader }))
      }
    })
      .catch(error => {
        errorHandle(error)
      })
  }
  const getAllCategory = () => {
    NetworkManager.getAllCategory(apps.id, loginCookie).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        setResonseCategoryList(response.data.response_objects)
        setState(() => ({ loader: !loader }))
      }
    })
      .catch(error => {
        errorHandle(error)
      })
  }
  const getFilterMetrics = () => {
    NetworkManager.getFilterMetrics(apps.id, loginCookie).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        setResponseMetricValues(response.data.response_objects.metrics)
        setState(() => ({ loader: !loader }))
      }
    })
      .catch(error => {
        errorHandle(error)
      })
  }

  const displayText = (index) => {
    console.log('displayText')
    setShowTextIndex(index)
    setShowText(!showText)
    setState(() => ({ loader: !loader }))
  }
  const AddItemField = ({ iconStyle, container, index, direction, showAddText }) => {
    let marginLeft = { left: container === 'filter' ? '0.5rem' : '0.3rem' }
    return <div className="import-items-tooltip position-relative" data-bs-toggle="tooltip" data-bs-placement="left" style={{ height: 30, minWidth: 30 }}>
      <span className="form-check-label" >
        <svg onClick = {() => displayText(index)} xmlns="http://www.w3.org/2000/svg" style={iconStyle} width="20" height="20" fill="currentColor" className="bi bi-plus-circle icon-color" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </span >
      {showTextIndex === index && <div ref={ref} className={ `${(showTextIndex === index && showAddText) ? 'visible' : 'invisible'} customListcontainerItem import-items-tooltiptext ${customNarrativeList.length === 0 ? '' : 'toolTopAlign'} shadow` }style={marginLeft}>
        <div className="align-items-center gy-3">
          <div className="col-lg-3 col-sm-6 col-1">
            <div><span className="form-check-label showAdd_text" onClick= {() => handleShowDataField()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Data field</span></div>
            {!props.isDisplayByModal && <div><span className="form-check-label showAdd_text" onClick= {() => handleShowText()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Text</span></div>}
          </div>
        </div>
      </div>}
    </div>
  }

  const handleValueChanges = (event, field) => {
    field === 'name' ? setTitle(event.target.value) : setCategory(parseInt(event.target.value))
    setState(() => ({ loader: !loader }))
  }

  const checkTextField = () => {
    return richText.getCurrentContent().getPlainText().length > 0
  }

  const closeModal = () => {
    selectedInsight = null
    title = ''
    customNarrativeList = []
    richText = EditorState.createEmpty()
    // setTimeout(() => props.handleModal(false), 1000)
  }
  let isbuttonEnable = props.isDisplayByModal ? (customNarrativeList.length > 0 && title.length > 0 && checkTextField()) : (customNarrativeList.length > 0 && title.length > 0 && (typeof category === 'number'))
  return (
  <>
    <main>
      {!props.isDisplayByModal && <section className="bg-white pb-20 position-relative shadow-sm">
        <div className="container">
          <InsightsHeader headingTitle={HEADING_TITLE.CUSTOM_INSIGHTS} />
        </div>
      </section>}
      <section className={`bg-section ${!props.isDisplayByModal ? 'section-padding' : ''}`}>
        <div className="container pb-40 pt-40">
          <div className="business-item position-relative">
            <div className="customListcontainerItem d-flex flex-column justify-content-between mb-5" style={{ display: 'flex', paddingTop: '20px' }}>
              {preViewText ? <p className="d-flex ">Preview: <p className={`${isPreviewHighlighted ? 'bg-warning' : ''}`}>{preViewText}</p></p> : null}
              <div className="d-flex flex-column flex-md-row gx-2 align-items-start justify-content-start mb-2 titleContainer">
                <div className="mb-20">
                  <label htmlFor="title" className="form-label fw-bold">Title</label>
                  <input className="form-control fullWidth" id="title" onChange={(e) => handleValueChanges(e, 'name')} value={title} placeholder="Title" required/>
                </div>
                {!props.isDisplayByModal && <div className="mb-20">
                  <label htmlFor="id" className="form-label fw-bold">Category</label>
                  <select className="form-select fullWidth" aria-label="Business category category" id="id"
                    value={category}
                    onChange={ (e) => handleValueChanges(e, 'category')}
                  >
                    <option disabled label={'Select Category'}/>
                    {resonseCategoryList.map((item, index) => (
                      <option key={item.id} value={parseInt(item.id)} label={item.categories.name} />
                    ))}
                  </select>
                </div>}
              </div>
              {props.isDisplayByModal && <Editor
                // placeholder='Add Title'
                editorState={richText}
                wrapperClassName="title-richTextEditor-wrapper mb-3"
                editorClassName="title-richTextEditor-editor"
                onEditorStateChange={(value) => setRichText(value)}
                toolbarCustomButtons={[
                <main>
                  {props.isDisplayByModal
                    ? <div className='d-flex flex-column'>
                      {/* <label className="form-label fw-bold">Builder</label> */}
                      {customNarrativeList.length === 0 && <AddItemField showAddText={showText} container="filter" iconStyle ={{ width: 20, height: 20, marginLeft: '0.5rem' }} direction={'next'}/>}
                    </div>
                    : customNarrativeList.length === 0 && <div className="d-flex">
                      <div className="mx-2">
                          <img src={ADD}></img>
                      </div>
                      <div className="listing-item" style={{ width: 130 }}>
                        <div className="align-items-center gy-3 row">
                          <div className="col-lg-3 col-sm-6 col-1">
                            <div><span className="form-check-label showAdd_text" onClick= {() => handleShowDataField()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Data field</span></div>
                            {!props.isDisplayByModal && <div><span className="form-check-label showAdd_text" onClick= {() => handleShowText()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Text</span></div>}
                          </div>
                        </div>
                      </div>
                    </div>}
                  <div className="customListcontainer">
                  {
                    customNarrativeList.map((addItem, addDataItemIndex) => {
                      if (Object.keys(addItem).includes('data')) {
                        let customNarrative = addItem['data'].filters
                        let metric = addItem['data'].metric
                        let isHaveCustomNarrative = (customNarrative && customNarrative.length > 0)
                        let opList, aggregators, responseMetric
                        if (metric) {
                          opList = responseMetricValues.filter(filterItem => `${filterItem.id}` === `${metric.id}`)
                          aggregators = opList.length > 0 ? opList[0].aggregators : []
                          responseMetric = responseMetricValues.map((item, index) => ({
                            value: parseInt(item.id),
                            label: item.name,
                            key: item.name
                          }))
                        }
                        return <div key={`customNarrativeList_${addDataItemIndex}`} className={'customListItem d-inline-flex  g-2 position-relative mx-1'}>
                              {/* <AddItemField iconStyle ={{ marginTop: '1.5rem', width: 25, height: 25, marginRight: '1.5rem' }} index={addDataItemIndex} direction={'prev'}/> */}
                              <div className={`customListcontainerItem col-11 border border-2 rounded-3 p-1${addDataItemIndex === 0 ? 'mt-3' : 'mt-2'}`} >
                              <div className="row g-2 position-relative ">
                                {metric && <div className="d-flex justify-content-between " >
                                  <Select className="form-select dropdownWidth" id="id" style={{ marginRight: '10px', width: '11vw' }}
                                    value={metricId}
                                    onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'id', 'metric')}
                                    options={responseMetric}
                                  />
                                  <Select className="form-select dropdownWidth" id="aggregator" style={{ marginRight: '10px', width: '8vw' }}
                                    value={metricAggregator}
                                    onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'aggregator', 'metric')}
                                    options={aggregators.map((item, index) => ({
                                      value: item,
                                      label: item,
                                      key: item
                                    }))}
                                  />
                                  <Select className="form-select dropdownWidth" id="date_range" style={{ marginRight: '10px', width: '9vw' }}
                                    value={metricDataIndex}
                                    onChange={(e) => handleFieldValueChange(e, addDataItemIndex, 'date_range', 'metric')}
                                    options={pickerOptionLookup.date_ranges && pickerOptionLookup.date_ranges.map((item, index) => ({
                                      value: item,
                                      label: item,
                                      key: item
                                    }))}
                                  />
                                  {/* <div className='vertical-line' style={{ marginBottom: showAddFilter ? '-92%' : '-38%' }}></div> */}
                                  <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'metric')} styles={{ marginLeft: '0%' }} width={20} height={20}/>
                                </div>}
                                { isHaveCustomNarrative && customNarrative.map((customFilterItem, customItemIndex) => {
                                  let opList = responseFilerValues.filter(item => `${item.id}` === `${customFilterItem.id}`)
                                  let { id, operators } = opList.length > 0 ? opList[0] : []
                                  let dataType = opList.length > 0 ? opList[0].data_type : []
                                  let dropdownWidth = customItemIndex === 0 ? 'filterDropDownWidth_ZeroIndex' : 'filterDropDownWidth'
                                  return <div key={`customFilterItem_${addDataItemIndex}_${customItemIndex}`} className="d-flex justify-content-between g-2 mt-3"
                                    style={{ marginTop: '1%', paddingRight: 0 }}>
                                      <img src={FILTER} className="filterIcon" style={{ width: '3%', height: '2%', marginTop: '1%' }}></img>
                                      {customItemIndex !== 0 && <Select className={`form-select ${dropdownWidth}`} id="inputPlatform" style={{ maxWidth: 75, fontSize: 12 }}
                                        value={customFilterCondition}
                                        onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'condition', addDataItemIndex)}
                                        options={CONDITION_DROP.map((item, index) => ({
                                          value: item,
                                          label: item,
                                          key: item
                                        }))}
                                      />
                                      }
                                      <Select className={`form-select ${dropdownWidth}`} id="inputPlatform"
                                        value={customFilterId}
                                        onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'id', addDataItemIndex)}
                                        options={responseFilerValues.map((item, index) => ({
                                          value: parseInt(item.id),
                                          label: item.name,
                                          key: item.name
                                        }))}
                                      />
                                      <Select className={`form-select ${dropdownWidth}`} id="inputPlatform"
                                        value={customFilterOperator}
                                        onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'operator', addDataItemIndex)}
                                        options={operators && operators.map((item, index) => ({
                                          value: item,
                                          label: item,
                                          key: item
                                        }))}
                                      />
                                      {
                                        dataType === 'boolean'
                                          ? <Select className={`form-select ${dropdownWidth}`} id="inputPlatform"style={{ marginRight: '2%', width: '8vw' }}
                                              value={customFilterItem.value}
                                              onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'value', addDataItemIndex)}
                                              options={BOOLEAN_VALUES.map((item, index) => ({
                                                value: item.value,
                                                label: item.id,
                                                key: item.id
                                              }))}
                                            />
                                          : <Autocomplete
                                          shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                          getItemValue={item => item}
                                          items={ getLookupValue(id) }
                                          renderInput= {(props) => <input {...props} className={`form-control autocomplete ${dropdownWidth}`} onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'value', addDataItemIndex)}/>}
                                          renderItem={(item, isHighlighted) =>
                                            <p style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', wordBreak: 'break-word', width: 150 }}>
                                            {item}
                                            </p>
                                          }
                                          value={customFilterItem.value}
                                          onSelect={(val) => onChangeFilterValues(val, customItemIndex, true, 'value', addDataItemIndex)}
                                        />
                                      }
                                      <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'customFilterList', customItemIndex)} width={customItemIndex === 0 ? 20 : 10} height={20} />
                                    </div>
                                })}
                                <span><span className="form-check-label text-primary" onClick= {() => handleShowAddFilter(addDataItemIndex)}>Add filter</span></span>
                              </div>
                            </div>
                            <AddItemField showAddText={showText} container="filter" iconStyle ={{ width: 25, height: 25, marginLeft: '0.5rem' }} index={addDataItemIndex} direction={'prev'}/>
                          </div>
                      } else if (!props.isDisplayByModal) {
                        let textItem = addItem.text
                        return <div className={'customListItem d-inline-flex g-2 position-relative mx-2  mt-2 textArea_container'} style={{ height: '8vw' }}>
                          {/* <AddItemField iconStyle ={{ marginTop: '0.5rem', width: 25, height: 25 }} index={addDataItemIndex} direction={'prev'}/> */}
                          <div key={`textField_${addDataItemIndex}`} className={'shadow w-100 mx-3 p-1 border border-2 rounded-3 d-flex justify-content-start mb-lg-3'} >
                            <textarea className="px-1 customTextField " placeholder="please enter the text" value={textItem ?? ''}
                              onChange={(e) => onTextChange(e, addDataItemIndex, 'text')} />
                            <div className=" " style={{ display: 'flex' }}>
                              <img src={LINE}></img>
                              <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'textAera')} styles={{ marginLeft: 5 }} width={22} height={20}/>
                            </div>
                          </div>
                          <AddItemField showAddText={showText} iconStyle ={{ marginTop: '0.5rem', width: 25, height: 25 }} index={addDataItemIndex} direction={'next'}/>
                      </div>
                      }
                    })
                  }
                </div>
              </main>]}
              />}
              <div className={'col-md-auto col-sm-auto text-xl-center d-flex justify-content-end mt-3'} style={{ marginTop: '-4%', marginBottom: '20px' }}>
                {/* <button className="btns mt-20" style={{ color: '#EE5D2C', marginRight: '10px' }}>Delete</button> */}
                 {!props.isDisplayByModal
                   ? <Link to={`${SETTINGS_BUSINESS}/${apps.id}/customInsights`} className="btns mt-20" style={{ color: '#3557cc', marginRight: '20px' }}>Cancel</Link>
                   : <span onClick={() => props.handleModal(false)} className="btns mt-20 form-check-label" style={{ color: '#3557cc', marginRight: '20px' }}>Cancel</span> }
                {!props.isDisplayByModal && <button disabled={!isbuttonEnable} className={`btn ${isbuttonEnable ? 'btn-primary' : 'btn-disabled'} d-block mt-20`} style={{ marginRight: '10px' }} onClick={() => previewMetric('preview')}>Preview</button>}
                <button disabled={!isbuttonEnable} className={`btn ${isbuttonEnable ? 'btn-primary' : 'btn-disabled'} d-block mt-20`} style={{ marginRight: '10px' }} onClick={() => !props.isDisplayByModal ? AddMetric('save') : BlogAddMetric('save')}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
export default AddCustomMetric
