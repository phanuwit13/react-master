import MainLayout from '@/components/Layout/MainLayout'
import { ROUTE } from '@/constants/routes'
import Notfound from '@/pages/404'
import AboutPage from '@/pages/about'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import { LayoutRouteProps, PathRouteProps } from 'react-router-dom'

export type RouteConfig = (PathRouteProps | LayoutRouteProps) & {
  authGuard?: boolean
  guestGuard?: boolean
  layout?: ({ children }: { children: React.ReactNode }) => React.ReactNode
}

const routeConfig: RouteConfig[] = [
  {
    path: ROUTE.HOME,
    element: <HomePage />,
    authGuard: true,
    layout: MainLayout,
  },
  {
    path: ROUTE.ABOUT,
    element: <AboutPage />,
    authGuard:true,
    layout: MainLayout,
  },
  {
    path: ROUTE.LOGIN,
    element: <LoginPage />,
    guestGuard: true,
    // layout: RegisterLayout ,
  },
  {
    path: '*',
    element: <Notfound />,
  },
]

export default routeConfig
