// ** React Imports
import { ReactElement, ReactNode, useEffect } from 'react'

// ** Next Import
import { useAuth } from '@/store/auth'
import { useLocation, useNavigate } from 'react-router-dom'

import { AUTH_CREDENTIAL } from '@/constants/auth'
import { ROUTE } from '@/constants/routes'
import { getCookie } from 'cookies-next'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(
    () => {
      if (!location) {
        return
      }

      if (user === null && !getCookie(AUTH_CREDENTIAL)) {
        if (location.pathname !== '/') {
          navigate(ROUTE.LOGIN, { state: { returnUrl: location.search } })
        } else {
          navigate(ROUTE.LOGIN)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  )

  if (loading || user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
