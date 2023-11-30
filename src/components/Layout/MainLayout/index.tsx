import { ROUTE } from '@/constants/routes'
import { useAuth } from '@/store/auth'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  const { logout } = useAuth()
  return (
    <div>
      <div className='flex justify-end max-w-[1100px] m-auto py-4'>
        <ul className='flex gap-5'>
          <NavLink to={ROUTE.HOME}>Home</NavLink>
          <NavLink to={ROUTE.ABOUT}>About</NavLink>
          <button onClick={()=>logout()}>Logout</button>
        </ul>
      </div>
      MainLayout {children}
    </div>
  )
}

export default MainLayout
