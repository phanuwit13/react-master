import AuthGuard from '@/auth/AuthGuard'
import AuthProvider from '@/auth/AuthProvider'
import GuestGuard from '@/auth/GuestGuard'
import FallbackSpinnerPage from '@/components/SpinnerPage'
import { ReactNode } from 'react'

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return (
      <GuestGuard fallback={<FallbackSpinnerPage />}>{children}</GuestGuard>
    )
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<FallbackSpinnerPage />}>{children}</AuthGuard>
  }
}

const Auth = ({
  children,
  guestGuard,
  authGuard,
}: {
  children: ReactNode
  guestGuard: boolean
  authGuard: boolean
}) => {
  return (
    <AuthProvider checkAuth={guestGuard === false && authGuard === true}>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        {children}
      </Guard>
    </AuthProvider>
  )
}

export default Auth
