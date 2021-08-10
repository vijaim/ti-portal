import axios from 'axios'
import { ROOT } from '../utils/constants'
import { getCookie } from '../functions/cookie-functions'

const { OTP_GENERATE, LOGIN, SIGNUP, GET_BUSINESS } = ROOT

const token = getCookie('trueinsights-cookie')

const config = {
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Authorization: token
  }
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

  getBusiness: () => {
    return axios.get(GET_BUSINESS, config)
  }
}

export default NetworkManager
