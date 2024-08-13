import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import store from '../../../lib/store'
import { useMemo } from 'react'
import { Avatar, Button } from 'antd'

function UserLoginButton() {
  function handleLogout() {
    store.unsetMiniUser()
  }

  const formattedUserName = useMemo(() => {
    if (!store.miniUser) {
      return null
    }

    const username = store.miniUser.username

    const capsOrDigits = username.match(/[A-Z0-9]/g)

    if (capsOrDigits && capsOrDigits.length >= 2) {
      return capsOrDigits.slice(0, 2).join('')
    }

    const parts = username.split(' ')
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
    }
    return username.slice(0, 2).toUpperCase()
  }, [store.miniUser?.username])
  return store.miniUser ? (
    <div className="flex items-center gap-4">
      <Avatar size={32}>{formattedUserName}</Avatar>
      {/* <h2>{store.miniUser.username}</h2> */}
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <Link to="/auth/login">
      <Button type="primary">Login</Button>
    </Link>
  )
}

const UserLoginButtonObserver = observer(UserLoginButton)
export default UserLoginButtonObserver
