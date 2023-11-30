import Auth from '@/auth'
import routeConfig, { RouteConfig } from '@/routes'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const RenderRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map(
        (
          { guestGuard, authGuard, layout: LayoutComponents, ...route },
          index
        ) => {
          //get layout
          const element = LayoutComponents ? (
            <LayoutComponents>{route.element}</LayoutComponents>
          ) : (
            route.element
          )
          
          //assign check auth
          const render = (
            <Auth
              guestGuard={Boolean(guestGuard)}
              authGuard={Boolean(authGuard)}
            >
              {element}
            </Auth>
          )

          //create route
          return <Route key={index} {...route} element={render} />
        }
      )}
    </Routes>
  )
}

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderRoutes routes={routeConfig} />
        </Suspense>
      </Router>
    </>
  )
}

export default App
