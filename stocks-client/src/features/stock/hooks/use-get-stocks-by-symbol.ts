import { useQuery } from 'react-query'
import { axiosInstance } from '~/lib/axios'

type GetStockBySymbolParams = {
  symbol: string
}

export function useGetStocksBySymbol({ symbol }: GetStockBySymbolParams) {
  return useQuery<StockDetails, Error>({
    queryKey: ['details', symbol],
    queryFn: () => getStocksBySymbol({ symbol }),
    onSuccess: (res) => {
      console.log('Successfully fetched stocks:', res)
    },
    cacheTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

async function getStocksBySymbol({ symbol }: GetStockBySymbolParams) {
  try {
    const { data } = await axiosInstance.get<StockDetails>(
      `/stock/user/${symbol}`,
    )
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
