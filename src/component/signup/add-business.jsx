/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetRoutesPathName } from '../../utils/util-methods'
import { ROUTES_PATH_NAME } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import AddBusinessValidateForm from '../validation/add-business-validate-form'
import useForms from '../validation/use-forms'

const AddBusiness = (props) => {
  const routePath = GetRoutesPathName()
  const { SETTINGS_BUSINESS, HOME } = ROUTES_PATH_NAME
  const [state, setState] = useState({
    verticalList: [],
    platformList: []
  })
  const { verticalList, platformList } = state
  const loginCookie = localStorage.getItem('localLoginCookie')
  const [errors, setErrors] = useState({})

  const addBusiness = () => {
    const payload = {
      name: values.name,
      url: values.url,
      vertical_id: values.vertical_id,
      platform_id: values.platform_id
    }
    NetworkManager.addBusiness(payload, loginCookie).then(response => {
      if (response.status === 200) {
        props.onClick(response.data.response_objects.id, props.businessObj)
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
      addBusiness()
    }
  }

  const { values, handleChange } = useForms({ name: '', vertical_id: '', platform_id: '', url: '' }, AddBusinessValidateForm)

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
            <input type="text" className="form-control" onChange={handleChange} value={values.name || ''} name="name" placeholder="Name"/>
            {errors.name && (
              <div className="text-danger">{errors.name}</div>
            )}
          </div>
          )
        : ''}
      <div className="mb-12">
        <label htmlFor="businessCategory" className="form-label fw-bold">Business category</label>
        <select className="form-select" aria-label="Business category" name="vertical_id" onChange={handleChange} value={values.vertical_id || ''} >
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
        <select className="form-select" aria-label="Business category" onChange={handleChange} value={values.platform_id || ''} name="platform_id">
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
        <input type="url" className="form-control" name="url" onChange={handleChange} value={values.url || ''} placeholder="https://"/>
        {errors.url && (
          <div className="text-danger">{errors.url}</div>
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
          </>
          )
        : ''}
      <button type="submit" className={props.className}>{props.buttonTitle}</button>
    </form>
  )
}

export default AddBusiness
