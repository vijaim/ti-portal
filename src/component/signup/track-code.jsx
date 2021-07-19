import React from 'react'
import CopyCode from '../signup/copy-code'
import { ROUTES_PATH_NAME } from '../../utils/constants'

const TrackCode = () => {
  const { SIGN_IN } = ROUTES_PATH_NAME

  const trackCodeHandle = () => {
    window.location.href = SIGN_IN
  }

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <CopyCode onClick={trackCodeHandle} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default TrackCode
