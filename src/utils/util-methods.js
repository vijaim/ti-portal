/* eslint-disable no-undef */
import { useLocation } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import moment from 'moment'

export const GetRoutesPathName = () => {
  const location = useLocation()
  return location.pathname
}

export const history = createBrowserHistory()

export const loginCookie = localStorage.getItem('localLoginCookie')

export const ImageSaver = (imageId) => {
  const currentDateTime = moment().format('DDMMyyyyhhmmss')
  const canvasData = document.getElementById(imageId)
  html2canvas(canvasData).then(canvas => {
    canvas.toBlob(function (blob) {
      saveAs(blob, `favorites_${currentDateTime}.png`)
    })
  })
}
