import { axiosInstance } from '~/lib/axios'

function useGetStocksBySymbol() {}

type GetStockBySymbolParams = {
  symbol: string
}

async function getStocksBySymbol({ symbol }: GetStockBySymbolParams) {
  return axiosInstance.get<StockDetails>(`/stock/${symbol}`)
}
