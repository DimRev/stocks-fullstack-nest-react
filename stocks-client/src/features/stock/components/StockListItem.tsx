import { Button, Card } from 'antd'

type Props = {
  stockItem: StockListItem
  handleStockItemClick: (symbol: string) => void
}

function StockListItem({ stockItem, handleStockItemClick }: Props) {
  function handleClick() {
    handleStockItemClick(stockItem.symbol)
  }
  return (
    <Card title={stockItem.name} extra={stockItem.exchangeShortName}>
      <div className="py-1 border-b">
        <div className="flex items-center gap-2 pb-4 truncate">
          <p className="px-2 py-1 border">{stockItem.symbol}</p>
          <p className="px-2 py-1 border">{stockItem.type}</p>
        </div>
        <p
          className={`font-bold text-xl ${
            stockItem.price > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
          ${stockItem.price.toFixed(2)}
        </p>
      </div>
      <div className="pt-2">
        <Button onClick={handleClick}>Add</Button>
      </div>
    </Card>
  )
}

export default StockListItem
