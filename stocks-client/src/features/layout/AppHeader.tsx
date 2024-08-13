import { Link } from 'react-router-dom'
import UserLoginButtonObserver from '../auth/components/UserLoginButton'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import store from '../../lib/store'
import { useMemo } from 'react'

function AppHeader() {
  const isLoggedIn = useMemo(() => {
    return store.miniUser !== null
  }, [store.miniUser])
  return (
    <header className="flex justify-between items-center px-4 h-12">
      <Link to="/">
        <div>Stocks</div>
      </Link>
      <nav className="flex">
        <Link to="/">
          <Button type="link">Home</Button>
        </Link>
        {isLoggedIn && (
          <Link to="/portfolio">
            <Button type="link">Portfolio</Button>
          </Link>
        )}
        <Link to="/stocks">
          <Button type="link">Stocks</Button>
        </Link>
        <UserLoginButtonObserver />
      </nav>
    </header>
  )
}

const AppHeaderObserver = observer(AppHeader)
export default AppHeaderObserver
