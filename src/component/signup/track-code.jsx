import React from 'react'
import Header from '../header/header'

function TrackCode() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="pb-40 pt-40">
            <div className="container">
              <div className="row">
                <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                  <h1 className="fw-bold h4 mb-40 text-center">Copy the tracking code</h1>
                  <ul className="mb-40">
                    <li>Copy the tracking code</li>
                    <li>Paste this tracking code inside the tag in the pages where transactions happen</li>
                    <li>Receive insights in your email</li>
                  </ul>
                  <div className="mb-20">
                    <label htmlFor="inputTrackingCode" className="form-label fw-bold">Tracking Code</label>
                    <textarea className="form-control" id="inputTrackingCode" rows={5} placeholder="Copy" readOnly defaultValue="Copy" />
                  </div>
                  <button type="button" onClick={event =>  window.location.href='/'} className="btn btn-primary d-block w-100">Copy</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default TrackCode
