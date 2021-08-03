// Routes Path
export const ROUTES_PATH_NAME = {
  GENERATE_OTP: '/',
  SIGN_IN: '/signIn',
  SIGN_UP: '/signUp',
  SIGN_UP_FORM: '/signUpForm',
  VERIFY_CODE: '/verifyCode',
  PASSWORD: '/password',
  BUSINESS: '/business',
  TRACK_CODE: '/trackCode',
  HOME: '/home',
  FAVORITES: '/favorites',
  SALES: '/sales',
  TRACKING: '/tracking',
  SETTINGS_BUSINESS: '/settingsBusiness',
  SETTINGS_PROFILE: '/settingsProfile'
}

export const NAVIGATION_TABS = [
  { id: 'favorites', routePath: ROUTES_PATH_NAME.FAVORITES, name: 'Favorites', type: 'home' },
  { id: 'all', routePath: ROUTES_PATH_NAME.SALES, name: 'All', type: 'home' },
  { id: 'businesses', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Businesses', type: 'settings' },
  { id: 'profile', routePath: ROUTES_PATH_NAME.SETTINGS_PROFILE, name: 'Profile', type: 'settings' }
]

export const HEADER_NAVIGATION = [
  { id: 'signin', routePath: ROUTES_PATH_NAME.GENERATE_OTP, name: 'Sign in', type: 'auth' },
  { id: 'signup', routePath: ROUTES_PATH_NAME.SIGN_UP, name: 'Sign up', type: 'auth' },
  { id: 'home', routePath: ROUTES_PATH_NAME.HOME, name: 'Home', type: 'dashboard' },
  { id: 'tracking', routePath: ROUTES_PATH_NAME.TRACKING, name: 'Tracking', type: 'dashboard' },
  { id: 'settings', routePath: ROUTES_PATH_NAME.SETTINGS_BUSINESS, name: 'Settings', type: 'dashboard' },
  { id: 'logout', routePath: ROUTES_PATH_NAME.GENERATE_OTP, name: 'Logout', type: 'dashboard' }
]

export const IMAGES = {
  IMAGE_PATH: 'images/',
  IMAGE_PATHS: 'images/icons/'
}

export const IMAGE_URL = {
  TRUEINSIGHTS_LOGO: `${IMAGES.IMAGE_PATH}${'trueInsights-logo.png'}`,
  TODAY: `${IMAGES.IMAGE_PATHS}${'icon-today.png'}`,
  ORDERS: `${IMAGES.IMAGE_PATHS}${'icon-orders.png'}`,
  TRANSACTIONS: `${IMAGES.IMAGE_PATHS}${'icon-transactions.png'}`,
  CUSTOMERS: `${IMAGES.IMAGE_PATHS}${'icon-customers.png'}`,
  PRODUCTS: `${IMAGES.IMAGE_PATHS}${'icon-products.png'}`,
  LOCATION: `${IMAGES.IMAGE_PATHS}${'icon-location.png'}`,
  INCREASE: `${IMAGES.IMAGE_PATHS}${'icon-increase.png'}`,
  DECREASE: `${IMAGES.IMAGE_PATHS}${'icon-decrease.png'}`,
  LIKE: `${IMAGES.IMAGE_PATHS}${'icon-like.png'}`,
  LIKE_ACTIVE: `${IMAGES.IMAGE_PATHS}${'icon-like-active.png'}`,
  DISLIKE: `${IMAGES.IMAGE_PATHS}${'icon-dislike.png'}`,
  DISLIKE_ACTIVE: `${IMAGES.IMAGE_PATHS}${'icon-dislike-active.png'}`,
  STAR: `${IMAGES.IMAGE_PATHS}${'icon-star.png'}`,
  STAR_ACTIVE: `${IMAGES.IMAGE_PATHS}${'icon-star-active.png'}`,
  ARROW_LEFT: `${IMAGES.IMAGE_PATHS}${'icon-arrow-left.png'}`,
  COMPUTER: `${IMAGES.IMAGE_PATHS}${'icon-computer.png'}`,
  MOBILE: `${IMAGES.IMAGE_PATHS}${'icon-mobile.png'}`,
  ARROW_LEFT_BLUE: `${IMAGES.IMAGE_PATHS}${'icon-arrow-left-blue.png'}`,
  GOOGLE_SIGN_IN: `${IMAGES.IMAGE_PATH}${'sign-in-with-google.png'}`
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
  SETTINGS: 'Settings'
}

export const ROOT = {
  OTP_GENERATE: 'https://portalapi.trueinsights.co/users/generate_password',
  LOGIN: 'https://portalapi.trueinsights.co/users/login'
}
