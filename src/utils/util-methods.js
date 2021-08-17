/* eslint-disable no-undef */
import { useLocation } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const GetRoutesPathName = () => {
  const location = useLocation()
  return location.pathname
}

export const history = createBrowserHistory()

export const loginCookie = localStorage.getItem('localLoginCookie')
