import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/header-insights'

function Favorites() {
  return (
    <>
      <Header />
      <div>
        <main>
          <section className="bg-white pb-20 position-relative shadow-sm">
            <div className="container">
              <form action="#" className="mb-60">
                <input type="text" className="form-control" id="inputVerificationCode" placeholder="Search for a metric (e.g. sales, profit) " required />
              </form>
              <p className="mb-12 text-muted">Barney's Departmental Stores</p>
              <h1 className="fw-bold h4 mb-12 text-dark">Insights</h1>
            </div>
          </section>
          <section className="bg-section">
            <div className="container position-relative">
              <nav className="nav page-tabs">
                <a className="nav-link active" href="#">Favorites</a>
                <Link className="nav-link" to="/sales">All</Link>
              </nav>
            </div>
            <div className="container pb-40 pt-40">
              <h2 className="fw-bold h4 mb-40 text-center text-dark">
                Today<img src="images/icons/icon-today.png" width={24} height={24} alt="Computer" className="ms-3 icon-base" />
              </h2>
              {/* Insights Data */}
              <div className="gy-3 mb-40 row">
                <div className="col-lg-3 col-xl-2">
                  <h3 className="insightTitle">
                    <img src="images/icons/icon-orders.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Orders
                  </h3>
                </div>
                <div className="col-lg-9 col-xl-10">
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-increase.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-success">21%</span>
                          <span>increase in <strong>sales</strong> at <strong>Downtown Store, today</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <span className="fs-5 fw-bold">34</span>
                          <span><strong>returns</strong> of <strong>Colgate Toothpaste, last week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-decrease.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-danger">7%</span>
                          <span>decrease in <strong>sales</strong> of <strong>McGill’s Honey, this week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href="#" className="small">View for all days</a>
                  </div>
                </div>
              </div>
              {/* Insights Data end */}
              {/* Insights Data */}
              <div className="gy-3 mb-40 row">
                <div className="col-lg-3 col-xl-2">
                  <h3 className="insightTitle">
                    <img src="images/icons/icon-transactions.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Transactions
                  </h3>
                </div>
                <div className="col-lg-9 col-xl-10">
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-increase.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-success">21%</span>
                          <span>increase in <strong>sales</strong> at <strong>Downtown Store, today</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <span className="fs-5 fw-bold">34</span>
                          <span><strong>returns</strong> of <strong>Colgate Toothpaste, last week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-decrease.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-danger">7%</span>
                          <span>decrease in <strong>sales</strong> of <strong>McGill’s Honey, this week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href="#" className="small">View for all days</a>
                  </div>
                </div>
              </div>
              {/* Insights Data end */}
              {/* Insights Data */}
              <div className="gy-3 mb-40 row">
                <div className="col-lg-3 col-xl-2">
                  <h3 className="insightTitle">
                    <img src="images/icons/icon-customers.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Customers
                  </h3>
                </div>
                <div className="col-lg-9 col-xl-10">
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-increase.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-success">21%</span>
                          <span>increase in <strong>sales</strong> at <strong>Downtown Store, today</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <span className="fs-5 fw-bold">34</span>
                          <span><strong>returns</strong> of <strong>Colgate Toothpaste, last week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-decrease.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-danger">7%</span>
                          <span>decrease in <strong>sales</strong> of <strong>McGill’s Honey, this week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href="#" className="small">View for all days</a>
                  </div>
                </div>
              </div>
              {/* Insights Data end */}
              {/* Insights Data */}
              <div className="gy-3 mb-40 row">
                <div className="col-lg-3 col-xl-2">
                  <h3 className="insightTitle">
                    <img src="images/icons/icon-products.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Products
                  </h3>
                </div>
                <div className="col-lg-9 col-xl-10">
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-increase.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-success">21%</span>
                          <span>increase in <strong>sales</strong> at <strong>Downtown Store, today</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <span className="fs-5 fw-bold">34</span>
                          <span><strong>returns</strong> of <strong>Colgate Toothpaste, last week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-decrease.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-danger">7%</span>
                          <span>decrease in <strong>sales</strong> of <strong>McGill’s Honey, this week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href="#" className="small">View for all days</a>
                  </div>
                </div>
              </div>
              {/* Insights Data end */}
              {/* Insights Data */}
              <div className="gy-3 mb-40 row">
                <div className="col-lg-3 col-xl-2">
                  <h3 className="insightTitle">
                    <img src="images/icons/icon-location.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Location
                  </h3>
                </div>
                <div className="col-lg-9 col-xl-10">
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-increase.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-success">21%</span>
                          <span>increase in <strong>sales</strong> at <strong>Downtown Store, today</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <span className="fs-5 fw-bold">34</span>
                          <span><strong>returns</strong> of <strong>Colgate Toothpaste, last week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listing-item">
                    <div className="align-items-center gy-2 row">
                      <div className="col-xl">
                        <div className="insightStatus-content">
                          <img className="insightStatus-icon" src="images/icons/icon-decrease.png" alt="Increase Icon" height={8} width={14} />
                          <span className="fs-5 fw-bold text-danger">7%</span>
                          <span>decrease in <strong>sales</strong> of <strong>McGill’s Honey, this week</strong></span>
                        </div>
                      </div>
                      <div className="col-xl-auto">
                        <div className="insightAction">
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-like-active.png" alt="Icon Thumb Up Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-like.png" alt="Icon Thumb Up" height={24} width={24} />
                          </a>
                          <a className="insightAction-link" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-dislike-active.png" alt="Icon Thumb Down Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-dislike.png" alt="Icon Thumb Down" height={24} width={24} />
                          </a>
                          <a className="insightAction-link active" href="#">
                            <img className="insightAction-icon icon-active" src="images/icons/icon-star-active.png" alt="Icon Star Active" height={24} width={24} />
                            <img className="insightAction-icon" src="images/icons/icon-star.png" alt="Icon Star" height={24} width={24} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <a href="#" className="small">View for all days</a>
                  </div>
                </div>
              </div>
              {/* Insights Data end */}
              <div className="text-center pt-20 pb-20">
                <a href="#" className="btn btn-primary"><img className="btn-icon" src="images/icons/icon-arrow-left.png" alt="Arrow Left" height={16} width={16} />Yesterday</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default Favorites
