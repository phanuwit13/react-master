import { useMessageModal } from '@/components/Modal/MessageModal'
import { config } from '@/configs/env'
import { AUTH_CREDENTIAL, USER_CREDENTIAL } from '@/constants/auth'
import { useAuth } from '@/store/auth'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { v4 as uuidv4 } from 'uuid'

const handleLogout = () => {
  return useAuth.getState().logout
}

const handleOpenUnauthorized = (msg: string) => {
  return useMessageModal.getState().setInfo({
    isShow: true,
    message: msg,
    callback: handleLogout(),
    type: 'warning',
  })
}

const apiClient = axios.create({
  baseURL: config.apiEndpoint,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Correlation-Id': uuidv4(),
    Authorization: getCookie(AUTH_CREDENTIAL)
      ? `Bearer ${getCookie(AUTH_CREDENTIAL)}`
      : undefined,
    'X-User-Id': getCookie(USER_CREDENTIAL),
  },
})

// Axios middleware to convert all api responses to camelCase

apiClient.interceptors.response.use(
  function (response) {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json'
    ) {
      response.data = camelizeKeys(response.data)
    }

    return response.data
  },
  function (error) {
    if (
      error.response.status === 401 &&
      window.location.pathname !== '/admin/login'
    ) {
      handleOpenUnauthorized('User Expired')
      return
    }

    const res = error.response
    console.error('Looks like there was a problem. Status', res.status)
    return Promise.reject(error)
  }
)

// Axios middleware to convert all api requests to snake_case
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config }
    newConfig.url = `${config.url}`

    if (newConfig.headers['Content-Type'] === 'multipart/form-data')
      return newConfig

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }

    return newConfig
  }
)

export { apiClient }

