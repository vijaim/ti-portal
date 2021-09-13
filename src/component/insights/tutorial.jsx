import React from 'react'
import InsightsHeader from './insights-header'
import { HEADING_TITLE } from '../../utils/constants'
import TutorialContent from '../insights/tutorial-content'

const Tutorial = () => {
  const { TUTORIAL } = HEADING_TITLE

  const sectionWidth = {
    width: '1520px',
    marginTop: '70px'
  }

  return (
    <>
      <main>
        <section className="bg-white pb-20 position-fixed shadow-sm" style={sectionWidth}>
          <div className="container">
            <div className="align-items-center gy-2 mb-12 row">
              <div className="col-md col-sm">
                <InsightsHeader headingTitle={TUTORIAL} />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-section section-padding">
          <TutorialContent/>
        </section>
      </main>
    </>
  )
}

export default Tutorial
