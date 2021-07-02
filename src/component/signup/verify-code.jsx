import React from 'react'
import Header from '../header/header'

function VerifyCode() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="pb-40 pt-40">
            <div className="container">
              <div className="row">
                <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                  <h1 className="fw-bold h4 mb-40 text-center">Enter verification code</h1>
                  <p className="mb-20">We’ve sent a verification code to your email. Enter the code below.</p>
                  <form>
                    <div className="mb-12">
                      <label htmlFor="inputVerificationCode" className="form-label fw-bold">Verification code</label>
                      <input type="text" className="form-control" id="inputVerificationCode" placeholder="******" required />
                    </div>
                    <button type="submit" onClick={event =>  window.location.href='/password'} className="btn btn-primary d-block mt-20 w-100">Continue</button>
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

export default VerifyCode
