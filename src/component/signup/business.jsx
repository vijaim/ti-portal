import React from 'react'
import Header from '../header/header'

function Business() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="pb-40 pt-40">
            <div className="container">
              <div className="row">
                <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                  <h1 className="fw-bold h4 mb-40 text-center">Add your business</h1>
                  <form>
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
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                      </select>
                    </div>
                    <div className="mb-12">
                      <label htmlFor="inputURL" className="form-label fw-bold">URL</label>
                      <input type="url" defaultValue="https://" className="form-control" id="inputURL" placeholder="https://" />
                    </div>
                    <button type="submit" onClick={event =>  window.location.href='/trackCode'} className="btn btn-primary d-block mt-20 w-100">Continue</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default Business
