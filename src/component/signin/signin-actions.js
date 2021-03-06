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

export const setUserId = (userId) => {
  return {
    type: Actions.SET_USER_ID,
    payload: userId
  }
}

export const setSearchBar = (value) => {
  return {
    type: Actions.SET_SEARCH_VALUE,
    payload: value
  }
}

export const setBusinessById = (businessList) => {
  return {
    type: Actions.SET_BUSINESS_BY_ID,
    payload: businessList
  }
}

export const setUser = (user) => {
  return {
    type: Actions.SET_USER,
    payload: user
  }
}

export const setBusinessId = (businessId) => {
  return {
    type: Actions.SET_BUSINESS_ID,
    payload: businessId
  }
}

export const setTutorialId = (tutorialId) => {
  return {
    type: Actions.SET_TUTORIAL_ID,
    payload: tutorialId
  }
}
