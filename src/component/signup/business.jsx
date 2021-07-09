import React from 'react'
import AddBusiness from '../signup/add-business'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const Business = () => {
  const addBusinessHandle = () => {
    window.location.href = ROUTES_PATH_NAME.TRACK_CODE
  }

  return (
    <div>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <h1 className="fw-bold h4 mb-40 text-center">Add your business</h1>
                <AddBusiness onClick={addBusinessHandle} className="btn btn-primary d-block mt-20 w-100" buttonTitle="Continue" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Business
