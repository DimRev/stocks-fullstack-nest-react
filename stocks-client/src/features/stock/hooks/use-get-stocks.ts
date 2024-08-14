import { useQuery } from 'react-query'
import { axiosInstance } from '~/lib/axios'

type GetStocksParams = {
  page: number
}

export function useGetStocks({ page }: GetStocksParams) {
  return useQuery<StockListItem[], Error>({
    queryKey: ['stocks', page],
    queryFn: () => getStocks({ page }),
    onSuccess: (res) => {
      console.log('Successfully fetched stocks:', res)
    },
    cacheTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

async function getStocks({ page }: GetStocksParams) {
  try {
    const { data } = await axiosInstance.get<StockListItem[]>(
      `/stock?page=${page}`,
    )
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
