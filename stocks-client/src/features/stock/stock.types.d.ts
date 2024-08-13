type StockListItem = {
  symbol: string
  name: string
  price: number
  exchange: string
  exchangeShortName: string
  type: string
}

type StockDetails = {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  dayLow: number
  dayHigh: number
  yearHigh: number
  yearLow: number
  marketCap: number
  priceAvg50: number
  priceAvg200: number
  priceAvg500: number
  peRatio: number
  exchange: string
  volume: number
  avgVolume: number
  open: number
  previousClose: number
  eps: number
  pe: number
  earningsAnnouncement: string
  sharesOutstanding: number
  timestamp: number
}
