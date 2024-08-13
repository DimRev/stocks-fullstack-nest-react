import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import store from '../../../lib/store'

type Props = {
  symbol: string
}

function StockDetails({ symbol }: Props) {
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetchStockDetails()
  }, [symbol])
  async function fetchStockDetails() {
    setIsLoading(true)
    const data = await store.getStockDetails(symbol)
    setStockDetails(data ?? null)
    setIsLoading(false)
  }
  if (isLoading) return <div>Loading...</div>
  if (!stockDetails) return <div>No stock details found</div>
  return (
    <div>
      <h2>
        {stockDetails.name} ({stockDetails.symbol})
      </h2>
      <p>Price: ${stockDetails.price.toFixed(2)}</p>
      <p>Day Low: ${stockDetails.dayLow.toFixed(2)}</p>
      <p>Day High: ${stockDetails.dayHigh.toFixed(2)}</p>
      <p>Year Low: ${stockDetails.yearLow.toFixed(2)}</p>
      <p>Year High: ${stockDetails.yearHigh.toFixed(2)}</p>
      <p>Market Cap: ${stockDetails.marketCap.toLocaleString()}</p>
      <p>PE Ratio: {stockDetails.peRatio}</p>
      <p>Exchange: {stockDetails.exchange}</p>
      <p>Volume: {stockDetails.volume.toLocaleString()}</p>
      <p>Average Volume: {stockDetails.avgVolume.toLocaleString()}</p>
      <p>Open: ${stockDetails.open.toFixed(2)}</p>
      <p>Previous Close: ${stockDetails.previousClose.toFixed(2)}</p>
      <p>EPS: ${stockDetails.eps.toFixed(2)}</p>
      <p>
        Earnings Announcement:{' '}
        {new Date(stockDetails.earningsAnnouncement).toLocaleDateString()}
      </p>
      <p>
        Shares Outstanding: {stockDetails.sharesOutstanding.toLocaleString()}
      </p>
    </div>
  )
}

const StockDetailsObserver = observer(StockDetails)
export default StockDetailsObserver
