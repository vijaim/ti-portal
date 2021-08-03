import React from 'react'
import InsightsHeader from '../insights/insights-header'
import { Link } from 'react-router-dom'
import { IMAGE_URL, HEADING_TITLE } from '../../utils/constants'

const Sales = () => {
  const {
    INCREASE, LIKE_ACTIVE, LIKE, DISLIKE_ACTIVE, DISLIKE, STAR_ACTIVE, STAR, DECREASE
  } = IMAGE_URL
  const { SALES } = HEADING_TITLE

  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle={SALES} businessName="Barney's Departmental Stores" />
          </div>
        </section>
        <section className="bg-section">
          <div className="container pb-40 pt-40">
            {/* Insights Data */}
            <div className="gy-3 mb-40 row">
              <div className="col-lg-3 col-xl-2">
                <h2 className="insightTitle">Today</h2>
              </div>
              <div className="col-lg-9 col-xl-10">
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={INCREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-success">21% </span>
                        <span>increase in
                          <strong> sales</strong> at
                          <strong> Downtown Store, today</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <span className="fs-5 fw-bold">34 </span>
                        <span>
                          <strong> returns</strong> of
                          <strong> Colgate Toothpaste, last week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={DECREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-danger">7% </span>
                        <span>decrease in
                          <strong> sales</strong> of
                          <strong> McGill’s Honey, this week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/#">View for all days</Link>
                </div>
              </div>
            </div>
            {/* Insights Data end */}
            {/* Insights Data */}
            <div className="gy-3 mb-40 row">
              <div className="col-lg-3 col-xl-2">
                <h2 className="insightTitle">Yesterday</h2>
              </div>
              <div className="col-lg-9 col-xl-10">
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={INCREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-success">21% </span>
                        <span>increase in <strong> sales</strong> at
                          <strong> Downtown Store, today</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <span className="fs-5 fw-bold">34 </span>
                        <span>
                          <strong>returns</strong> of
                          <strong> Colgate Toothpaste, last week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={DECREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-danger">7% </span>
                        <span>decrease in
                          <strong> sales</strong> of
                          <strong> McGill’s Honey, this week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/#">View for all days</Link>
                </div>
              </div>
            </div>
            {/* Insights Data end */}
            {/* Insights Data */}
            <div className="gy-3 mb-40 row">
              <div className="col-lg-3 col-xl-2">
                <h2 className="insightTitle">16 Apr</h2>
              </div>
              <div className="col-lg-9 col-xl-10">
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={DECREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-success">21% </span>
                        <span>increase in
                          <strong> sales</strong> at
                          <strong> Downtown Store, today</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <span className="fs-5 fw-bold">34 </span>
                        <span>
                          <strong>returns</strong> of
                          <strong> Colgate Toothpaste, last week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={DECREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-danger">7% </span>
                        <span>decrease in
                          <strong> sales</strong> of
                          <strong> McGill’s Honey, this week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/#">View for all days</Link>
                </div>
              </div>
            </div>
            {/* Insights Data end */}
            {/* Insights Data */}
            <div className="gy-3 mb-40 row">
              <div className="col-lg-3 col-xl-2">
                <h2 className="insightTitle">15 Apr</h2>
              </div>
              <div className="col-lg-9 col-xl-10">
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={INCREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-success">21% </span>
                        <span>increase in
                          <strong> sales</strong> at
                          <strong> Downtown Store, today</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <span className="fs-5 fw-bold">34 </span>
                        <span>
                          <strong>returns</strong> of
                          <strong> Colgate Toothpaste, last week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listing-item">
                  <div className="align-items-center gy-2 row">
                    <div className="col-xl">
                      <div className="insightStatus-content">
                        <img className="insightStatus-icon" src={DECREASE} alt="Increase Icon" height={8} width={14} />
                        <span className="fs-5 fw-bold text-danger">7% </span>
                        <span>decrease in
                          <strong>sales</strong> of
                          <strong> McGill’s Honey, this week</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-auto">
                      <div className="insightAction">
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={LIKE_ACTIVE} alt="Icon Thumb Up Active" height={24} width={24} />
                          <img className="insightAction-icon" src={LIKE} alt="Icon Thumb Up" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link">
                          <img className="insightAction-icon icon-active" src={DISLIKE_ACTIVE} alt="Icon Thumb Down Active" height={24} width={24} />
                          <img className="insightAction-icon" src={DISLIKE} alt="Icon Thumb Down" height={24} width={24} />
                        </Link>
                        <Link to="/#" className="insightAction-link active">
                          <img className="insightAction-icon icon-active" src={STAR_ACTIVE} alt="Icon Star Active" height={24} width={24} />
                          <img className="insightAction-icon" src={STAR} alt="Icon Star" height={24} width={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <Link to="/#">View for all days</Link>
                </div>
              </div>
            </div>
            {/* Insights Data end */}
            <div className="text-center pt-20 pb-20">
              <Link to="/#" className="btn btn-primary">Load More</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Sales
