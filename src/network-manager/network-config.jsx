import axios from 'axios'
import { ROOT } from '../utils/constants'

const { OTP_GENERATE, LOGIN, SIGNUP, GET_BUSINESS } = ROOT

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
  }
}

export default NetworkManager
