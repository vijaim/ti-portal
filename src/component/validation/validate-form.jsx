const ValidateForm = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.name) {
    errors.name = 'Name is required'
  }
  if (!values.code) {
    errors.code = 'Verification code is required'
  }
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
  }
  return errors
}

export default ValidateForm
