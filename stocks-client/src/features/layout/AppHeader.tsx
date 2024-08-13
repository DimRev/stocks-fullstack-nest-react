import { Link } from 'react-router-dom'

function AppHeader() {
  return (
    <header className="flex justify-between items-center px-4 h-12">
      <Link to="/">
        <div>Stocks</div>
      </Link>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  )
}

export default AppHeader
