import React from 'react'
import { TRUEINSIGHTS_HELP_URL } from '../../utils/constants'

const TutorialContent = () => {
  const frameHeight = document.documentElement.scrollHeight
  const frameWidth = document.documentElement.scrollWidth
  return (
      <div className="content">
        <iframe className="iframe-section" src={TRUEINSIGHTS_HELP_URL} id="iframeSection" style={{ height: frameHeight, width: frameWidth }}></iframe>
      </div>
  )
}

export default TutorialContent
