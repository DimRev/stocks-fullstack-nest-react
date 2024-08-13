import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import store from '../../../lib/store'

function UserLoginButton() {
  function handleLogout() {
    store.unsetMiniUser()
  }
  return store.miniUser ? (
    <>
      <h2>{store.miniUser.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <Link to="/auth/login">Login</Link>
  )
}

const UserLoginButtonObserver = observer(UserLoginButton)
export default UserLoginButtonObserver
