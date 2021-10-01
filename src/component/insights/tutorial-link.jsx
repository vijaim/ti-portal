/* eslint-disable no-undef */
/* eslint-disable quotes  */
import React from 'react'
import { Link } from 'react-scroll'
import './tutorial.css'
import { TUTORIAL_CONTENT, TUTORIAL_SUB_CONTENT } from '../../utils/constants'
import { connect } from 'react-redux'
import { setTutorialId } from '../signin/signin-actions'

const TutorialLink = (props) => {
  const { setTutorialId } = props
  const handleSetActive = (to) => {
    setTutorialId(to)
  }

  return (
    <>
      <nav className="scroll-height">
        <ul className='link scroll-section'>
        {TUTORIAL_CONTENT.map(tutorialList => (
          <div key={tutorialList.id}>
            <li title={tutorialList.heading} className='scroll-hover'>
              <Link activeClass='scroll-active' offset={-130} to={tutorialList.id} onClick={() => handleSetActive(tutorialList.id)} spy={true}>{tutorialList.heading.length > 20 ? `${tutorialList.heading.substring(0, 20)}...` : tutorialList.heading}</Link>
            </li>
            <ul>
            {TUTORIAL_SUB_CONTENT.map((tutorialSubList) => {
              return (
                tutorialList.id === tutorialSubList.contentId && (
                <li title={tutorialSubList.heading} className='scroll-hover'>
                  <Link activeClass='scroll-active' offset={-130} to={tutorialSubList.id} onClick={() => handleSetActive(tutorialSubList.id)} spy={true}>{tutorialSubList.heading.length > 20 ? `${tutorialSubList.heading.substring(0, 20)}...` : tutorialSubList.heading}</Link>
                </li>
                ))
            }
            )}
            </ul>
          </div>
        )
        )}
        </ul>
      </nav>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTutorialId: (tutorialId) => {
      dispatch(setTutorialId(tutorialId))
    }
  }
}

export default connect(null, mapDispatchToProps)(TutorialLink)
