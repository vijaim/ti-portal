/* eslint-disable quotes  */
import React from 'react'
import './tutorial.css'
import TutorialLink from './tutorial-link'
import { TUTORIAL_CONTENT } from '../../utils/constants'

const TutorialContent = () => {
  return (
    <>
      <TutorialLink/>
      <div>
      {TUTORIAL_CONTENT.map(tutorialList => (
        <div className="content" id={tutorialList.id}>
          <h2>{tutorialList.heading}</h2>
          {tutorialList.description}
        </div>
      ))}
      <div className="contentBottom"></div>
      </div>
    </>
  )
}

export default TutorialContent
