import React from 'react'
import { HEADING_TITLE } from '../../utils/constants'

const CopyCode = (props) => {
  const { COPY_CODE } = HEADING_TITLE
  return (
    <>
      <h1 className="fw-bold h4 mb-40 text-center">{COPY_CODE}</h1>
      <ul className="mb-40">
        <li>Copy the tracking code</li>
        <li>Paste this tracking code inside the tag in the pages where transactions happen</li>
        <li>Receive insights in your email</li>
      </ul>
      <div className="mb-20">
        <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
        <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
      </div>
      <button type="button" onClick={props.onClick} className="btn btn-primary d-block w-100">Copy</button>
    </>
  )
}

export default CopyCode
