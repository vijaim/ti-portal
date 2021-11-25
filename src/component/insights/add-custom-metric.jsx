/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NetworkManager from '../../network-manager/network-config'
import { CONDITION_DROP, FIELD_THREE, IMAGE_URL, PeriodRange } from '../../utils/constants'
import './insights.css'
import Autocomplete from 'react-autocomplete'

const ThrashIcon = ({ width, height, styles, onPressRemove }) => (
  <svg onClick={onPressRemove} style={styles} xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-trash icon-color ml-1 form-check-label deleteIconSize" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
)
const AddCustomMetric = (props) => {
  const { ADD, FILTER, LINE } = IMAGE_URL
  const [state, setState] = useState({
    showCustomMetric: false,
    showDataField: false,
    showTimePeriod: false,
    showText: false,
    showAddFilter: false,
    loader: false
  })
  let apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
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
  const { showAddFilter, loader } = state
  const handleShowDataField = () => {
    let customNarrativeListObj = {
      data: {
      	metric: { id: 1, aggregator: pickerOptionLookup.aggregator ? pickerOptionLookup.aggregator[0] : 'Average of', time_period: pickerOptionLookup.date_ranges ? pickerOptionLookup.date_ranges[0] : 'yesterday' },
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
    // getFilterMetrics()
    if (localStorage.getItem('selectedNarrativeId') !== 'undefined') {
      getCustomNarrativesById()
    }
  }, [])

  const onChangeFilterValues = (event, index, pickValue, fieldName, addFieldIndex) => {
    customNarrativeList[addFieldIndex]['data'].filters[index][fieldName] = pickValue ? event : event.target.value
    setCustomNarrativeList(customNarrativeList)
    if (fieldName === 'id') {
      let [filter] = responseFilerValues.filter(item => `${item.id}` === event.target.value)
      let lookupList = autoCompleteLookup.filter(item => item.id === filter.id)
      if (lookupList.length === 0) {
        getAutoCompleteLookup(filter.id)
      }
    }
    setState(() => ({ loader: !loader }))
  }

  const handleFieldValueChange = (event, index, fieldName, objName) => {
    customNarrativeList[index]['data'][objName][fieldName] = event.target.value
    setCustomNarrativeList(customNarrativeList)
    setState(() => ({ loader: !loader }))
  }
  const onTextChange = (event, index, fieldName) => {
    customNarrativeList[index][fieldName] = event.target.value
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
      } else {
        checkDataFieldText = dataField['text'].length === 0
        return checkDataFieldText
      }
    })
    return (!checkFields)
  }

  const AddMetric = () => {
    let narrativeId = localStorage.getItem('selectedNarrativeId')
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
        narrative: customNarrativeList
      }
      if (narrativeId !== 'undefined') {
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

  const navigateToPreviousPage = (response, params) => {
    setIsLoading(false)
    if (response.status === 200) {
      props.history.push(`businesses/${params.app_id}/customNarratives`)
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
      narrativeId: localStorage.getItem('selectedNarrativeId'),
      cookie: loginCookie
    }
    NetworkManager.getCustomNarrativesById(params).then(response => {
      setIsLoading(false)
      if (response.status === 200 && response.data.response_objects.custom_narratives) {
        let narrative = response.data.response_objects.custom_narratives.narrative
        setCustomNarrativeList(narrative)
        setState(() => ({ loader: !loader }))
      }
    })
      .catch(error => {
        errorHandle(error)
      })
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
    setShowTextIndex(index)
    setShowText(!showText)
    setState(() => ({ loader: !loader }))
  }
  const AddItemField = ({ iconStyle, container, index, direction, showAddText }) => {
    let marginLeft = { left: container === 'filter' ? '0.5rem' : '0.3rem' }
    return <div className="import-items-tooltip position-relative" data-bs-toggle="tooltip" data-bs-placement="left" style={{ height: 30, minWidth: 30 }}>
      <span className="form-check-label" >
        <img src={ADD} style={iconStyle} onClick = {() => displayText(index)}></img>
      </span >
      {showTextIndex === index && <div className={ `${(showTextIndex === index && showAddText) ? 'visible' : 'invisible'} listing-item import-items-tooltiptext shadow` }style={marginLeft}>
        <div className="align-items-center gy-3">
          <div className="col-lg-3 col-sm-6 col-1">
            <div><span className="form-check-label showAdd_text" onClick= {() => handleShowDataField()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Data field</span></div>
            <div><span className="form-check-label showAdd_text" onClick= {() => handleShowText()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Text</span></div>
          </div>
        </div>
      </div>}
    </div>
  }
  return (
  <>
    <main>
      <section className="bg-section section-padding">
        <div className="container pb-40 pt-40">
          <div className="business-item position-relative">
            <div className="listing-item d-flex flex-column justify-content-between mb-5" style={{ display: 'flex', paddingTop: '20px' }}>
              {/* <p className="d-flex">Example: {textList.length > 0
                ? <p className="mx-2"> {customNarrativeList.map((custom, index) => {
                  if (!Object.keys(custom).includes('data')) {
                    return <p key={`index_${index}`}>{custom}</p>
                  }
                }) }</p>
                : '' }</p> */}
              {customNarrativeList.length === 0 && <div className="d-flex">
                <div className="mx-2">
                    <img src={ADD}></img>
                </div>
                <div className="listing-item" style={{ width: 120 }}>
                  <div className="align-items-center gy-3 row">
                    <div className="col-lg-3 col-sm-6 col-1">
                      <div><span className="form-check-label" onClick= {() => handleShowDataField()} style={{ fontWeight: 'bold', color: 'black', whiteSpace: 'nowrap' }}>Data field</span></div>
                      <div><span className="form-check-label" onClick= {() => handleShowText()} style={{ color: 'black', whiteSpace: 'nowrap' }}>Text</span></div>
                    </div>
                  </div>
                </div>
              </div>}
              <div class="customListcontainer">
              {
                    customNarrativeList.map((addItem, addDataItemIndex) => {
                      if (Object.keys(addItem).includes('data')) {
                        let customNarrative = addItem['data'].filters
                        let metric = addItem['data'].metric
                        let isHaveCustomNarrative = (customNarrative && customNarrative.length > 0)
                        let opList, aggregators
                        if (metric) {
                          opList = responseMetricValues.filter(filterItem => `${filterItem.id}` === `${metric.id}`)
                          aggregators = opList.length > 0 ? opList[0].aggregators : []
                        }
                        return <div key={`customNarrativeList_${addDataItemIndex}`} className={'customListItem d-inline-flex  g-2 position-relative mx-1'}>
                              {/* <AddItemField iconStyle ={{ marginTop: '1.5rem', width: 25, height: 25, marginRight: '1.5rem' }} index={addDataItemIndex} direction={'prev'}/> */}
                              <div className={`listing-item col-11 border border-2 rounded-3 p-1${addDataItemIndex === 0 ? 'mt-3' : 'mt-2'}`} >
                              <div className="row g-2 position-relative ">
                                {metric && <div className="d-flex" >
                                  <select className="form-select dropdownWidth" aria-label="Business category dataField1" id="id" style={{ marginRight: '10px', width: '10vw' }}
                                    value={metric.id}
                                    onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'id', 'metric')}
                                  >
                                    {responseMetricValues.map((item, index) => (
                                      <option key={item.name} value={item.id} label={item.name} />
                                    ))}
                                  </select>
                                  <select className="form-select dropdownWidth" aria-label="Business category dataField2" id="aggregator" style={{ marginRight: '10px', width: '10vw' }}
                                    value={metric.aggregator}
                                    onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'aggregator', 'metric')}
                                  >
                                    {aggregators.map((item, index) => (
                                      <option key={item} value={item} label={item} />
                                    ))}
                                  </select>
                                  <select className="form-select dropdownWidth" aria-label="Business category dataField3" id="time_period" style={{ marginRight: '10px', width: '10vw' }}
                                    value={metric.time_period}
                                    onChange={(e) => handleFieldValueChange(e, addDataItemIndex, 'time_period', 'metric')}
                                  >
                                    {pickerOptionLookup.date_ranges && pickerOptionLookup.date_ranges.map((item, index) => (
                                      <option key={item} value={item} label={item} />
                                    ))}
                                  </select>
                                  {/* <div className='vertical-line' style={{ marginBottom: showAddFilter ? '-92%' : '-38%' }}></div> */}
                                  <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'metric')} styles={{ marginLeft: '0%' }} width={20} height={20}/>
                                </div>}
                                { isHaveCustomNarrative && customNarrative.map((customFilterItem, customItemIndex) => {
                                  let opList = responseFilerValues.filter(item => `${item.id}` === `${customFilterItem.id}`)
                                  let { id, operators } = opList.length > 0 ? opList[0] : []
                                  return <div key={`customFilterItem_${addDataItemIndex}_${customItemIndex}`} className="d-flex g-2 mt-3"
                                    style={{ marginTop: '1%', display: 'flex', paddingRight: 0 }}>
                                      <img src={FILTER} className="filterIcon" style={{ width: '3%', height: '2%', marginTop: '1%', marginRight: '2%' }}></img>
                                      {customItemIndex !== 0 && <select className="form-select" aria-label="And" id="inputPlatform" style={{ marginRight: '2%', width: '6vw' }}
                                      value={customFilterItem.condition}
                                      onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'condition', addDataItemIndex)}
                                      >
                                        {CONDITION_DROP.map((item, index) => (
                                          <option key={item} value={item} label={item} />
                                        ))}
                                      </select>}
                                      <select className="form-select filterDropDownWidth" aria-label="Referer" id="inputPlatform" style={{ marginRight: '2%', width: '8vw' }}
                                        value={customFilterItem.id}
                                        onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'id', addDataItemIndex)}
                                      >
                                        {responseFilerValues.map((item, index) => (
                                          <option key={item.name} value={item.id} label={item.name}></option>
                                        ))}
                                      </select>
                                      <select className="form-select filterDropDownWidth" aria-label="Is equal to" id="inputPlatform" style={{ marginRight: '2%', width: '8vw' }}
                                        value={customFilterItem.operator}
                                        onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'operator', addDataItemIndex)}
                                      >
                                        {operators && operators.map((item, index) => (
                                          <option key={item} value={item} label={item}></option>
                                        ))}
                                      </select>
                                      <Autocomplete
                                        shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        getItemValue={item => item}
                                        items={ getLookupValue(id) }
                                        renderInput= {(props) => <input {...props} className="form-control" onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'value', addDataItemIndex)}/>}
                                        renderItem={(item, isHighlighted) =>
                                          <p style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', wordBreak: 'break-word', width: 150 }}>
                                          {item}
                                          </p>
                                        }
                                        value={customFilterItem.value}
                                        onSelect={(val) => onChangeFilterValues(val, customItemIndex, true, 'value', addDataItemIndex)}
                                      />
                                      <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'customFilterList', customItemIndex)} width={customItemIndex === 0 ? 20 : 30} height={20} styles={{ marginLeft: customItemIndex === 0 ? '3%' : '1%' }}/>
                                    </div>
                                })}
                                <span><span className="form-check-label text-primary" onClick= {() => handleShowAddFilter(addDataItemIndex)}>Add filter</span></span>
                              </div>
                            </div>
                            <AddItemField showAddText={showText} container="filter" iconStyle ={{ width: 25, height: 25, marginLeft: '0.5rem' }} index={addDataItemIndex} direction={'prev'}/>
                          </div>
                      } else {
                        let textItem = addItem.text
                        return <div className={'customListItem d-inline-flex g-2 position-relative mx-2  mt-2'} style={{ height: '8vw' }}>
                          {/* <AddItemField iconStyle ={{ marginTop: '0.5rem', width: 25, height: 25 }} index={addDataItemIndex} direction={'prev'}/> */}
                          <div key={`textField_${addDataItemIndex}`} className={'shadow w-100 mx-3 p-1 border border-2 rounded-3 d-flex justify-content-start mb-3'} >
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
              <div className={'col-md-auto col-sm-auto text-xl-center d-flex justify-content-end mt-3'} style={{ marginTop: '-4%', marginBottom: '20px' }}>
                {/* <button className="btns mt-20" style={{ color: '#EE5D2C', marginRight: '10px' }}>Delete</button> */}
                <Link to={`businesses/${apps.id}/customNarratives`} className="btns mt-20" style={{ color: '#3557cc', marginRight: '20px' }}>Cancel</Link>
                <button className="btn btn-primary d-block mt-20" style={{ marginRight: '10px' }} onClick={() => AddMetric()}>Save</button>
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
