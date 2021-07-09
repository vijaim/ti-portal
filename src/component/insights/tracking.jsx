import React from 'react'
import InsightsHeader from '../insights/insights-header'

const Tracking = () => {
  return (
    <div>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle="Tracking" businessName="Barney's Departmental Stores" />
          </div>
        </section>
        <section className="bg-section">
          <div className="container pb-40 pt-40">
            <p className="text-muted">Tracking <strong>4</strong> out of <strong>12</strong> metrics</p>
            <div className="gx-md-5 mb-40 row divider-x">
              <div className="col-md-6 mb-40">
                <div className="gy-3 row">
                  <div className="col-xl-4">
                    <h2 className="insightTitle">
                      <img src="images/icons/icon-orders.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Orders
                    </h2>
                  </div>
                  <div className="col-xl-8">
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Profit</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProfit" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Returns</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingReturns" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProduct" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product category</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProductCategory" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Sales</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingSales" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">City</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCity" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Store</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingStore" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Country</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCountry" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-40">
                <div className="gy-3 row">
                  <div className="col-xl-4">
                    <h2 className="insightTitle">
                      <img src="images/icons/icon-transactions.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Transactions
                    </h2>
                  </div>
                  <div className="col-xl-8">
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Profit</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProfit" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Returns</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingReturns" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProduct" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product category</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProductCategory" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Sales</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingSales" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">City</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCity" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Store</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingStore" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Country</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCountry" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-40">
                <div className="gy-3 row">
                  <div className="col-xl-4">
                    <h2 className="insightTitle">
                      <img src="images/icons/icon-location.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Location
                    </h2>
                  </div>
                  <div className="col-xl-8">
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Profit</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProfit" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Returns</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingReturns" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProduct" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product category</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProductCategory" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Sales</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingSales" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">City</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCity" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Store</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingStore" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Country</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCountry" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-40">
                <div className="gy-3 row">
                  <div className="col-xl-4">
                    <h2 className="insightTitle">
                      <img src="images/icons/icon-customers.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Customers
                    </h2>
                  </div>
                  <div className="col-xl-8">
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Profit</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProfit" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Returns</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingReturns" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProduct" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product category</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProductCategory" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Sales</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingSales" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">City</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCity" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Store</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingStore" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Country</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCountry" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-40">
                <div className="gy-3 row">
                  <div className="col-xl-4">
                    <h2 className="insightTitle">
                      <img src="images/icons/icon-products.png" width={24} height={24} alt="Computer" className="me-2 icon-base" />Products
                    </h2>
                  </div>
                  <div className="col-xl-8">
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Profit</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProfit" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Returns</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingReturns" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProduct" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Product category</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingProductCategory" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Sales</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingSales" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">City</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCity" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Store</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingStore" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="listing-item">
                      <div className="align-items-center row">
                        <div className="col">
                          <span className="h6 fw-bold">Country</span>
                        </div>
                        <div className="col-auto">
                          <div className="form-check form-switch mb-0">
                            <input className="form-check-input" type="checkbox" id="inputTrackingCountry" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Tracking
