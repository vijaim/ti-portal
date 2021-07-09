import React from 'react'
import { useLocation } from 'react-router-dom'

const AddBusiness = (props) => {
  const location = useLocation()

  return (
    <form>
      {(location.pathname === '/home') || (location.pathname === '/settingsBusiness') ?
        <div className="mb-12">
          <label htmlFor="inputName" className="form-label fw-bold">Name</label>
          <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Username" required />
        </div> : ''
      }
      <div className="mb-12">
        <label htmlFor="inputBusiness" className="form-label fw-bold">Business category</label>
        <select defaultValue="Select a category" className="form-select" aria-label="Business category" id="inputBusiness">
          <option value>Select a category</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
      </div>
      <div className="mb-12">
        <label htmlFor="inputPlatform" className="form-label fw-bold">App platform</label>
        <select defaultValue="Select a category" className="form-select" aria-label="Business category" id="inputPlatform">
          <option value>Select a category</option>
          <option value={1}>Web</option>
          <option value={2}>IOS</option>
          <option value={3}>Android</option>
        </select>
      </div>
      <div className="mb-12">
        <label htmlFor="inputURL" className="form-label fw-bold">URL</label>
        <input type="url" defaultValue="https://" className="form-control" id="inputURL" placeholder="https://" />
      </div>
      {(location.pathname === '/settingsBusiness') ?
        <>
          <div className="mb-12">
            <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
            <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
            <div className="form-text text-end mt-2">
              <a href="#">Copy tracking code</a>
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
        </> : ''
      }
      <button type="submit" onClick={props.onClick} className={props.className}>{props.buttonTitle}</button>
    </form>
  )
}

export default AddBusiness
