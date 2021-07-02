import React from 'react'
import Header from '../header/header'

function Password() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="pb-40 pt-40">
            <div className="container">
              <div className="row">
                <div className="col-11 col-lg-5 col-md-9 col-xxl-4 me-auto ms-auto">
                  <h1 className="fw-bold h4 mb-40 text-center">Welcome to TrueInsights</h1>
                  <form action="sign-up-4.php">
                    <div className="mb-12">
                      <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                      <input type="text" className="form-control" id="inputName" placeholder="John Smith" required />
                    </div>
                    <div className="mb-12">
                      <label htmlFor="inputPassword" className="form-label fw-bold">Password</label>
                      <input type="password" className="form-control" id="inputPassword" placeholder="******" required />
                      <div className="form-text">At least 6 characters, 1 number, 1 special character</div>
                    </div>
                    <div className="mb-12">
                      <label htmlFor="inputRePassword" className="form-label fw-bold">Re-enter password</label>
                      <input type="password" className="form-control" id="inputRePassword" placeholder="******" required />
                    </div>
                    <button type="submit" onClick={event =>  window.location.href='/business'} className="btn btn-primary d-block mt-20 w-100">Continue</button>
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

export default Password
