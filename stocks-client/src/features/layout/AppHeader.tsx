import { Link } from 'react-router-dom'
import UserLoginButton from '../auth/components/UserLoginButton'

function AppHeader() {
  return (
    <header className="flex justify-between items-center px-4 h-12">
      <Link to="/">
        <div>Stocks</div>
      </Link>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <UserLoginButton />
      </nav>
    </header>
  )
}

export default AppHeader
