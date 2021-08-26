/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-empty */
const AddBusinessValidateForm = (values) => {
  const errors = {}
  const pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)

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
