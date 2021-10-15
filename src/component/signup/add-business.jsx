/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-return-assign */
/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GetRoutesPathName } from '../../utils/util-methods'
import { ROUTES_PATH_NAME, DAYSMAP, TIME, MERIDIAN_DEFAULT_VALUE, HOUR_DEFAULT_VALUE, DAY_OF_WEEK_DEFAULT_VALUE, CHANNEL_ID_DEFAULT_VALUE, MERIDIAN_PM_VALUE } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import AddBusinessValidateForm from '../validation/add-business-validate-form'
import useForms from '../validation/use-forms'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setBusinessId, setBusinessById } from '../signin/signin-actions'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import '../header/header-style.css'
import MultiSelect from '../select'

const AddBusiness = (props) => {
  const routePath = GetRoutesPathName()
  const { SETTINGS_BUSINESS, BUSINESS } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    verticalList: [],
    platformList: [],
    copySuccessText: ''
  })
  const { verticalList, platformList, copySuccessText } = state
  const { businessList, setBusinessById, setBusinessId } = props
  const [adminsList, setAdminList] = useState([])
  const loginCookie = localStorage.getItem('localLoginCookie')
  const [errors, setErrors] = useState({})
  const [notificationValue, setNotificationValue] = useState(CHANNEL_ID_DEFAULT_VALUE)
  const [days, setDays] = useState(DAY_OF_WEEK_DEFAULT_VALUE)
  const [hours, setHours] = useState(HOUR_DEFAULT_VALUE)
  const [meridian, setMeridianValue] = useState(MERIDIAN_DEFAULT_VALUE)
  const textAreaRef = useRef(null)

  const addBusiness = () => {
    const payload = {
      name: values.name,
      url: values.url,
      vertical_id: values.vertical_id,
      platform_id: values.platform_id
    }
    NetworkManager.addBusiness(payload, loginCookie).then(response => {
      if (response.status === 200) {
        if (routePath === BUSINESS) {
          setBusinessId(response.data.response_objects.id)
          props.onClick()
        } else {
          props.onClick(response.data.response_objects.id, props.businessObj)
        }
      }
    })
      .catch(error => {
        if (error.response.data.message) {
        }
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = AddBusinessValidateForm(values)
    const noErrors = Object.keys(validationErrors).length === 0
    setErrors(validationErrors)
    if (noErrors) {
      if (props.businessData) {
        updateBusinessList()
      } else {
        addBusiness()
      }
    }
  }

  const handleBusinessNameChange = (event) => {
    const newBusinessName = JSON.parse(JSON.stringify(businessList))
    newBusinessName[event.target.name] = event.target.value
    setBusinessById(newBusinessName)
  }

  const handleBusinessCategoryChange = (event) => {
    const newBusinessCategory = JSON.parse(JSON.stringify(businessList))
    newBusinessCategory[event.target.name] = event.target.value
    setBusinessById(newBusinessCategory)
  }

  const handleBusinessPlatformChange = (event) => {
    const newBusinessPlatform = JSON.parse(JSON.stringify(businessList))
    newBusinessPlatform[event.target.name] = event.target.value
    setBusinessById(newBusinessPlatform)
  }

  const handleBusinessUrlChange = (event) => {
    const newBusinessUrl = JSON.parse(JSON.stringify(businessList))
    newBusinessUrl[event.target.name] = event.target.value
    setBusinessById(newBusinessUrl)
  }

  const updateBusinessList = () => {
    const payload = {
      name: values.name,
      url: values.url,
      vertical_id: values.vertical_id,
      platform_id: values.platform_id,
      admins: adminsList,
      channel_id: notificationValue ? 1 : 0,
      time_of_day: getUTCHours(TIME[hours], true),
      day_of_weeks: days.split(',').map(iNum => parseInt(iNum))
    }
    NetworkManager.updateBusiness(businessList.id, payload, loginCookie).then(response => {
      if (response.status === 200) {
        setTimeout(function () {
          props.onClick()
        }, 1000)
        toast('Business details updated successfully', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    })
      .catch(error => {
        if (error.response.data.message) {
        }
      })
  }

  const handleCopyTrackCode = (e) => {
    textAreaRef.current.select()
    document.execCommand('copy')
    setState(() => ({ copySuccessText: 'Copied', verticalList: verticalList, platformList: platformList }))
    setTimeout(function () {
      setState(() => ({ copySuccessText: 'Copy tracking code', verticalList: verticalList, platformList: platformList }))
    }, 2000)
  }

  const { values, handleChange } = useForms({ name: '', vertical_id: '', platform_id: '', url: '' }, AddBusinessValidateForm)

  const fetchList = async () => {
    const getVerticalList = await NetworkManager.getAllVerticals(loginCookie)
    const getPlatformList = await NetworkManager.getAllPlatforms(loginCookie)
    setState(() => ({ verticalList: getVerticalList.data.response_objects, platformList: getPlatformList.data.response_objects }))
  }

  const handleDaysChange = (event) => {
    setDays(
      DAYSMAP.reduce((acc, curr) => { if (event.target.value.toString().includes(curr.dayName)) { acc.push(curr.id) } return acc }, []).toString()
    )
  }

  useEffect(() => {
    fetchList()
    if (props.businessData) {
      setAdminList([])
      const adminsList = []
      if (props.businessData.user_preferences && props.businessData.user_preferences.length > 0) {
        setDays(props.businessData.user_preferences[0].day_of_weeks ? props.businessData.user_preferences[0].day_of_weeks.toString() : DAY_OF_WEEK_DEFAULT_VALUE)
        setNotificationValue(props.businessData.user_preferences[0].channel_id ? parseInt(props.businessData.user_preferences[0].channel_id) : 0)
        if (props.businessData.user_preferences[0].time_of_day) {
          timeConvert(props.businessData.user_preferences[0].time_of_day, true)
        } else {
          timeConvert('00:00', false)
        }
      } else {
        setNotificationValue(CHANNEL_ID_DEFAULT_VALUE)
        setDays(DAY_OF_WEEK_DEFAULT_VALUE)
        timeConvert('00:00', false)
      }
      props.businessData.admins.map((item) => {
        if (item.user_id !== parseInt(localStorage.getItem('userId'))) {
          adminsList.push(item.email_id)
        }
        setAdminList(adminsList)
        return null
      })
      setErrors({})
    }
    return () => {
      setAdminList([])
    }
  }, [props.businessData])

  const handleAdminList = (tags) => {
    setAdminList(tags)
  }

  const defaultRenderTag = (props) => {
    const { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props
    return (
      <span key={key} {...other}>
        {getTagDisplayValue(tag)}
        {!disabled &&
          <a className={classNameRemove} onClick={(e) => removeTag(key, onRemove)} />
        }
      </span>
    )
  }

  const removeTag = (key, onRemove) => {
    onRemove(key)
  }

  const handleTimeChange = (event) => {
    setHours(event.target.value)
  }

  const getUTCHours = (time, isMeridianConversion) => {
    let totalMins
    if (isMeridianConversion) {
      totalMins = getHourValue(time, isMeridianConversion) + new Date().getTimezoneOffset()
    } else {
      totalMins = getHourValue(time, isMeridianConversion) - new Date().getTimezoneOffset()
    }
    if (Math.sign(totalMins) === -1) {
      totalMins = (24 * 60) + totalMins
    }
    let realMin = totalMins % 60
    let hoursValue = Math.floor(totalMins / 60)

    return `${hoursValue < 10 ? `0${hoursValue}` : hoursValue}:${realMin === 0 ? '00' : realMin}`
  }

  const timeConvert = (time, isDbTime) => {
    // Check correct time format and split into components
    if (isDbTime) {
      time = getUTCHours(time, false).split(':')
    } else {
      time = time.split(':')
    }
    let hourValue = parseInt(time[0])
    let timeValue
    if (hourValue >= 24) {
      if (hourValue === 24) {
        timeValue = hourValue - 12
      } else {
        timeValue = hourValue - 24
      }
      setMeridianValue('AM')
    } else {
      timeValue = hourValue % 12 || 12
      hourValue < 12 ? setMeridianValue('AM') : setMeridianValue('PM')
    }
    setHours(TIME.indexOf(`${timeValue <= 9 ? `0${timeValue}` : timeValue > 12 ? timeValue - 12 : timeValue}:${time[1]}`)) // Adjust hours
  }

  const handleMeridiemChange = (event) => {
    setMeridianValue(event.target.value)
  }

  const getHourValue = (time, isMeridianConversion) => {
    let selectedValue
    let hoursValue = parseInt(time.split(':')[0])
    if (isMeridianConversion) {
      if (meridian === 'PM' && parseInt(hoursValue) < 12) {
        selectedValue = parseInt(hoursValue) + 12
      } else if (meridian === 'AM' && parseInt(hoursValue) === 12) {
        selectedValue = parseInt(hoursValue) - 12
      } else {
        selectedValue = parseInt(hoursValue)
      }
    } else {
      selectedValue = parseInt(hoursValue)
    }
    let mins = (selectedValue * 60) + parseInt((time).split(':')[1])
    return mins
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-12">
        <label htmlFor="businessName" className="form-label fw-bold">Name</label>
        <input type="text" className="form-control" maxLength="25" onChange={!props.businessData ? handleChange : handleBusinessNameChange} value={!props.businessData ? values.name || '' : values.name = businessList.name || ''} name="name" placeholder="Name"/>
        {errors.name && (
          <div className="text-danger">{errors.name}</div>
        )}
      </div>
      <div className="mb-12">
        <label htmlFor="businessCategory" className="form-label fw-bold">Business category</label>
        <select className="form-select" aria-label="Business category" name="vertical_id" onChange={!props.businessData ? handleChange : handleBusinessCategoryChange} value={!props.businessData ? values.vertical_id || '' : values.vertical_id = businessList.vertical_id || ''} >
          <option value=''>Select a category</option>
            {verticalList && verticalList.map((vertical) => (
              <option value={vertical.id} key={vertical.id} label={vertical.name}></option>
            ))}
        </select>
        {errors.vertical_id && (
          <div className="text-danger">{errors.vertical_id}</div>
        )}
      </div>
      <div className="mb-12">
        <label htmlFor="platform" className="form-label fw-bold">App platform</label>
        <select className="form-select" aria-label="Business category" onChange={!props.businessData ? handleChange : handleBusinessPlatformChange} value={!props.businessData ? values.platform_id || '' : values.platform_id = businessList.platform_id || ''} name="platform_id">
          <option value=''>Select a category</option>
            {platformList && platformList.map((platform) => (
              <option value={platform.id} key={platform.id} label={platform.name}></option>
            ))}
        </select>
        {errors.platform_id && (
          <div className="text-danger">{errors.platform_id}</div>
        )}
      </div>
      <div className="mb-12">
        <label htmlFor="urlPath" className="form-label fw-bold">URL</label>
        <input type="url" className="form-control" name="url" onChange={!props.businessData ? handleChange : handleBusinessUrlChange} value={!props.businessData ? values.url || '' : values.url = businessList.url || ''} placeholder="https://"/>
        {errors.url && (
          <div className="text-danger">{errors.url}</div>
        )}
      </div>
      {(routePath.includes(SETTINGS_BUSINESS))
        ? (
          <>
            <div className="mb-12">
              <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
              <textarea ref={textAreaRef} className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly name= "tracking_code" value={businessList ? businessList.tracking_code : ''} />
              <div className="form-text text-end mt-2">
                <Link to="#" style={!businessList.tracking_code ? { pointerEvents: 'none' } : null} onClick= {handleCopyTrackCode}>{copySuccessText === 'Copied' ? 'Copied' : 'Copy tracking code' }</Link>
              </div>
            </div>
            <div className="mb-12">
              <label htmlFor="inputTrackingCode" className="form-label fw-bold">Administrators</label>
              <TagsInput
                value = {adminsList }
                addKeys = {[13]}
                removeKeys = {[]}
                validationRegex = {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/}
                onChange = {handleAdminList}
                renderTag = {defaultRenderTag}
                handleRemove = {removeTag}
                onChangeInput={filter => handleChangeInput(filter)}
                inputProps={{
                  className: 'react-tagsinput-input',
                  placeholder: 'Add Email Address'
                }}
                tagProps={{
                  className: 'react-tagsinput-tag',
                  classNameRemove: 'react-tagsinput-remove'
                }}
                onlyUnique
                addOnBlur={true}
                preventSubmit ={true}
              />
            </div>
            <div className="mb-40" style= {{ marginTop: '20px' }}>
            <label className="form-label fw-bold">Notification</label>
            <div className="mb-20">
              <span className="me-3">Send by</span>
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${notificationValue === 1 ? 'bg-primary' : ''}`} type="checkbox" name="emailNotification" checked={(notificationValue === 1)} onChange={() => setNotificationValue(notificationValue === 1 ? 0 : 1)}/>
                <label className="form-check-label" value={1} htmlFor="checkboxEmail">Email</label>
              </div>
              {/* <div className="form-check form-check-inline">
                <input className={`form-check-input ${notificationValue === 0 ? 'bg-primary' : ''}`} type="checkbox" name="smsNotification" checked={notificationValue === 0 ? true : false} onChange={() => setNotificationValue(0)}/>
                <label className="form-check-label" htmlFor="checkboxSMS">SMS</label>
              </div> */}
            </div>
            <div>
              <p className="mb-2 ">Days</p>
              <div className="row g-2 align-items-center">
                <div className="col-sm-auto">
                  <MultiSelect className="form-select"
                    idName={''}
                    key={'daysId_Filter'}
                    optionArray={DAYSMAP}
                    selectedValues={DAYSMAP.reduce((acc, curr) => { if (days.includes(curr.id)) { acc.push(curr.dayName) } return acc }, [])}
                    handleChange={handleDaysChange}
                  />
                </div>
                <div className="col-6 col-sm-auto">
                  <select className="form-select" style={{ height: '56px', marginBottom: '12px' }} aria-label="Frequency hour" id="inputFrqHour" onChange={(e) => handleTimeChange(e)} value={hours}>
                  {TIME.map((time, index) => (
                    <option key={time} value={index} label={time}></option>
                  ))}
                  </select>
                </div>
                <div className="col-6 col-sm-auto">
                  <select defaultValue="am" className="form-select" style={{ height: '56px', marginBottom: '12px' }} aria-label="Frequency AM/PM" id="inputFrqAMPM" onChange={(e) => handleMeridiemChange(e)} value={meridian}>
                    <option value={MERIDIAN_DEFAULT_VALUE} label={MERIDIAN_DEFAULT_VALUE}></option>
                    <option value={MERIDIAN_PM_VALUE} label={MERIDIAN_PM_VALUE}></option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          </>
          )
        : ''}
      <button type="submit" className={props.className}>{props.buttonTitle}</button>
    </form>
  )
}
const mapStateToProps = (state) => {
  return {
    businessList: state.signIn.businessList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBusinessById: (businessList) => {
      dispatch(setBusinessById(businessList))
    },
    setBusinessId: (businessId) => {
      dispatch(setBusinessId(businessId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBusiness)
