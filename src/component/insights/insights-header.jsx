/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_PATH_NAME, IMAGE_URL } from '../../utils/constants'
import { GetRoutesPathName } from '../../utils/util-methods'
// import SearchBar from '../header/search-bar'
import { connect } from 'react-redux'
import { setSearchBar } from '../signin/signin-actions'
import Autocomplete from 'react-autocomplete'

const InsightsHeader = (props) => {
  let timer = 0
  const routePath = GetRoutesPathName()
  const { FAVORITES, SALES, TRACKING, CREATECUSTOMMETRIC } = ROUTES_PATH_NAME
  const { manageInsights, isDisableManageBtn, autoCompleteOption, autoCompleteValue, autoCompleteValueChange } = props
  const [searchValue, setSearchValue] = React.useState('')

  const onSearchValueChange = async (e) => {
    if (timer > 0) {
      clearTimeout(timer)
    }
    setSearchValue(e.target.value)
    timer = setTimeout(() => {
      autoCompleteValueChange(e.target.value, false)
    }, 500)
  }
  useEffect(() => {
    // setSearchValue(autoCompleteValue)
  }, [autoCompleteValue, autoCompleteOption, isDisableManageBtn])
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
          {/* <SearchBar searchValue = {searchValue} onSearchValueChange = {(e) => onSearchValueChange(e)}/> */}
          <Autocomplete
            shouldItemRender={(item, value) => (item.custom_title) ? item.custom_title.toLowerCase() : item.output_html.toLowerCase()}
            getItemValue={item => (item.custom_title) ? item.custom_title.toLowerCase() : item.output_html.toLowerCase()}
            items={ autoCompleteOption}
            wrapperStyle={{ display: 'flex' }}
            renderInput= {(props) => <input {...props} placeholder="Search for a insight (e.g. page views, users) " type="text" className="form-control" style={{ marginBottom: 10 }} onChange={(e) => onSearchValueChange(e, false)} />}
            renderItem={(item, isHighlighted) =>
               <p style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: 'pointer', wordWrap: 'break-word', padding: 5, marginBottom: 5, marginTop: 5 }}>
               {<p style={{ marginLeft: 10, marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: (item.custom_title) ? `${item.custom_title}` : `${item.output_html}` }} /> }
               </p>
            }
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2px 0',
              fontSize: '100%',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
              zIndex: 1,
              maxWidth: 630
            }}
            value={searchValue}
            onSelect={(val, item) => autoCompleteValueChange(val, true, item)}
          />
        </form>
        {/* {isDisableManageBtn && <button className='btn btn-primary d-flex align-items-center justify-content-evenly col-2 pl-2' style={{ marginRight: '10px' }} onClick={() => manageInsights()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Manage Insights</button>} */}
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
