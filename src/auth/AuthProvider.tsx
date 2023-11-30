// ** React Imports
import { ReactNode, useEffect } from 'react'

import { AUTH_CREDENTIAL, USER_CREDENTIAL } from '@/constants/auth'
import { useAuth } from '@/store/auth'
import { getCookie } from 'cookies-next'

type Props = {
  children: ReactNode
  checkAuth: boolean
}

const AuthProvider = ({ children, checkAuth }: Props) => {
  // ** States
  const { setUser, logout } = useAuth()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getCookie(AUTH_CREDENTIAL)
      const userData = getCookie(USER_CREDENTIAL)
      if (storedToken && userData) {
        setUser({
          username: userData,
          token: storedToken,
        })
      } else if (checkAuth) {
        logout()
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default AuthProvider
