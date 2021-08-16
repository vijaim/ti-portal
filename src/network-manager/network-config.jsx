import axios from 'axios'
import { ROOT } from '../utils/constants'

const {
  OTP_GENERATE, LOGIN, SIGNUP, GET_BUSINESS, ADD_BUSINESS, GET_ALL_PLATFORMS, GET_ALL_VERTICALS,
  COPY_TRACK_CODE, UPDATE_USER_PROFILE, GET_ALL_USERS
} = ROOT

const config = (cookie) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Authorization: cookie
  }
  const headersConfig = { headers: { ...headers } }
  return headersConfig
}

const NetworkManager = {
  generateOtp: (params) => {
    return axios.put(OTP_GENERATE, params)
  },

  signIn: (params) => {
    return axios.post(LOGIN, params)
  },

  signUp: (params) => {
    return axios.post(SIGNUP, params)
  },

  getBusiness: (cookie) => {
    return axios.get(GET_BUSINESS, config(cookie))
  },

  addBusiness: (params, cookie) => {
    return axios.post(ADD_BUSINESS, params, config(cookie))
  },

  getAllVerticals: (cookie) => {
    return axios.get(GET_ALL_VERTICALS, config(cookie))
  },

  getAllPlatforms: (cookie) => {
    return axios.get(GET_ALL_PLATFORMS, config(cookie))
  },

  copyTrackCode: (params, cookie) => {
    return axios.get(`${COPY_TRACK_CODE}${params.id}`, config(cookie))
  },

  updateUserProfile: (id, params, cookie) => {
    return axios.put(`${UPDATE_USER_PROFILE}${id}`, params, config(cookie))
  },

  getAllUsers: (params, cookie) => {
    return axios.get(`${GET_ALL_USERS}${params.id}`, config(cookie))
  }
}

export default NetworkManager
