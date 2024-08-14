import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '~/lib/store'

type Props = {
  children: React.ReactNode
}

function AuthProvider({ children }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (store.miniUser) {
      if (pathname.startsWith('/auth')) {
        navigate('/')
      }
    } else {
      if (pathname.startsWith('/portfolio')) {
        navigate('/auth/login')
      }
    }
  }, [pathname])

  if (store.miniUser) {
    if (pathname.startsWith('/auth')) {
      return null
    }
  } else {
    if (pathname.startsWith('/portfolio')) {
      return null
    }
  }

  return <>{children}</>
}

const AuthProviderObserver = observer(AuthProvider)
export default AuthProviderObserver
