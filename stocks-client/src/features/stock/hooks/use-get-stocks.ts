import { useQuery } from 'react-query'
import { axiosInstance } from '~/lib/axios'

export function useGetStocks() {
  return useQuery<StockListItem[], Error>({
    queryKey: ['stocks'],
    queryFn: getStocks,
    onSuccess: (res) => {
      console.log('Successfully fetched stocks:', res)
    },
    cacheTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

async function getStocks() {
  try {
    const { data } = await axiosInstance.get<StockListItem[]>('/stock')
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
