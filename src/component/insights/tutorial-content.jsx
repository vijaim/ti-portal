/* eslint-disable no-undef */
/* eslint-disable quotes  */
/* eslint-disable multiline-ternary  */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TutorialContent = () => {
  const [state, setState] = useState({
    tutorialId: 'overview'
  })
  const { tutorialId } = state
  const scrollRef = useRef(null)
  const scrollToTop = (scrollRef) => window.scrollTo(0, 0)

  const handleSetActive = (to) => {
    setState(() => ({ tutorialId: to }))
    if (to === 'overviewContent') {
      const scrollToOverviewContent = (scrollRef) => window.scrollTo(0, 310)
      scrollToOverviewContent()
    } else if (to === 'realtimeNarrativesContent') {
      const scrollToRealtimeNarrativesContent = (scrollRef) => window.scrollTo(0, 380)
      scrollToRealtimeNarrativesContent()
    } else if (to === 'customizableContent') {
      const scrollToCustomizableContent = (scrollRef) => window.scrollTo(0, 310)
      scrollToCustomizableContent()
    } else if (to === 'integrationContent') {
      const scrollToIntegrationContent = (scrollRef) => window.scrollTo(0, 330)
      scrollToIntegrationContent()
    } else if (to === 'timeMoneyContent') {
      const scrollToTimeMoneyContent = (scrollRef) => window.scrollTo(0, 310)
      scrollToTimeMoneyContent()
    } else {
      scrollToTop()
    }
  }

  useEffect(() => {
    if (tutorialId === 'overview') {
      scrollToTop()
    }
  })

  return (
    <>
      <nav className="scroll-height">
        <ul className='link scroll-section'>
          <div>
            <li title='Overview' className='scroll-hover'>
              <Link className={tutorialId === 'overview' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('overview')}>{`Overview`.length > 20 ? `${`Overview`.substring(0, 20)}...` : 'Overview'}</Link>
            </li>
            <li title='Realtime Narratives' className='scroll-hover'>
              <Link className={tutorialId === 'realtimeNarratives' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('realtimeNarratives')}>{`Realtime Narratives`.length > 20 ? `${`Realtime Narratives`.substring(0, 20)}...` : 'Realtime Narratives'}</Link>
            </li>
            <ul>
              <li title='Realtime Narratives Content' className='scroll-hover'>
              <Link className={tutorialId === 'realtimeNarrativesContent' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('realtimeNarrativesContent')}>{`Realtime Narratives Content`.length > 20 ? `${`Realtime Narratives Content`.substring(0, 20)}...` : 'Realtime Narratives Content'}</Link>
              </li>
            </ul>
            <li title='Customizable' className='scroll-hover'>
              <Link className={tutorialId === 'customizable' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('customizable')}>{`Customizable`.length > 20 ? `${`Customizable`.substring(0, 20)}...` : 'Customizable'}</Link>
            </li>
            <ul>
              <li title='Customizable Content' className='scroll-hover'>
              <Link className={tutorialId === 'customizableContent' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('customizableContent')}>{`Customizable Content`.length > 20 ? `${`Customizable Content`.substring(0, 20)}...` : 'Customizable Content'}</Link>
              </li>
            </ul>
            <li title='Integration' className='scroll-hover'>
              <Link className={tutorialId === 'integration' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('integration')}>{`Integration`.length > 20 ? `${`Integration`.substring(0, 20)}...` : 'Integration'}</Link>
            </li>
            <ul>
              <li title='Integration Content' className='scroll-hover'>
              <Link className={tutorialId === 'integrationContent' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('integrationContent')}>{`Integration Content`.length > 20 ? `${`Integration Content`.substring(0, 20)}...` : 'Integration Content'}</Link>
              </li>
            </ul>
            <li title='Time and Money' className='scroll-hover'>
              <Link className={tutorialId === 'timeMoney' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('timeMoney')}>{`Time & Money`.length > 20 ? `${`Time & Money`.substring(0, 20)}...` : 'Time & Money'}</Link>
            </li>
            <ul>
              <li title='Time and Money Content' className='scroll-hover'>
              <Link className={tutorialId === 'timeMoneyContent' ? 'scroll-active' : 'scroll-inactive' } onClick={() => handleSetActive('timeMoneyContent')}>{`Time & Money Content`.length > 20 ? `${`Time & Money Content`.substring(0, 20)}...` : 'Time & Money Content'}</Link>
              </li>
            </ul>
          </div>
        </ul>
      </nav>
      <div className="content-section">
        <>
          { tutorialId === 'overview' || tutorialId === 'overviewContent'
            ? (
              <>
                <div className="content" id='overview'>
                  <h3>Overview</h3>
                  TrueInsights is a business intelligence platform that tracks, stores and analyzes website activity and provides insights as narratives. <br/> <br/> Business Intelligence dashboards and data visualization tools are slowly becoming an integral part of all businesses. But typical dashboards filled with charts and data points can be overwhelming and difficult to understand. A dedicated person often needs to takes care of analyzing the dashboards, which slows down the process and can be costly.<br/> <br/>
                  TrueInsights presents the data and insights in a more meaningful narratives or stories. Data tells you ‘what is happening’, while presented as a narrative, it guides you to an understanding of ‘why it is happening’. TrueInsights empowers businesses to utilize metrics and in turning them into actionable insights.<br/><br/>
                  <img src="/images/help/sample_narratives.png"/>
                </div>
              </>
              ) : null
            }
            { tutorialId === 'realtimeNarratives' || tutorialId === 'realtimeNarrativesContent'
              ? (
                <>
                  <div className="content" id='realtimeNarratives'>
                    <h3>Realtime Narratives</h3>
                    Realtime actionable insights as narratives, that can help everyone in the organization.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                  <div className="content" id='realtimeNarrativesContent'>
                    <h5>Realtime Narratives Content</h5>
                    Realtime actionable insights as narratives, that can help everyone in the organization.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                </>
                ) : null
            }
            { tutorialId === 'customizable' || tutorialId === 'customizableContent'
              ? (
                <>
                  <div className="content" id='customizable'>
                    <h3>Customizable</h3>
                    Narratives are fully customizable, so you can focus on the important insights.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                  <div className="content" id='customizableContent'>
                    <h5>Customizable Content</h5>
                    ccccccNarratives are fully customizable, so you can focus on the important insights.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                </>
                ) : null
            }
            { tutorialId === 'integration' || tutorialId === 'integrationContent'
              ? (
                <>
                  <div className="content" id='integration'>
                    <h3>Integration</h3>
                    Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                  <div className="content" id='integrationContent'>
                    <h5>Integration Content</h5>
                    Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                </>
                ) : null
            }
            { tutorialId === 'timeMoney' || tutorialId === 'timeMoneyContent'
              ? (
                <>
                  <div className="content" id='timeMoney'>
                    <h3>Time and Money</h3>
                    Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                  <div className="content" id='timeMoneyContent'>
                    <h5>Time and Money Content</h5>
                    Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.
                  </div>
                </>
                ) : null
            }
        </>
        <div className="content-bottom"></div>
      </div>
    </>
  )
}

export default TutorialContent
