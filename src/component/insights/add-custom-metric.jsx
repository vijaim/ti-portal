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
  <svg onClick={onPressRemove} style={styles} xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-trash icon-color mr-1 form-check-label" viewBox="0 0 16 16">
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
  let [addDataField, setAddDataField] = useState([])
  let [textList, setTextList] = useState([])
  let [autoCompleteLookup, setAutoCompleteLookup] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { showAddFilter, loader } = state
  const handleShowDataField = () => {
    let addDataFieldObj = {
      dataField1: 'Session Duration',
      dataField2: 'Minimum of',
      dataField3: 'Time period',
      filterList: []
    }
    addDataField.push(addDataFieldObj)
    setAddDataField(addDataField)
    setState(() => ({ loader: !loader }))
  }

  const handleShowCustomMetric = (index) => {
    let textObj = { textField: '' }
    textList.push(textObj)
    setTextList(textList)
    setState(() => ({ loader: !loader }))
  }

  const handleShowText = (index) => {
    let textObj = { textField: '' }
    textList.push(textObj)
    setTextList(textList)
    setState(() => ({ loader: !loader }))
  }

  const handleShowAddFilter = (index) => {
    let customNarrative = addDataField[index].filterList
    let filterJsonValue = {
      filterField1: 'Country',
      filterField2: 'contains',
      filterField3: '',
      filterField4: 'AND'
    }
    if (customNarrative.length === 0) {
      delete filterJsonValue['filterField4']
      let autoCompleteKeyList = autoCompleteLookup.filter(item => item.id === 1)
      if (autoCompleteKeyList.length === 0) {
        getAutoCompleteLookup(1)
      }
    }
    addDataField[index].filterList.push(filterJsonValue)
    setAddDataField(addDataField)
    setState(() => ({ loader: !loader }))
  }

  useEffect(() => {
    getFilterDropdownValues()
    getFilterMetrics()
    if (localStorage.getItem('selectedNarrativeId') !== 'undefined') {
      getCustomNarrativesById()
    }
  }, [])

  const onChangeFilterValues = (event, index, pickValue, fieldName, addFieldIndex) => {
    addDataField[addFieldIndex].filterList[index][fieldName] = pickValue ? event : event.target.value
    setAddDataField(addDataField)
    if (fieldName === 'filterField1') {
      let [filter] = responseFilerValues.filter(item => item.name === event.target.value)
      let lookupList = autoCompleteLookup.filter(item => item.id === filter.id)
      if (lookupList.length === 0) {
        getAutoCompleteLookup(filter.id)
      }
    }
    setState(() => ({ loader: !loader }))
  }

  const handleFieldValueChange = (event, index, fieldName) => {
    addDataField[index][fieldName] = event.target.value
    setAddDataField(addDataField)
    setState(() => ({ loader: !loader }))
  }
  const onTextChange = (event, index, fieldName) => {
    textList[index][fieldName] = event.target.value
    setTextList(textList)
    setState(() => ({ loader: !loader }))
  }
  const getLookupValue = (itemId) => {
    let [lookupList] = autoCompleteLookup.filter(item => item.id === itemId)
    console.log('getlookup ==>', itemId)
    console.log('getlookup ==>', lookupList)
    if (lookupList) {
      return lookupList.list
    }
    return []
  }

  const removeItem = (index, listName, filterIndex) => {
    if (listName === 'textList') {
      textList.splice(index, 1)
      setTextList(textList)
    } else if (listName === 'customFilterList') {
      addDataField[index].filterList.splice(filterIndex, 1)
      if (index === 0) {
        delete addDataField[index].filterList[0]['filterField4']
      }
      setAddDataField(addDataField)
    } else {
      addDataField.splice(index, 1)
      setAddDataField(addDataField)
    }
    setState(() => ({ loader: !loader }))
  }

  const AddCustomMetric = () => {
    let params = {
      app_id: apps.id,
      user_id: localStorage.getItem('userId'),
      narrative: {
        customNarratives: addDataField,
        textList: textList
      }
    }
    let narrativeId = localStorage.getItem('selectedNarrativeId')
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
    console.log('errorHandle', error, isLoading)
    if (error === 'Network Error') {
      toast(error, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      toast(error.response.data.message, {
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
        let narrative = JSON.parse(response.data.response_objects.custom_narratives.narrative)
        let dataList = narrative?.customNarratives
        let textList = narrative?.textList
        if (dataList) {
          setAddDataField(dataList)
        } else {
          setAddDataField([])
        }
        if (textList) {
          setTextList(textList)
        } else {
          setTextList([])
        }
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
    NetworkManager.getFilter(apps.id, loginCookie).then(response => {
      setIsLoading(false)
      if (response.status === 200) {
        setFilterValues(response.data.response_objects.filters)
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
  console.log('setIsLoading', isLoading, addDataField, textList, autoCompleteLookup)
  return (
  <>
    <main>
      <section className="bg-section section-padding">
        <div className="container pb-40 pt-40">
          <div className="business-item position-relative">
            <div className="listing-item d-flex flex-column justify-content-between mb-5" style={{ display: 'flex', paddingTop: '20px' }}>
              <p className="d-flex">Example: {textList.length > 0 ? <p className="mx-2"> {textList.map((item, index) => (<p key={`index_${index}`}>{item.textField}</p>)) }</p> : '' }</p>
              <div className="d-flex">
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
              </div>
              <div className="d-flex">
              {addDataField.length > 0 && <div className="col-6 position-relative mx-2">
                {addDataField.length > 0 && <div className="" data-bs-toggle="tooltip" data-bs-placement="left" title="Add DataField" >
                    <span className="form-check-label" onClick= {() => handleShowDataField()} >
                      <img src={ADD}></img>
                    </span >
                  </div>
                }
                { addDataField.length > 0
                  ? addDataField.map((item, addDataItemIndex) => {
                    let customNarrative = item.filterList
                    let isHaveCustomNarrative = (customNarrative.length > 0)
                    let opList = responseMetricValues.filter(filterItem => filterItem.name === item.dataField1)
                    let { aggregators } = opList.length > 0 ? opList[0] : []
                    return <div key={`addDataField_${addDataItemIndex}`} className={`listing-item border border-2 rounded-3 ${addDataItemIndex === 0 ? 'mt-3' : 'mt-2'}`} style={{ display: 'table-caption' }}>
                    <div className="align-items-center gy-3 row position-relative ">
                      <div className="col-lg-3 col-sm-6 col-1" style={{ display: '-webkit-box' }}>
                        <select className="form-select" aria-label="Business category dataField1" id="dataField1" style={{ marginRight: '10px', width: '12vw' }}
                          value={item.dataField1}
                          onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'dataField1')}
                        >
                          {responseMetricValues.map((item, index) => (
                            <option key={item.name} value={item.name} label={item.name} />
                          ))}
                        </select>
                        <select className="form-select" aria-label="Business category dataField2" id="dataField2" style={{ marginRight: '10px', width: '12vw' }}
                          value={item.dataField2}
                          onChange={ (e) => handleFieldValueChange(e, addDataItemIndex, 'dataField2')}
                        >
                          {aggregators.map((item, index) => (
                            <option key={item} value={item} label={item} />
                          ))}
                        </select>
                        <select className="form-select" aria-label="Business category dataField3" id="dataField3" style={{ marginRight: '10px', width: '12vw' }}
                          value={item.dataField3}
                          onChange={(e) => handleFieldValueChange(e, addDataItemIndex, 'dataField3')}
                        >
                          {PeriodRange.map((item, index) => (
                            <option key={item} value={item} label={item} />
                          ))}
                        </select>
                        {/* <div className='vertical-line' style={{ marginBottom: showAddFilter ? '-92%' : '-38%' }}></div> */}
                        <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'customList')} styles={{ marginRight: 10 }} width={20} height={20}/>
                      </div>
                      { isHaveCustomNarrative && customNarrative.map((customFilterItem, customItemIndex) => {
                        let opList = responseFilerValues.filter(item => item.name === customFilterItem.filterField1)
                        let { id, operators } = opList.length > 0 ? opList[0] : []
                        return <div key={`customFilterItem_${addDataItemIndex}_${customItemIndex}`} className=""
                          style={{ marginTop: '1%', display: 'flex', paddingRight: 0 }}>
                            <img src={FILTER} style={{ width: '3%', height: '2%', marginTop: '1%', marginRight: '2%' }}></img>
                            {customItemIndex !== 0 && <select className="form-select" aria-label="And" id="inputPlatform" style={{ marginRight: '2%', width: '6vw' }}
                            value={customFilterItem.filterField4}
                            onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'filterField4', addDataItemIndex)}
                            >
                              {CONDITION_DROP.map((item, index) => (
                                <option key={item} value={item} label={item} />
                              ))}
                            </select>}
                            <select className="form-select" aria-label="Referer" id="inputPlatform" style={{ marginRight: '2%', width: '10vw' }}
                              value={customFilterItem.filterField1}
                              onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'filterField1', addDataItemIndex)}
                            >
                              {responseFilerValues.map((item, index) => (
                                <option key={item.name} value={item.name} label={item.name}></option>
                              ))}
                            </select>
                            <select className="form-select" aria-label="Is equal to" id="inputPlatform" style={{ marginRight: '2%', width: '11vw' }}
                              value={customFilterItem.filterField2}
                              onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'filterField2', addDataItemIndex)}
                            >
                              {operators && operators.map((item, index) => (
                                <option key={item} value={item} label={item}></option>
                              ))}
                            </select>
                            <Autocomplete
                              shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                              getItemValue={item => item}
                              items={ getLookupValue(id) }
                              renderInput= {(props) => <input {...props} className="form-control" onChange={(e) => onChangeFilterValues(e, customItemIndex, false, 'filterField3', addDataItemIndex)}/>}
                              renderItem={(item, isHighlighted) =>
                                <p style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', wordBreak: 'break-word', width: 150 }}>
                                {item}
                                </p>
                              }
                              value={customFilterItem.filterField3}
                              onSelect={(val) => onChangeFilterValues(val, customItemIndex, true, 'filterField3', addDataItemIndex)}
                            />
                            <div className="d-flex " style={{ paddingLeft: 5 }}>
                              <ThrashIcon onPressRemove={ () => removeItem(addDataItemIndex, 'customFilterList', customItemIndex)} width={customItemIndex === 0 ? 20 : 40} height={25} styles={{ marginLeft: customItemIndex === 0 ? 10 : 5 }}/>
                            </div>
                          </div>
                      })}
                      <span><span className="form-check-label text-primary" onClick= {() => handleShowAddFilter(addDataItemIndex)}>Add filter</span></span>
                    </div>
                  </div>
                  })
                  : null
                }
                </div>}
                <div className="col-6 position-relative mx-2">
                  {(addDataField.length === 0 && textList.length > 0) && <div onClick= {() => handleShowDataField()} className="position-absolute top-0 start-0 form-check-label" data-bs-toggle="tooltip" data-bs-placement="left" title="Add DataField" >
                      <img src={ADD} />
                    </div>}
                  {(addDataField.length === 0 && textList.length > 0) && <div onClick= {() => handleShowCustomMetric()} className="position-absolute top-0 end-0 form-check-label" data-bs-toggle="tooltip" data-bs-placement="left" title="Add TextField" >
                    <img src={ADD} />
                  </div>}
                  {(textList.length > 0 && addDataField.length > 0) && <div onClick= {() => handleShowCustomMetric()} className="position-absolute top-0 start-0 form-check-label" data-bs-toggle="tooltip" data-bs-placement="left" title="Add TextField" style={{ paddingRight: '9rem' }}>
                      <img src={ADD} ></img>
                    </div>}
                  { textList.map((textItem, textItemIndex) => {
                    return <div key={`textField_${textItemIndex}`} className={'listing-item mx-3 w-75 mt-5 p-1 border border-2 rounded-3 d-flex justify-content-start'}>
                      <textarea className="px-1 customTextField w-100" placeholder="please enter the text" value={textItem.textField ?? ''}
                        onChange={(e) => onTextChange(e, textItemIndex, 'textField')} />
                      <div className=" " style={{ display: 'flex' }}>
                        <img src={LINE}></img>
                        <ThrashIcon onPressRemove={ () => removeItem(textItemIndex, 'textList')} styles={{ marginLeft: 5 }} width={20} height={20}/>
                      </div>
                    </div>
                  })
                  }
                  {(textList.length === 0 && addDataField.length > 0) && <div onClick= {() => handleShowCustomMetric()} className="position-absolute top-0 start-0 form-check-label" data-bs-toggle="tooltip" data-bs-placement="left" title="Add TextField" style={{ paddingRight: '9rem' }}>
                    <img src={ADD} ></img>
                  </div>}
                </div>
              </div>
              <div className={'col-md-auto col-sm-auto text-xl-center d-flex justify-content-end mt-3'} style={{ marginTop: '-4%', marginBottom: '20px' }}>
                {/* <button className="btns mt-20" style={{ color: '#EE5D2C', marginRight: '10px' }}>Delete</button> */}
                <Link to={`businesses/${apps.id}/customNarratives`} className="btns mt-20" style={{ color: '#3557cc', marginRight: '20px' }}>Cancel</Link>
                <button className="btn btn-primary d-block mt-20" style={{ marginRight: '10px' }} onClick={() => AddCustomMetric()}>Save</button>
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
