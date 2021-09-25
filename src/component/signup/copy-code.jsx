/* eslint-disable no-empty */
// COPY CODE REFERENCE : https://blog.devgenius.io/react-tips-copy-to-clipboard-comparing-old-and-new-values-with-hooks-a5f22a258a09
import React, { useState, useEffect, useRef } from 'react'
import { HEADING_TITLE } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'

const CopyCode = (props) => {
  const { COPY_CODE } = HEADING_TITLE
  const [state, setState] = useState({
    trackingCode: '',
    copySuccessText: ''
  })
  const { trackingCode, copySuccessText } = state
  const textAreaRef = useRef(null)
  const loginCookie = localStorage.getItem('localLoginCookie')

  const copyTrackingCode = () => {
    const payload = {
      id: props.businessId
    }
    NetworkManager.copyTrackCode(payload, loginCookie).then(response => {
      if (response.status === 200) {
        setState(() => ({ trackingCode: response.data.response_objects.tracking_code }))
      }
    })
      .catch(error => {
        if (error.response) {
        }
      })
  }

  const handleCopyTrackCode = (e) => {
    textAreaRef.current.select()
    document.execCommand('copy')
    setState(() => ({ copySuccessText: 'Copied' }))
    setTimeout(function () {
      props.onClick()
    }, 1500)
  }

  useEffect(() => {
    copyTrackingCode()
  }, [])

  return (
    <>
      <h1 className="fw-bold h4 mb-40 text-center">{COPY_CODE}</h1>
      <ul className="mb-40">
        <li>Copy and paste this tracking code into the header of your site. </li>
        <li>Inside the <head></head> HTML tag.</li>
      </ul>
      <div className="mb-20">
        <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
        <textarea ref={textAreaRef} className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly value={trackingCode} />
      </div>
      <button type="button" onClick={handleCopyTrackCode} className={copySuccessText === 'Copied' ? 'btn btn-success d-block w-100' : 'btn btn-primary d-block w-100' }>{copySuccessText === 'Copied' ? 'Copied...!' : 'Copy'}</button>
    </>
  )
}

export default CopyCode
