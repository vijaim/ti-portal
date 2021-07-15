import { useLocation } from 'react-router-dom'

export const GetRoutesPathName = () => {
  const location = useLocation()
  return location.pathname
}
