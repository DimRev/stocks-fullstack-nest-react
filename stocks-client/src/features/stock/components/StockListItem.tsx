type Props = {
  stockItem: StockListItem
  handleStockItemClick: (symbol: string) => void
}

function StockListItem({ stockItem, handleStockItemClick }: Props) {
  function handleClick() {
    handleStockItemClick(stockItem.symbol)
  }
  return (
    <div className="px-2 py-4 border">
      <div className="flex items-center gap-2 border-b truncate">
        <h2 className="font-semibold text-lg">{stockItem.name}</h2>
        <p className="text-sm">{stockItem.name}</p>/
        <p className="text-xs">{stockItem.exchangeShortName}</p>
      </div>
      <div className="py-4">
        <p className="font-bold">{stockItem.price} $</p>
      </div>
      <div className="flex items-center gap-2 border-b truncate">
        <p className="px-2 py-1 border">{stockItem.symbol}</p>
        <p className="px-2 py-1 border">{stockItem.type}</p>
      </div>
      <button onClick={handleClick}>Add to portfolio</button>
    </div>
  )
}

export default StockListItem
