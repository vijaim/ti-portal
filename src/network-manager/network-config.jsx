import axios from 'axios'
import { ROOT } from '../utils/constants'

//* Declaration of Token variable */
let token = null

const { OTP_GENERATE, LOGIN } = ROOT

const getHeader = () => {
  const requestHeader = {
    'Content-Type': 'application/json, charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  }
  if (token) {
    requestHeader.Authorization = token
  }
  return requestHeader
}

const constructParameters = (method, body) => ({
  method: method,
  headers: getHeader(),
  body: JSON.stringify(body)
})

const requests = {
  get: path => axios(path, { headers: getHeader() }).then().catch(),
  put: (path, body) => axios(path, constructParameters('PUT', body)).then().catch(),
  post: (path, body) => axios(path, constructParameters('POST', body)).then().catch(),
  delete: (path) => axios(path, constructParameters('DELETE')).then().catch()
}

const NetworkManager = {
  generateOtp: (params) => {
    console.log(requests)
    return axios.put(OTP_GENERATE, params)
  },

  signIn: (params) => {
    return axios.post(LOGIN, params)
  }
}

export default NetworkManager
// Need to remove this when logging-out.
export const setToken = (accessToken) => { token = accessToken }
