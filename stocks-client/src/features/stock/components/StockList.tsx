import { observer } from 'mobx-react'
import store from '../../../lib/store'
import StockListItem from './StockListItem'

function StockList() {
  if (
    !store.lastFetchedStocks ||
    Date.now() - store.lastFetchedStocks > 1000 * 60 * 10
  ) {
    store.getStocks()
  }

  function handleStockItemClick(symbol: string) {
    store.addStockToUserPortfolio(symbol)
  }
  return (
    <div className="gap-x-2 gap-y-1 grid grid-cols-3">
      {store.stocks.map((stockItem, idx) => (
        <StockListItem
          key={stockItem.symbol + idx}
          stockItem={stockItem}
          handleStockItemClick={handleStockItemClick}
        />
      ))}
    </div>
  )
}

const StockListObserver = observer(StockList)
export default StockListObserver
