type Props = {
  stockItem: StockListItem
}

function StockListItem({ stockItem }: Props) {
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
      <button>Add to portfolio</button>
    </div>
  )
}

export default StockListItem
