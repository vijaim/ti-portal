// Routes Path
export const ROUTES_PATH_NAME = {
  SIGN_IN: '/',
  SIGN_UP: '/signUp',
  VERIFY_CODE: '/verifyCode',
  PASSWORD: '/password',
  BUSINESS: '/business',
  TRACK_CODE: '/trackCode',
  HOME: '/home',
  FAVORITES: '/businesses',
  SALES: '/sales',
  TRACKING: '/tracking',
  SETTINGS_BUSINESS: '/settingsBusiness',
  SETTINGS_PROFILE: '/settingsProfile',
  TERMS_OF_USE: 'https://www.trueinsights.co/terms-of-use',
  TUTORIAL: '/tutorial'
}

export const NAVIGATION_TABS = [
  { id: 'all', routePath: ROUTES_PATH_NAME.FAVORITES, name: 'All', type: 'home', isNavigation: true },
  { id: 'favorites', routePath: ROUTES_PATH_NAME.FAVORITES, name: 'Favorites', type: 'home', isNavigation: true },
  { id: 'hiddens', routePath: ROUTES_PATH_NAME.FAVORITES, name: 'Hidden', type: 'home', isNavigation: true },
  { id: 'businesses', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Businesses', type: 'settings', isNavigation: true },
  { id: 'profile', routePath: ROUTES_PATH_NAME.SETTINGS_PROFILE, name: 'Profile', type: 'settings', isNavigation: true }
]

export const HEADER_NAVIGATION = [
  { id: 'signin', routePath: ROUTES_PATH_NAME.SIGN_IN, name: 'Sign in', type: 'auth' },
  { id: 'signup', routePath: ROUTES_PATH_NAME.SIGN_UP, name: 'Sign up', type: 'auth' },
  { id: 'home', routePath: ROUTES_PATH_NAME.HOME, name: 'Home', type: 'dashboard' },
  // { id: 'tracking', routePath: ROUTES_PATH_NAME.TRACKING, name: 'Tracking', type: 'dashboard' },
  { id: 'settings', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Settings', type: 'dashboard' },
  { id: 'tutorial', routePath: ROUTES_PATH_NAME.TUTORIAL, name: 'Tutorial', type: 'dashboard' },
  { id: 'logOut', routePath: ROUTES_PATH_NAME.SIGN_IN, name: 'Logout', type: 'dashboard' }
]

export const IMAGES = {
  IMAGE_PATH: 'images/',
  IMAGE_PATHS: 'images/icons/'
}

export const IMAGE_URL = {
  TRUEINSIGHTS_LOGO: `../../${IMAGES.IMAGE_PATH}${'trueInsights-logo.png'}`,
  TODAY: `../../${IMAGES.IMAGE_PATHS}${'icon-today.png'}`,
  ORDERS: `../../${IMAGES.IMAGE_PATHS}${'icon-orders.png'}`,
  TRANSACTIONS: `${IMAGES.IMAGE_PATHS}${'icon-transactions.png'}`,
  CUSTOMERS: `${IMAGES.IMAGE_PATHS}${'icon-customers.png'}`,
  PRODUCTS: `${IMAGES.IMAGE_PATHS}${'icon-products.png'}`,
  LOCATION: `${IMAGES.IMAGE_PATHS}${'icon-location.png'}`,
  INCREASE: `../../${IMAGES.IMAGE_PATHS}${'icon-increase.png'}`,
  DECREASE: `../../${IMAGES.IMAGE_PATHS}${'icon-decrease.png'}`,
  LIKE: `${IMAGES.IMAGE_PATHS}${'icon-like.png'}`,
  LIKE_ACTIVE: `${IMAGES.IMAGE_PATHS}${'icon-like-active.png'}`,
  DISLIKE: `${IMAGES.IMAGE_PATHS}${'icon-dislike.png'}`,
  DISLIKE_ACTIVE: `${IMAGES.IMAGE_PATHS}${'icon-dislike-active.png'}`,
  STAR: `../../${IMAGES.IMAGE_PATHS}${'icon-star.png'}`,
  STAR_ACTIVE: `../../${IMAGES.IMAGE_PATHS}${'icon-star-active.png'}`,
  ARROW_LEFT: `../../${IMAGES.IMAGE_PATHS}${'icon-arrow-left.png'}`,
  COMPUTER: `${IMAGES.IMAGE_PATHS}${'icon-computer.png'}`,
  MOBILE: `${IMAGES.IMAGE_PATHS}${'icon-mobile.png'}`,
  ARROW_LEFT_BLUE: `${IMAGES.IMAGE_PATHS}${'icon-arrow-left-blue.png'}`,
  GOOGLE_SIGN_IN: `${IMAGES.IMAGE_PATH}${'sign-in-with-google.jpg'}`,
  VISIBLE: `../../${IMAGES.IMAGE_PATHS}${'icon-visible.svg'}`,
  HIDDEN: `../../${IMAGES.IMAGE_PATHS}${'icon-hidden.svg'}`
}

export const HEADING_TITLE = {
  OTP: 'OTP',
  SIGN_IN: 'Sign in',
  SIGN_UP: 'Sign up',
  VERIFICATION_CODE: 'Enter verification code',
  PASSWORD: 'Welcome to TrueInsights',
  ADD_BUSINESS: 'Add your business',
  COPY_CODE: 'Copy the tracking code',
  BUSINESSES: 'Businesses',
  FAVORITES: 'Insights',
  SALES: 'Insights - Sales',
  TRACKING: 'Tracking',
  SETTINGS: 'Settings',
  TUTORIAL: 'Tutorial'
}

export const API_ROOT = process.env.REACT_APP_API_ENDPOINT || 'https://devportalapi.trueinsights.co/'

export const ROOT = {
  OTP_GENERATE: `${API_ROOT}users/generate_password`,
  LOGIN: `${API_ROOT}users/login`,
  SIGNUP: `${API_ROOT}users/signup`,
  GET_BUSINESS: `${API_ROOT}apps`,
  GET_BUSINESS_BY_ID: `${API_ROOT}apps/`,
  ADD_BUSINESS: `${API_ROOT}apps`,
  GET_ALL_VERTICALS: `${API_ROOT}lookup/verticals`,
  GET_ALL_PLATFORMS: `${API_ROOT}lookup/platforms`,
  COPY_TRACK_CODE: `${API_ROOT}apps/`,
  UPDATE_USER_PROFILE: `${API_ROOT}users/`,
  GET_ALL_USERS: `${API_ROOT}users/`,
  UPDATE_BUSINESS: `${API_ROOT}apps/`,
  GOOGLE_SIGNIN: `${API_ROOT}users/google_oauth_login`
}

export const BUSINESSKEYS = {
  APPS: 'apps',
  VERTICALS: 'verticals',
  PLATFORMS: 'platforms'
}

export const UTM_SOURCE_WORDPRESS = 'utm_source=wordpress'

export const TUTORIAL_CONTENT = [
  { id: 'overview', subContentId: 'overviewContent', heading: 'Overview', description: 'Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'realtimeNarratives', subContentId: 'realtimeNarrativesContent', heading: 'Realtime Narratives', description: 'Realtime actionable insights as narratives, that can help everyone in the organization.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'customizable', subContentId: 'customizableContent', heading: 'Customizable', description: 'Narratives are fully customizable, so you can focus on the important insights.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'integration', subContentId: 'integrationContent', heading: 'Integration', description: 'Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'timeMoney', subContentId: 'timeMoneyContent', heading: 'Time & Money', description: 'Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.' }
]

export const TUTORIAL_SUB_CONTENT = [
  { id: 'overviewContent', contentId: 'overview', heading: 'Overview Content', description: 'Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'realtimeNarrativesContent', contentId: 'realtimeNarratives', heading: 'Realtime Narratives Content', description: 'Realtime actionable insights as narratives, that can help everyone in the organization.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'customizableContent', contentId: 'customizable', heading: 'Customizable Content', description: 'Narratives are fully customizable, so you can focus on the important insights.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'integrationContent', contentId: 'integration', heading: 'Integration Content', description: 'Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.This enables a competitive advantage without managing an expensive data infrastructure.' },
  { id: 'timeMoneyContent', contentId: 'timeMoney', heading: 'Time & Money Content', description: 'Can configure the narratives to be delivered either via Email or Slack.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.Traditional Analytics requires a complicated setup of Business Intelligence tools, a Data Warehouse, and an in-house IT staff to manage it all. TrueInsights enables any size business to effortlessly customize easy to-understand, narrative insights (analytics/metrics). This enables a competitive advantage without managing an expensive data infrastructure.' }
]

export const PeriodRange = ['today', 'yesterday', 'week', 'month', 'quarter', 'year']

export const CHART_TYPE_LINE = 'LineChart'

export const DAYSMAP = [
  { id: '1', dayName: 'Monday' },
  { id: '2', dayName: 'Tuesday' },
  { id: '3', dayName: 'Wednesday' },
  { id: '4', dayName: 'Thursday' },
  { id: '5', dayName: 'Friday' },
  { id: '6', dayName: 'Saturday' },
  { id: '7', dayName: 'Sunday' }
]

export const TIME = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const DAY_OF_WEEK_DEFAULT_VALUE = '3,4'
export const HOUR_DEFAULT_VALUE = 12
export const CHANNEL_ID_DEFAULT_VALUE = 1
export const MERIDIAN_DEFAULT_VALUE = 'AM'
export const MERIDIAN_PM_VALUE = 'PM'
