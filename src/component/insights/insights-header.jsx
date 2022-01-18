/* eslint-disable no-undef */
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME, IMAGE_URL } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'
import SearchBar from '../header/search-bar'
import { connect } from 'react-redux'
import { setSearchBar } from '../signin/signin-actions'

const InsightsHeader = (props) => {
  const routePath = GetRoutesPathName()
  const { FAVORITES, SALES, TRACKING, CREATECUSTOMMETRIC } = ROUTES_PATH_NAME
  const [searchValue, setSearchValue] = React.useState('')
  const { setSearchBarValue, manageInsights } = props

  const onSearchValueChange = (e) => {
    setSearchBarValue(e.target.value)
    setSearchValue(e.target.value)
  }
  const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
  return (
    <>
      { routePath === SALES || routePath === TRACKING
        ? <p className="mb-12 text-muted">{props.businessName}</p>
        : ''}
      {routePath === SALES
        ? (
          <Link to={FAVORITES} className="mb-1 d-inline-flex align-items-center">
            <img src={IMAGE_URL.ARROW_LEFT_BLUE} alt="Arrow Left" className="me-2" height={10} width={5} />
            Back to all insights
          </Link>
          )
        : ''}
        {routePath.includes(FAVORITES) && props.currentTab !== 'customNarratives' && !routePath.includes(CREATECUSTOMMETRIC)
          ? <h1 className="fw-bold h4 mb-0 text-dark">{ `${props.businessName}'s ${props.headingTitle}`}</h1>
          : props.currentTab !== 'customNarratives' ? <h1 className="fw-bold h4 mb-0 text-dark">{ `${props.headingTitle}`}</h1> : ''}
     { routePath.includes(FAVORITES) && props.currentTab !== 'customNarratives' && !routePath.includes(CREATECUSTOMMETRIC)
       ? <div className="container mt-3 d-flex justify-content-between">
        <form className='col-6'>
          <SearchBar searchValue = {searchValue} onSearchValueChange = {(e) => onSearchValueChange(e)}/>
        </form>
        <button className='btn btn-primary d-flex align-items-center justify-content-evenly col-2 pl-2' style={{ marginRight: '10px' }} onClick={() => manageInsights()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Manage Insights</button>
      </div>
       : ''}
       {props.currentTab === 'customNarratives' && <div className="d-flex justify-content-between">
          <h1 className="fw-bold h4 mb-0 text-dark">{ `${props.businessName}'s ${props.headingTitle}`}</h1>
          <Link to={`${FAVORITES}/${apps.id}${CREATECUSTOMMETRIC}`} className="btn btn-primary disabled-link">Add Custom Narratives</Link>
        </div>
        }
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchBarValue: (value) => {
      dispatch(setSearchBar(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(InsightsHeader)
