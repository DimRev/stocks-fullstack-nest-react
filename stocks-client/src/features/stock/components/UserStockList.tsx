import { observer } from 'mobx-react'
import store from '../../../lib/store'
import { Link } from 'react-router-dom'

function UserStockList() {
  return (
    <div>
      {store.userStockSymbols.map((symbol, idx) => (
        <div key={symbol + idx}>
          <p>{symbol}</p>
          <Link to={`/portfolio/${symbol}`}>
            <button>Details</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

const UserStockListObserver = observer(UserStockList)
export default UserStockListObserver
