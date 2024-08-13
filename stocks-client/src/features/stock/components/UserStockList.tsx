import { observer } from 'mobx-react'
import store from '../../../lib/store'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'

function UserStockList() {
  return (
    <div className="gap-x-2 gap-y-1 grid grid-cols-3">
      {store.userStockSymbols.map((symbol, idx) => (
        <Card title={symbol} key={symbol + idx}>
          <Link to={`/portfolio/${symbol}`}>
            <Button type="primary">Details</Button>
          </Link>
        </Card>
      ))}
    </div>
  )
}

const UserStockListObserver = observer(UserStockList)
export default UserStockListObserver
