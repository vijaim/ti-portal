import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetRoutesPathName, loginCookie } from '../../utils/util-methods'
import { ROUTES_PATH_NAME } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'

const AddBusiness = (props) => {
  const routePath = GetRoutesPathName()
  const { SETTINGS_BUSINESS, HOME } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    verticalList: [],
    platformList: []
  })
  const { verticalList, platformList } = state

  const addBusiness = () => {
    const payload = {
      name: values.businessName,
      url: values.urlPath ? values.urlPath : '',
      vertical_id: values.businessCategory ? values.businessCategory : '',
      platform_id: values.platform ? values.platform : ''
    }
    NetworkManager.addBusiness(payload, loginCookie).then(response => {
      if (response.status === 200) {
        props.onClick()
      }
    })
      .catch(error => {
        if (error.response.data.message) {
          // console.log(error.response.data.message)
        }
      })
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({ businessName: '', businessCategory: '', platform: '', urlPath: '' }, validateForm)

  useEffect(() => {
    const fetchList = async () => {
      const getVerticalList = await NetworkManager.getAllVerticals(loginCookie)
      const getPlatformList = await NetworkManager.getAllPlatforms(loginCookie)
      setState(() => ({ verticalList: getVerticalList.data.response_objects, platformList: getPlatformList.data.response_objects }))
    }
    fetchList()
  }, [])

  return (
    <form onSubmit={handleSubmit} noValidate>
      {(routePath === HOME) || (routePath === SETTINGS_BUSINESS)
        ? (
          <div className="mb-12">
            <label htmlFor="businessName" className="form-label fw-bold">Name</label>
            <input type="text" className="form-control" onChange={handleChange} value={values.businessName || ''} name="businessName" placeholder="Name"/>
            {errors.businessName && (
              <div className="text-danger">{errors.businessName}</div>
            )}
          </div>
          )
        : ''}
      <div className="mb-12">
        <label htmlFor="businessCategory" className="form-label fw-bold">Business category</label>
        <select className="form-select" aria-label="Business category" name="businessCategory" onChange={handleChange} value={values.businessCategory || ''} >
          <option value=''>Select a category</option>
            {verticalList && verticalList.map((vertical) => (
              <option value={vertical.id} key={vertical.id} label={vertical.name}></option>
            ))}
        </select>
        {errors.businessCategory && (
          <div className="text-danger">{errors.businessCategory}</div>
        )}
      </div>
      <div className="mb-12">
        <label htmlFor="platform" className="form-label fw-bold">App platform</label>
        <select className="form-select" aria-label="Business category" onChange={handleChange} value={values.platform || ''} name="platform">
          <option value=''>Select a category</option>
            {platformList && platformList.map((platform) => (
              <option value={platform.id} key={platform.id} label={platform.name}></option>
            ))}
        </select>
        {errors.platform && (
          <div className="text-danger">{errors.platform}</div>
        )}
      </div>
      <div className="mb-12">
        <label htmlFor="urlPath" className="form-label fw-bold">URL</label>
        <input type="url" className="form-control" name="urlPath" onChange={handleChange} value={values.urlPath || ''} placeholder="https://" required/>
        {errors.urlPath && (
          <div className="text-danger">{errors.urlPath}</div>
        )}
      </div>
      {(routePath === SETTINGS_BUSINESS)
        ? (
          <>
            <div className="mb-12">
              <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
              <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
              <div className="form-text text-end mt-2">
                <Link to="/#">Copy tracking code</Link>
              </div>
            </div>
            <div className="mb-40">
              <label className="form-label fw-bold">Notification</label>
              <div className="mb-20">
                <span className="me-3">Send by</span>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="emailNotification" defaultValue defaultChecked />
                  <label className="form-check-label" htmlFor="checkboxEmail">Email</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="smsNotification" defaultValue />
                  <label className="form-check-label" htmlFor="checkboxSMS">SMS</label>
                </div>
              </div>
              <div>
                <p className="mb-2">Frequency</p>
                <div className="row g-2 align-items-center">
                  <div className="col-sm-auto">
                    <select defaultValue="Once a day" className="form-select" aria-label="Frequency period" id="inputFrqPeriod">
                      <option value>Once a day</option>
                      <option value>Once a week</option>
                      <option value>Once a month</option>
                    </select>
                  </div>
                  <div className="col-6 col-sm-auto">
                    <select defaultValue={1} className="form-select" aria-label="Frequency hour" id="inputFrqHour">
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                    </select>
                  </div>
                  <div className="col-6 col-sm-auto">
                    <select defaultValue="am" className="form-select" aria-label="Frequency AM/PM" id="inputFrqAMPM">
                      <option value="am">am</option>
                      <option value="pm">pm</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
          )
        : ''}
      <button type="submit" onClick={addBusiness} className={props.className}>{props.buttonTitle}</button>
    </form>
  )
}

export default AddBusiness
