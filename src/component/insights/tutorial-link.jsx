/* eslint-disable no-undef */
/* eslint-disable quotes  */
import React from 'react'
import { Link } from 'react-scroll'
import './tutorial.css'
import { TUTORIAL_CONTENT } from '../../utils/constants'

const TutorialLink = () => {
  return (
    <>
      <nav>
        <ul className="link">
        {TUTORIAL_CONTENT.map(tutorialList => (
        <li id={tutorialList.heading}>
          <Link activeClass= "active" to={tutorialList.id} spy={true}>{tutorialList.heading}</Link>
        </li>
        ))}
        </ul>
      </nav>
    </>
  )
}

export default TutorialLink
