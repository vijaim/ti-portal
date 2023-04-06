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
  TUTORIAL: '/help',
  CREATECUSTOMMETRIC: '/createCustomMetric'
}

export const NAVIGATION_TABS = [
  { id: 'all', routePath: ROUTES_PATH_NAME.FAVORITES, name: 'Overview', type: 'home', isNavigation: true },
  { id: 'businesses', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Businesses', type: 'settings', isNavigation: true },
  { id: 'profile', routePath: ROUTES_PATH_NAME.SETTINGS_PROFILE, name: 'Profile', type: 'settings', isNavigation: true }
]

export const HEADER_NAVIGATION = [
  { id: 'signin', routePath: ROUTES_PATH_NAME.SIGN_IN, name: 'Sign in', type: 'auth' },
  { id: 'signup', routePath: ROUTES_PATH_NAME.SIGN_UP, name: 'Sign up', type: 'auth' },
  { id: 'home', routePath: ROUTES_PATH_NAME.HOME, name: 'Home', type: 'dashboard' },
  { id: 'settings', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Settings', type: 'dashboard' },
  { id: 'tutorial', routePath: ROUTES_PATH_NAME.TUTORIAL, name: 'Help', type: 'dashboard' },
  { id: 'logOut', routePath: ROUTES_PATH_NAME.SIGN_IN, name: 'Logout', type: 'dashboard' }
]

export const IMAGES = {
  IMAGE_PATH: '../images/',
  IMAGE_PATHS: '../images/icons/',
  CUSTOM_METRIC_ICON_PATH: '../images/custom-metric/'
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
  HIDDEN: `../../${IMAGES.IMAGE_PATHS}${'icon-hidden.svg'}`,
  ADD: `../../${IMAGES.CUSTOM_METRIC_ICON_PATH}${'add.png'}`,
  PENCIL: `../../${IMAGES.CUSTOM_METRIC_ICON_PATH}${'pencil.png'}`,
  CLOSE: `../../${IMAGES.CUSTOM_METRIC_ICON_PATH}${'close.png'}`,
  FILTER: `../../${IMAGES.CUSTOM_METRIC_ICON_PATH}${'filter.png'}`,
  LINE: `../../${IMAGES.CUSTOM_METRIC_ICON_PATH}${'line.png'}`
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
  TUTORIAL: 'Help',
  CUSTOM_INSIGHTS: 'Custom Insights'
}

export const API_ROOT = process.env.REACT_APP_API_ENDPOINT || 'https://portalapi.trueinsights.co/'

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

export const TIME = ['01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30']

export const DAY_OF_WEEK_DEFAULT_VALUE = '1,3'
export const HOUR_DEFAULT_VALUE = 12
export const CHANNEL_ID_DEFAULT_VALUE = 1
export const IS_UNSUBSCRIBE_DEFAULT_VALUE = false
export const MERIDIAN_DEFAULT_VALUE = 'AM'
export const MERIDIAN_PM_VALUE = 'PM'

export const TRUEINSIGHTS_HELP_URL = 'https://www.trueinsights.in/help'

export const CONDITION_DROP = ['AND', 'OR']

export const ERROR_MESSAGE_NETWORK = 'Network Error'
export const BUTTON_NAME_OK = 'Ok'
export const BUTTON_NAME_CANCEL = 'Cancel'
export const BUTTON_NAME_YES = 'Yes'
export const BUTTON_NAME_NO = 'NO'
export const MODAL_CUSTOM_INSIGHT_TITLE = 'Insights'
export const MODAL_TITLE_CUSTOM_NARRATIVE_DELETE = 'Delete Insight'
export const MODAL_BUSINESS_TITLE = 'Business'
export const DELETE_MODAL_CONFIRM = 'Are you sure want to delete the item?'
export const DELETE_MODAL_SUCCESS = 'Delete Successfully.'

export const BOOLEAN_VALUES = [{ id: 'Yes', value: 'true' }, { id: 'No', value: 'false' }]
export const BUSINESS_SETTINGS_TAB = [
  { id: 'general', name: 'General', tabId: '0' },
  { id: 'customInsights', name: 'Custom Insights', tabId: '1' }
]

export const SORT_VALUES = [{ id: 'Asc', value: 'asc' }, { id: 'Desc', value: 'desc' }]
export const SORT_MINIMUM_VALUE_RANGE = '1'
export const SORT_MAXIMUM_VALUE_RANGE = '10'
export const SORT_MAXIMUM_VALUE_LENGTH = 2
export const BLOGS_SUCESS_MODAL_MESSAGE = 'Saved Successfully.'
export const CUSTOM_CATEGORY_NAME = 'Custom'
export const CUSTOM_CATEGORY_ID = 101
