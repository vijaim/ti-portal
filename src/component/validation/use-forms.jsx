import { useState } from 'react'

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  const handleClear = (event) => {
    setTimeout(() => setValues(values => ({ values: '' })), 1000)
  }

  return {
    handleChange,
    handleClear,
    values
  }
}

export default useForm
