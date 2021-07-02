import React from 'react'
import Header from '../header/header'

function SignUp() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="pb-40 pt-40">
            <div className="container">
              <div className="row">
                <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                  <h1 className="fw-bold h4 mb-40 text-center">Sign up</h1>
                  <form className="mb-40">
                    <div className="mb-12">
                      <label htmlFor="inputSignUpEmail" className="form-label fw-bold">Email</label>
                      <input type="email" className="form-control" id="inputSignUpEmail" placeholder="john@email.com" required />
                    </div>
                    <button type="submit" onClick={event =>  window.location.href="/verifyCode"} className="btn btn-primary d-block mt-20 w-100">Continue</button>
                  </form>
                  <div className="text-center">
                    <p>Or,</p>
                    <a className="d-inline-block mb-40"><img src="images/sign-in-with-google.png" alt="Sign in with Google" width={192} height={46} /></a>
                    <p>Have an account? <a href="http://localhost:3000/">Sign in</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SignUp
