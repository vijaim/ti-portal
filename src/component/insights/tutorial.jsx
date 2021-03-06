import React from 'react'
import InsightsHeader from './insights-header'
import { HEADING_TITLE } from '../../utils/constants'
import TutorialContent from '../insights/tutorial-content'
import './tutorial.css'

const Tutorial = () => {
  const { TUTORIAL } = HEADING_TITLE

  return (
    <main>
      <section className="bg-white pb-20 position-fixed shadow-sm section-width">
        <div className="container">
          <div className="align-items-center gy-2 mb-12 row">
            <div className="col-md col-sm">
              <InsightsHeader headingTitle={TUTORIAL} />
            </div>
          </div>
        </div>
      </section>
      <TutorialContent/>
    </main>
  )
}

export default Tutorial
