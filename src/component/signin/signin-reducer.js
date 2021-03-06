import Actions from '../../redux-store/actions'

const initialState = {
  email: '',
  cookie: '',
  path: '',
  userId: '',
  searchValue: '',
  businessList: {},
  user: {},
  businessId: '',
  tutorialId: ''
}
const setEmailDetail = (state, payload) => {
  return {
    ...state,
    email: payload
  }
}

const setCookieData = (state, payload) => {
  return {
    ...state,
    cookie: payload
  }
}

const setPreviousRoute = (state, payload) => {
  return {
    ...state,
    path: payload
  }
}

const setUserId = (state, payload) => {
  return {
    ...state,
    userId: payload
  }
}

const setSearch = (state, payload) => {
  return {
    ...state,
    searchValue: payload
  }
}

const setBusiness = (state, payload) => {
  return {
    ...state,
    businessList: payload
  }
}

const setUser = (state, payload) => {
  return {
    ...state,
    user: payload
  }
}

const setBusinessId = (state, payload) => {
  return {
    ...state,
    businessId: payload
  }
}

const setTutorialId = (state, payload) => {
  return {
    ...state,
    tutorialId: payload
  }
}

const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_EMAIL:
      return setEmailDetail(state, action.payload)
    case Actions.SET_LOGIN_COOKIE:
      return setCookieData(state, action.payload)
    case Actions.SET_PREVIOUS_PATH:
      return setPreviousRoute(state, action.payload)
    case Actions.SET_USER_ID:
      return setUserId(state, action.payload)
    case Actions.SET_SEARCH_VALUE:
      return setSearch(state, action.payload)
    case Actions.SET_BUSINESS_BY_ID:
      return setBusiness(state, action.payload)
    case Actions.SET_USER:
      return setUser(state, action.payload)
    case Actions.SET_BUSINESS_ID:
      return setBusinessId(state, action.payload)
    case Actions.SET_TUTORIAL_ID:
      return setTutorialId(state, action.payload)
    default:
      return state
  }
}

export default SignInReducer
