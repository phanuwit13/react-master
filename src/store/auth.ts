import {
  AUTH_CREDENTIAL,
  AUTH_CREDENTIAL_EXPIRE,
  USER_CREDENTIAL,
} from '@/constants/auth'
import { ROUTE } from '@/constants/routes'
import { apiClient } from '@/utils/api'
import { deleteCookie, setCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { logger } from './log'

type UserInfo = {
  username: string
}

type LoginData = {
  token: string
  remember?: boolean
  redirectUri?: string
}

type LogoutData = {
  redirectUri?: string
}

type UseAuth = {
  hasAuth: boolean
  login: (data: LoginData, user: UserInfo) => void
  logout: (data?: LogoutData) => void
  loading: boolean
  setLoading: (value: boolean) => void
  user: UserInfo | null
  setUser: (value: UserInfo & { token: string }) => void
  token: string | null
}

const initialState = {
  hasAuth: false,
  loading: false,
  user: null,
  token: null,
}

const setAuthCookie = (key: string, value: string, expires?: number) => {
  setCookie(
    key,
    value,
    expires ? { expires: dayjs().add(expires, 'minute').toDate() } : undefined
  )
}

export const useAuth = create<UseAuth>()(
  logger(
    (set) => ({
      ...initialState,
      login: ({ token, redirectUri, remember }, user) => {
        setAuthCookie(
          AUTH_CREDENTIAL,
          token,
          remember ? AUTH_CREDENTIAL_EXPIRE : undefined
        )
        setAuthCookie(
          USER_CREDENTIAL,
          user.username,
          remember ? AUTH_CREDENTIAL_EXPIRE : undefined
        )
        set({ hasAuth: false, loading: false, token: token, user: user })
        if (redirectUri) {
          window.location.href = redirectUri
        }
      },
      setLoading: (value) => {
        set({ loading: value })
      },
      setUser: (value) => {
        set({ loading: false, user: value, token: value.token })
      },
      logout: ({ redirectUri } = {}) => {
        set({ user: null, hasAuth: false, token: null })
        deleteCookie(AUTH_CREDENTIAL)
        deleteCookie(USER_CREDENTIAL)
        apiClient.interceptors.request.clear()
        window.location.href = redirectUri || ROUTE.LOGIN
      },
    }),
    'auth-store'
  )
)
