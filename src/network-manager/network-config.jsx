import axios from 'axios'
import { ROOT } from '../utils/constants'

const { OTP_GENERATE, LOGIN, SIGNUP } = ROOT

const NetworkManager = {
  generateOtp: (params) => {
    return axios.put(OTP_GENERATE, params)
  },

  signIn: (params) => {
    return axios.post(LOGIN, params)
  },

  signUp: (params) => {
    return axios.post(SIGNUP, params)
  }
}

export default NetworkManager
