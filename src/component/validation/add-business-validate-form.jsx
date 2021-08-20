/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-empty */
const AddBusinessValidateForm = (values) => {
  const errors = {}
  const pattern = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$")

  if (!values.name) {
    errors.name = 'Business name is required'
  }
  if (!values.vertical_id) {
    errors.vertical_id = 'Business category is required'
  }
  if (!values.platform_id) {
    errors.platform_id = 'Platform is required'
  }
  if (!values.url) {
    errors.url = 'URL is required'
  } else if (!pattern.test(values.url)) {
    errors.url = 'Please enter valid URL'
  }
  return errors
}

export default AddBusinessValidateForm
