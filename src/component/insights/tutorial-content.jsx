/* eslint-disable quotes  */
/* eslint-disable multiline-ternary  */
import React from 'react'
import './tutorial.css'
import { TUTORIAL_CONTENT, TUTORIAL_SUB_CONTENT } from '../../utils/constants'
import { connect } from 'react-redux'

const TutorialContent = (props) => {
  const { tutorialId } = props
  return (
  <>
    <div className="content-section">
    {TUTORIAL_CONTENT.map(tutorialList => {
      return (
      <>
      { tutorialId === tutorialList.id
        ? (
          <>
          <div className="content" id={tutorialList.id}>
            <h3>{tutorialList.heading}</h3>
            {tutorialList.description}
          </div>
          <div>
          {TUTORIAL_SUB_CONTENT.map(tutorialSubList => {
            return (
              tutorialSubList.id === tutorialList.subContentId
                ? (
                  <div className="content" id={tutorialSubList.id}>
                    <h5>{tutorialSubList.heading}</h5>
                    {tutorialSubList.description}
                  </div>
                  ) : null
            )
          })}
          </div>
          </>
          ) : <div>
          {TUTORIAL_SUB_CONTENT.map(tutorialSubList => {
            return (
              tutorialSubList.id === tutorialList.subContentId
                ? (
                  <>
                    <div className="content" id={tutorialList.id}>
                      <h3>{tutorialList.heading}</h3>
                      {tutorialList.description}
                    </div>
                    <div className="content" id={tutorialSubList.id}>
                      <h5>{tutorialSubList.heading}</h5>
                      {tutorialSubList.description}
                    </div>
                  </>
                  ) : null
            )
          })}
         </div>
      }
      </>
      )
    })}
    <div className="content-bottom"></div>
    </div>
  </>
  )
}

const mapStateToProps = (state) => {
  return {
    tutorialId: state.signIn.tutorialId
  }
}

export default connect(mapStateToProps, null)(TutorialContent)
