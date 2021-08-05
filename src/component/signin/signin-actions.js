import Actions from '../../redux-store/actions'

export const setEmail = (email) => {
  return {
    type: Actions.SET_EMAIL,
    payload: email
  }
}

export const setLoginCookie = (cookie) => {
  return {
    type: Actions.SET_LOGIN_COOKIE,
    payload: cookie
  }
}

export const setPreviousPath = (path) => {
  return {
    type: Actions.SET_PREVIOUS_PATH,
    payload: path
  }
}
