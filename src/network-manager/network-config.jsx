/* eslint-disable no-undef */
import axios from 'axios'
import { API_ROOT, ROOT } from '../utils/constants'

const {
  OTP_GENERATE, LOGIN, SIGNUP, GET_BUSINESS, ADD_BUSINESS, GET_ALL_PLATFORMS, GET_ALL_VERTICALS,
  COPY_TRACK_CODE, UPDATE_USER_PROFILE, GET_ALL_USERS, UPDATE_BUSINESS, GOOGLE_SIGNIN, GET_BUSINESS_BY_ID
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

  getBusinessById: (param) => {
    return axios.get(`${GET_BUSINESS_BY_ID}${param.appId}`, config(param.cookie))
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
  },

  updateBusiness: (id, params, cookie) => {
    return axios.put(`${UPDATE_BUSINESS}${id}`, params, config(cookie))
  },

  // ANOS SERVICES
  getAnos: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/anos${params.type}?offset=${params.offSet}&limit=${params.limit}`, config(params.cookie))
  },

  getOverViewAnosByDate: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/anos${params.type}?date=${params.date}`, config(params.cookie))
  },

  getAnosByDate: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/anos/custom_narratives/${params.id}?date=${params.date}&id=${params.narrativeId}`, config(params.cookie))
  },

  putAnosIconAction: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.put(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/narratives/${params.narrativeId}${params.type}`, {}, config(params.cookie))
  },

  deleteAnosIconAction: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.delete(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/narratives/${params.narrativeId}${params.type}`, config(params.cookie))
  },

  // ANBOS SERVICES
  getAllAnbos: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_BUSINESS}/${apps.id}/app_narrative_blogs`, config(params.cookie))
  },
  getAnbosById: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_BUSINESS}/${apps.id}/app_narrative_blogs/${params.narrativeId}`, config(params.cookie))
  },
  getAnbosByDate: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/anbos?date=${params.date}&id=${params.id}`, config(params.cookie))
  },
  getSearchAnos: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${apps.id}/search_anos?searchText=${params.searchText}&date=${params.date}`, config(params.cookie))
  },
  postAnbos: (params, cookie) => {
    return axios.post(`${GET_BUSINESS}/${params.app_id}/app_narrative_blogs`, params, config(cookie))
  },
  putAnbos: (params, cookie, narrativeId) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.put(`${GET_BUSINESS}/${apps.id}/app_narrative_blogs/${narrativeId}`, params, config(cookie))
  },
  deleteAnbos: (params) => {
    const apps = JSON.parse(localStorage.getItem('selectedAppsInfo'))
    return axios.delete(`${GET_BUSINESS}/${apps.id}/app_narrative_blogs/${params.narrativeId}`, config(params.cookie))
  },

  // google signin
  googleSignIn: (params) => {
    return axios.post(GOOGLE_SIGNIN, params)
  },

  // getBussinessMetricsById
  getBussinessMetricsById: (params, cookie) => {
    return axios.get(`${GET_ALL_USERS}${params.userId}/apps/${params.appId}/anos/narrative/${params.narrativeId}?offset=${params.offset}&limit=${params.limit}&period=${params.period}`, config(cookie))
  },

  // get Filter
  getAllCustomNarratives: (params) => {
    return axios.get(`${GET_BUSINESS}/${params.appId}/custom_narratives?offset=${params.offSet}&limit=${params.limit}`, config(params.cookie))
  },
  getCustomNarrativesById: (params) => {
    return axios.get(`${GET_BUSINESS}/${params.appId}/custom_narratives/${params.narrativeId}`, config(params.cookie))
  },
  getFilter: (appId, cookie) => {
    return axios.get(`${GET_BUSINESS}/${appId}/custom_narratives/filters`, config(cookie))
  },
  getFilterMetrics: (appId, cookie) => {
    return axios.get(`${GET_BUSINESS}/${appId}/custom_narratives/metrics`, config(cookie))
  },
  getCustomNarrativeLookup: (appId, cookie) => {
    return axios.get(`${GET_BUSINESS}/${appId}/custom_narratives/lookups`, config(cookie))
  },
  getAutoCompleteLookup: (appId, cookie, filterId) => {
    return axios.get(`${GET_BUSINESS}/${appId}/custom_narratives/filters/${filterId}/values`, config(cookie))
  },
  postCustomNarrative: (params, cookie) => {
    return axios.post(`${GET_BUSINESS}/${params.app_id}/custom_narratives`, params, config(cookie))
  },
  updateCustomNarrative: (params, cookie, narrativeId) => {
    return axios.put(`${GET_BUSINESS}/${params.app_id}/custom_narratives/${narrativeId}`, params, config(cookie))
  },
  deleteCustomNarrative: (params) => {
    return axios.delete(`${GET_BUSINESS}/${params.appId}/custom_narratives/${params.narrativeId}`, config(params.cookie))
  },
  previewCustomNarrative: (appId, cookie, narrativeId) => {
    return axios.get(`${GET_BUSINESS}/${appId}/custom_narratives/${narrativeId}/preview`, config(cookie))
  },
  previewPostCustomNarrative: (appId, cookie, params) => {
    return axios.post(`${GET_BUSINESS}/${appId}/custom_narratives/preview`, params, config(cookie))
  },
  getAllCategory: (appId, cookie) => {
    return axios.get(`${API_ROOT}lookup/getAllCategories`, config(cookie))
  }
}

export default NetworkManager
