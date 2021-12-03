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
  const { setSearchBarValue } = props

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
        {routePath.includes(FAVORITES) && props.currentTab !== 'customNarratives'
          ? <h1 className="fw-bold h4 mb-0 text-dark">{ `${props.businessName}'s ${props.headingTitle}`}</h1>
          : props.currentTab !== 'customNarratives' ? <h1 className="fw-bold h4 mb-0 text-dark">{ `${props.headingTitle}`}</h1> : ''}
     { routePath.includes(FAVORITES) && props.currentTab !== 'customNarratives'
       ? <div className="container mt-3">
        <form >
          <SearchBar searchValue = {searchValue} onSearchValueChange = {(e) => onSearchValueChange(e)}/>
        </form>
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
