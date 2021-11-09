/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../utils/constants'
import './insights.css'

const AddCustomMetric = () => {
  const { ADD, PENCIL, CLOSE, FILTER, LINE } = IMAGE_URL
  const [state, setState] = useState({
    showCustomMetric: false,
    showDataField: false,
    showTimePeriod: false,
    showText: false,
    showAddFilter: false
  })
  const [filterCount, setFilterCount] = useState(0)
  const { showDataField, showTimePeriod, showCustomMetric, showText, showAddFilter } = state
  const handleShowDataField = () => {
    setState(() => ({ showDataField: true }))
  }

  const handleShowTimePeriod = () => {
    setState(() => ({ showTimePeriod: true, showDataField: true }))
  }

  const handleShowCustomMetric = () => {
    if (showTimePeriod) {
      setState(() => ({ showCustomMetric: true, showDataField: true, showTimePeriod: true }))
    } else {
      setState(() => ({ showCustomMetric: true, showDataField: true }))
    }
  }

  const handleShowText = () => {
    if (showTimePeriod) {
      setState(() => ({ showText: true, showCustomMetric: true, showDataField: true, showTimePeriod: true }))
    } else {
      setState(() => ({ showText: true, showCustomMetric: true, showDataField: true }))
    }
  }

  const handleShowAddFilter = () => {
    if (showTimePeriod) {
      setState(() => ({ showAddFilter: true, showDataField: true, showTimePeriod: true }))
      setFilterCount(filterCount + 1)
    } else {
      setState(() => ({ showAddFilter: true, showDataField: true }))
      setFilterCount(filterCount + 1)
    }
  }
  return (
  <>
    <main>
      <section className="bg-section section-padding">
        <div className="container pb-40 pt-40">
          <div className="business-item position-relative">
            <div className="listing-item" style={{ display: 'flex', paddingTop: '20px' }}>
              <div className="align-items-center gy-3 rows" style={{ paddingRight: '20px' }}>
                <Link className="col-lg-3 col-sm-6 col-xl">
                  <img src={ADD}></img>
                </Link>
              </div>
            { showDataField
              ? <div className="business-item">
                  <div className="listing-item" style={{ display: 'table-caption' }}>
                    <div className="align-items-center gy-3 row">
                      <div className="col-lg-3 col-sm-6 col-1" style={{ display: '-webkit-box' }}>
                        <select className="form-select" aria-label="Business category" id="inputPlatform" style={{ marginRight: '10px', width: '12vw' }}>
                          <option value>Aggregation</option>
                          <option>Value of</option>
                          <option>Sum of</option>
                          <option>Average of</option>
                          <option>Count of</option>
                          <option>Minimum of</option>
                          <option>Maximum of</option>
                          <option>Topmost</option>
                          <option>Top'n'</option>
                        </select>
                        <select className="form-select" aria-label="Business category" id="inputPlatform" style={{ marginRight: '10px', width: '12vw' }}>
                          <option value>Field</option>
                          <option>SessionDuration</option>
                        </select>
                        <Link>
                          <img style={{ marginRight: '10px', marginTop: '15px' }} src={PENCIL}></img>
                        </Link>
                        { showTimePeriod
                          ? <>
                          <select className="form-select" aria-label="Business category" id="inputPlatform" style={{ marginRight: '10px', width: '12vw' }}>
                            <option value>This</option>
                            <option>None</option>
                            <option>Equal to</option>
                            <option>not Equal to</option>
                            <option>Greater than</option>
                            <option>Less than</option>
                            <option>Last</option>
                            <option>Last 'n'</option>
                            <option>This'</option>
                          </select>
                          <select className="form-select" aria-label="Business category" id="inputPlatform" style={{ marginRight: '10px', width: '12vw' }}>
                            <option value>Select</option>
                            <option>Day</option>
                            <option>Week</option>
                            <option>Meek</option>
                            <option>Quarter</option>
                            <option>Year</option>
                          </select>
                          </>
                          : <select onChange={handleShowTimePeriod} className="form-select" aria-label="Business category" id="inputPlatform" style={{ marginRight: '10px', width: '12vw' }}>
                          <option value>Time period</option>
                          <option value>Time period</option>
                        </select>
                        }
                        <div className='vertical-line' style={{ marginBottom: showAddFilter ? '-92%' : '-38%' }}></div>
                        <Link>
                          <svg style={{ marginRight: '30px', marginTop: '10px' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots icon-color" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                          </svg>
                        </Link>
                      </div>
                      <div className="input-bar">
                        <input type="text" className='input-search' />
                        <img src={CLOSE}></img>
                      </div>
                      { showAddFilter && filterCount
                        ? <div style={{ marginTop: '1%', display: 'flex' }}>
                        <img src={FILTER} style={{ width: '5%', height: '2%', marginTop: '1%', marginRight: '2%' }}></img>
                        <select className="form-select" aria-label="Referer" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '14vw' : '10vw' }}>
                          <option value>Referer</option>
                        </select>
                        <select className="form-select" aria-label="Is equal to" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '14vw' : '11vw' }}>
                          <option value>Is equal to</option>
                        </select>
                        <select className="form-select" aria-label="Organic" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '14vw' : '11vw' }}>
                          <option value>Organic</option>
                        </select>
                        <Link>
                          <svg style={{ marginTop: '10px', marginLeft: showTimePeriod ? '7px' : 'opx' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots icon-color" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                          </svg>
                        </Link>
                      </div>
                        : '' }
                        { showAddFilter && filterCount >= 2
                          ? <div style={{ marginTop: '3%', display: 'flex' }}>
                        <img src={FILTER} style={{ width: '5%', height: '2%', marginTop: '1%', marginRight: '2%' }}></img>
                        <select className="form-select" aria-label="And" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '11vw' : '8vw' }}>
                          <option value>And</option>
                        </select>
                        <select className="form-select" aria-label="Country" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '11vw' : '8vw' }}>
                          <option value>Country</option>
                        </select>
                        <select className="form-select" aria-label="Is equal to" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '11vw' : '8vw' }}>
                          <option value>Is equal to</option>
                        </select>
                        <select className="form-select" aria-label="US" id="inputPlatform" style={{ marginRight: '2%', width: showTimePeriod ? '8vw' : '7.3vw' }}>
                          <option value>US</option>
                        </select>
                        <Link>
                          <svg style={{ marginTop: '10px', marginLeft: showTimePeriod ? '8px' : 'opx' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots icon-color" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                          </svg>
                        </Link>
                      </div>
                          : '' }
                      <Link onClick= {handleShowAddFilter}>Add filter</Link>
                    </div>
                  </div>
                  <Link onClick= {handleShowCustomMetric} className="col-md-auto col-sm-auto text-xl-center" style={{ paddingLeft: '103%' }}>
                    <img src={ADD} style={{ marginTop: '-19vw' }}></img>
                  </Link>
                  { showCustomMetric
                    ? <div className="business-item" style={{ marginTop: showTimePeriod ? '-20.4%' : '-26.4%', marginLeft: '108%', marginBottom: '8%' }}>
                    <div className="listing-item" style={{ display: 'inline-block' }}>
                      <div className="align-items-center gy-3 row">
                        <div className="col-lg-3 col-sm-6 col-1">
                          { showText
                            ? <>
                            <div style={{ color: 'black', width: '15vw', wordWrap: 'break-word' }}>is the average session length of visitors in US visited via organic search this week</div>
                            <div style={{ marginTop: '-60px', display: 'table-caption' }}>
                              <img style={{ marginLeft: '243px', marginTop: '-8px' }} src={LINE}></img>
                              <Link style={{ marginRight: '20px' }}>
                                <svg style={{ marginLeft: '253px', marginTop: '-133px' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots icon-color" viewBox="0 0 16 16">
                                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                              </Link>
                            </div>
                            </>
                            : <>
                          <div><Link style={{ color: 'black', whiteSpace: 'nowrap' }}>Data field</Link></div>
                          <div><Link onClick= {handleShowText} style={{ fontWeight: 'bold', color: 'black', whiteSpace: 'nowrap' }}>Text</Link></div>
                          </>}
                        </div>
                      </div>
                    </div>
                  </div>
                    : ''
                  }
                  <div className={`col-md-auto col-sm-auto text-xl-center ${showTimePeriod ? 'cols-pad-left' : 'col-pad-left'} `} style={{ marginTop: '-4%', display: 'flex', marginBottom: '20px' }}>
                    <button className="btns mt-20" style={{ color: '#EE5D2C', marginRight: '10px' }}>Delete</button>
                    <button className="btns mt-20" style={{ color: '#3557cc', marginRight: '20px' }}>Cancel</button>
                    <button className="btn btn-primary d-block mt-20" style={{ marginRight: '10px' }}>Save</button>
                  </div>
                </div>
              : <>
              <div className="business-item">
                <div className="listing-item" style={{ display: 'inline-block' }}>
                  <div className="align-items-center gy-3 row">
                    <div className="col-lg-3 col-sm-6 col-1">
                      <div><Link onClick= {handleShowDataField} style={{ fontWeight: 'bold', color: 'black', whiteSpace: 'nowrap' }}>Data field</Link></div>
                      <div><Link style={{ color: 'black', whiteSpace: 'nowrap' }}>Text</Link></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-auto col-sm-auto col-padd-left text-xl-center" style={{ display: 'flex', marginBottom: '20px', marginTop: '60px' }}>
                <button className="btns mt-20" style={{ color: '#EE5D2C', marginRight: '10px' }}>Delete</button>
                <button className="btns mt-20" style={{ color: '#3557CC', marginRight: '20px' }}>Cancel</button>
                <button className="btn btn-primary d-block mt-20" style={{ marginRight: '10px' }}>Save</button>
              </div>
              </>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
export default AddCustomMetric
