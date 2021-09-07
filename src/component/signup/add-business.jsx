/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-return-assign */
/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GetRoutesPathName } from '../../utils/util-methods'
import { ROUTES_PATH_NAME } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import AddBusinessValidateForm from '../validation/add-business-validate-form'
import useForms from '../validation/use-forms'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setBusinessId, setBusinessById } from '../signin/signin-actions'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

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
  const [tagsList, setTagList] = useState([])
  const loginCookie = localStorage.getItem('localLoginCookie')
  const [errors, setErrors] = useState({})
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
      users: tagsList
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

  useEffect(() => {
    fetchList()
    if (props.businessData) {
      setTagList([])
      props.businessData.apps_users.map((item) => {
        if (item.user_id !== parseInt(localStorage.getItem('userId'))) {
          tagsList.push(item.email_id)
        }
        setTagList(tagsList)
        return null
      })
    }
    return () => {
      setTagList([])
    }
  }, [props.businessData])

  const handleTagList = (tags) => {
    setTagList(tags)
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
      {(routePath === SETTINGS_BUSINESS)
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
                value = {tagsList}
                addKeys = {[13]}
                removeKeys = {[]}
                validationRegex = {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/}
                onChange = {handleTagList}
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
                preventSubmit ={true}
              />
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
