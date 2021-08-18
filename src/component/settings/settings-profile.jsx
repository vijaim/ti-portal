/* eslint-disable no-empty */
import React from 'react'
import InsightsHeader from '../insights/insights-header'
import NavigationTab from './navigation-tab'
import { HEADING_TITLE } from '../../utils/constants'
import NetworkManager from '../../network-manager/network-config'
import useForm from '../validation/use-form'
import validateForm from '../validation/validate-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SettingsProfile = () => {
  const { SETTINGS } = HEADING_TITLE
  const loginCookie = localStorage.getItem('localLoginCookie')
  const userId = localStorage.getItem('userId')

  const updateProfile = () => {
    const payload = {
      email: values.email,
      name: values.name
    }
    NetworkManager.updateUserProfile(userId, payload, loginCookie).then(response => {
      if (response.status === 200) {
        toast('User profile updated successfully.', {
          position: toast.POSITION.TOP_CENTER
        })
        handleClear()
      }
    })
      .catch(error => {
        if (error.response.data.message === 'Email already exists.') {
          toast(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        }
      })
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleClear
  } = useForm({ email: '', name: '' }, validateForm)

  return (
    <>
      <main>
        <section className="bg-white pb-20 position-relative shadow-sm">
          <div className="container">
            <InsightsHeader headingTitle={SETTINGS} />
          </div>
        </section>
        <section className="bg-section">
          <NavigationTab navType="settings" />
          <div className="container pb-40 pt-40">
            <div className="row">
              <div className="col-lg-9 col-xl-6">
                <div className="listing-item pt-20 pb-20 mb-20">
                  <div className="row">
                    <div className="col-md-8">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-20">
                          <label htmlFor="inputEmail" className="form-label fw-bold">Email</label>
                          <input type="email" className="form-control" name="email" onChange={handleChange} value={values.email || ''} placeholder="Email" required />
                          {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                        <div className="mb-20">
                          <label htmlFor="inputName" className="form-label fw-bold">Name</label>
                          <input type="text" className="form-control" name="name" maxLength="25" onChange={handleChange} value={values.name || ''} placeholder="Name" required />
                          {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                          )}
                        </div>
                        <button type="submit" onClick={updateProfile} className="btn btn-primary">Update</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default SettingsProfile
