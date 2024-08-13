import { Link } from 'react-router-dom'
import UserLoginButtonObserver from '../auth/components/UserLoginButton'

function AppHeader() {
  return (
    <header className="flex justify-between items-center px-4 h-12">
      <Link to="/">
        <div>Stocks</div>
      </Link>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/stocks">Stocks</Link>
        <UserLoginButtonObserver />
      </nav>
    </header>
  )
}

export default AppHeader
