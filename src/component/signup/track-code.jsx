import React from 'react'
import CopyCode from '../signup/copy-code'
import { ROUTES_PATH_NAME } from '../../utils/constants'
import { connect } from 'react-redux'

const TrackCode = (props) => {
  const { HOME } = ROUTES_PATH_NAME
  const { businessId } = props

  const trackCodeHandle = () => {
    props.history.push(HOME)
  }

  return (
    <>
      <main>
        <section className="pb-40 pt-40">
          <div className="container">
            <div className="row">
              <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                <CopyCode onClick={trackCodeHandle} businessId={businessId}/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    businessId: state.signIn.businessId
  }
}

export default connect(mapStateToProps, null)(TrackCode)
