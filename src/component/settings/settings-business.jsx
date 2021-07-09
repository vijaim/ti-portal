import React, { useState } from 'react'
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
import InsightsHeader from '../insights/insights-header'
import SelectBar from '../settings/select-bar'
import AddBusiness from '../signup/add-business'

const SettingsBusiness = () => {
  const [state, setState] = useState({
    selectedIndex: 0,
    buttonActive: 0,
  })

  const { selectedIndex, buttonActive } = state

  const handleBusinessSelect = (index) => {
    setState(() => ({ selectedIndex: index }))
  }

  const handleBusiness1 = () => {
    setState(() => ({ selectedIndex: 0, buttonActive: 0 }))
  }

  const handleBusiness2 = () => {
    setState(() => ({ selectedIndex: 1, buttonActive: 1 }))
  }

  const handleBusiness3 = () => {
    setState(() => ({ selectedIndex: 2, buttonActive: 2 }))
  }

  return (
    <div>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle="Settings" />
          </div>
        </section>
        <section className="bg-section section-padding-tab">
          <SelectBar />
          <div className="container pb-40 pt-40">
            <div className="gy-3 mb-40 row">
              <div className="col-md-4 col-lg-3">
                <div className="nav flex-column nav-pills me-3 business-tabs" id="business-tab" role="tablist" aria-orientation="vertical">
                  <button className={((buttonActive === 0) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness1}>Business Name 1</button>
                  <button className={((buttonActive === 1) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness2}>Business Name 2</button>
                  <button className={((buttonActive === 2) ? 'nav-link active' : 'nav-link')} onClick={handleBusiness3}>Business Name 3</button>
                </div>
              </div>
              <div className="col-md-8 col-lg-9">
                <Tabs className="tab-content" selectedIndex={selectedIndex} onSelect={handleBusinessSelect}>
                  <TabPanel className="tab-pane fade show active">
                    <div className="listing-item pt-20 pb-20">
                      <div className="row">
                        <div className="col-xl-8">
                          <AddBusiness className="btn btn-primary" buttonTitle="Save" />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="tab-pane fade show active">Tabs 2</TabPanel>
                  <TabPanel className="tab-pane fade show active">Tabs 3</TabPanel>
                  <TabList className="disable">
                    <Tab />
                    <Tab />
                    <Tab />
                  </TabList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SettingsBusiness
