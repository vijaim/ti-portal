/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
const AddBusinessValidateForm = (values) => {
  const errors = {}
  const pattern = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$")

  if (!values.businessName) {
    errors.businessName = 'Business name is required'
  }
  if (!values.businessCategory) {
    errors.businessCategory = 'Business category is required'
  }
  if (!values.platform) {
    errors.platform = 'Platform is required'
  }
  if (!values.urlPath) {
    errors.urlPath = 'URL is required'
  } else if (!pattern.test(values.urlPath)) {
    errors.urlPath = 'Please enter valid URL'
  }
  return errors
}

export default AddBusinessValidateForm
