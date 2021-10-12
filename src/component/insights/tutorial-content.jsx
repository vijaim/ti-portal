/* eslint-disable no-undef */
/* eslint-disable quotes  */
/* eslint-disable multiline-ternary  */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './tutorial.css'

const TutorialContent = () => {
  const [state, setState] = useState({
    tutorialId: 'overview'
  })
  const { tutorialId } = state
  const scrollRef = useRef(null)
  const scrollToTop = (scrollRef) => window.scrollTo(0, 0)
  const scrollToOverviewContent = (scrollRef) => window.scrollTo(0, 310)
  const scrollToRealtimeNarrativesContent = (scrollRef) => window.scrollTo(0, 380)
  const scrollToCustomizableContent = (scrollRef) => window.scrollTo(0, 310)
  const scrollToIntegrationContent = (scrollRef) => window.scrollTo(0, 330)
  const scrollToTimeMoneyContent = (scrollRef) => window.scrollTo(0, 310)

  const handleSetActive = (to) => {
    setState(() => ({ tutorialId: to }))
    if (to === 'overviewContent') {
      scrollToOverviewContent()
    } else if (to === 'realtimeNarrativesContent') {
      scrollToRealtimeNarrativesContent()
    } else if (to === 'customizableContent') {
      scrollToCustomizableContent()
    } else if (to === 'integrationContent') {
      scrollToIntegrationContent()
    } else if (to === 'timeMoneyContent') {
      scrollToTimeMoneyContent()
    } else {
      scrollToTop()
    }
  }

  const handleRenderByMemo = useMemo(() => {
    return handleSetActive(tutorialId)
  }, [tutorialId])

  return (
    <>
      <nav className="scroll-height">
        <ul className='link scroll-section'>
          <div>
            <li title='Overview' className='scroll-hover'>
              <Link className={tutorialId === 'overview' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/overview' onClick={() => handleSetActive('overview')}>{`Overview`.length > 20 ? `${`Overview`.substring(0, 20)}...` : 'Overview'}</Link>
            </li>
            <ul>
              <li title='Overview Content' className='scroll-hover'>
              <Link className={tutorialId === 'overviewContent' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/overviewContent' onClick={() => handleSetActive('overviewContent')}>{`Overview Content`.length > 20 ? `${`Overview Content`.substring(0, 20)}...` : 'Overview Content'}</Link>
              </li>
            </ul>
            <li title='Realtime Narratives' className='scroll-hover'>
              <Link className={tutorialId === 'realtimeNarratives' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/realtimeNarratives' onClick={() => handleSetActive('realtimeNarratives')}>{`Realtime Narratives`.length > 20 ? `${`Realtime Narratives`.substring(0, 20)}...` : 'Realtime Narratives'}</Link>
            </li>
            <ul>
              <li title='Realtime Narratives Content' className='scroll-hover'>
              <Link className={tutorialId === 'realtimeNarrativesContent' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/realtimeNarrativesContent' onClick={() => handleSetActive('realtimeNarrativesContent')}>{`Realtime Narratives Content`.length > 20 ? `${`Realtime Narratives Content`.substring(0, 20)}...` : 'Realtime Narratives Content'}</Link>
              </li>
            </ul>
            <li title='Customizable' className='scroll-hover'>
              <Link className={tutorialId === 'customizable' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/customizable' onClick={() => handleSetActive('customizable')}>{`Customizable`.length > 20 ? `${`Customizable`.substring(0, 20)}...` : 'Customizable'}</Link>
            </li>
            <ul>
              <li title='Customizable Content' className='scroll-hover'>
              <Link className={tutorialId === 'customizableContent' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/customizableContent' onClick={() => handleSetActive('customizableContent')}>{`Customizable Content`.length > 20 ? `${`Customizable Content`.substring(0, 20)}...` : 'Customizable Content'}</Link>
              </li>
            </ul>
            <li title='Integration' className='scroll-hover'>
              <Link className={tutorialId === 'integration' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/integration' onClick={() => handleSetActive('integration')}>{`Integration`.length > 20 ? `${`Integration`.substring(0, 20)}...` : 'Integration'}</Link>
            </li>
            <ul>
              <li title='Integration Content' className='scroll-hover'>
              <Link className={tutorialId === 'integrationContent' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/integrationContent' onClick={() => handleSetActive('integrationContent')}>{`Integration Content`.length > 20 ? `${`Integration Content`.substring(0, 20)}...` : 'Integration Content'}</Link>
              </li>
            </ul>
            <li title='Time and Money' className='scroll-hover'>
              <Link className={tutorialId === 'timeMoney' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/timeMoney' onClick={() => handleSetActive('timeMoney')}>{`Time & Money`.length > 20 ? `${`Time & Money`.substring(0, 20)}...` : 'Time & Money'}</Link>
            </li>
            <ul>
              <li title='Time and Money Content' className='scroll-hover'>
              <Link className={tutorialId === 'timeMoneyContent' ? 'scroll-active' : 'scroll-inactive' } offset={-130} to='/tutorial/timeMoneyContent' onClick={() => handleSetActive('timeMoneyContent')}>{`Time & Money Content`.length > 20 ? `${`Time & Money Content`.substring(0, 20)}...` : 'Time & Money Content'}</Link>
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
                  Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
                </div>
                <div className="content" id='overviewContent'>
                  <h5>Overview Content</h5>
                  Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.
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
                    Narratives are fully customizable, so you can focus on the important insights.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.
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
