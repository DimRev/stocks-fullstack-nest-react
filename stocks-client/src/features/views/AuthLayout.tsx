import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="h-[calc(100dvh-48px)]">
      <Outlet />
    </div>
  )
}

export default AuthLayout
