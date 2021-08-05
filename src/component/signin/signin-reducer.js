import Actions from '../../redux-store/actions'

const initialState = {
  email: '',
  cookie: '',
  path: ''
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

const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_EMAIL:
      return setEmailDetail(state, action.payload)
    case Actions.SET_LOGIN_COOKIE:
      return setCookieData(state, action.payload)
    case Actions.SET_PREVIOUS_PATH:
      return setPreviousRoute(state, action.payload)
    default:
      return state
  }
}

export default SignInReducer
