import { useQuery } from 'react-query'
import { axiosInstance } from '~/lib/axios'

export function useGetStocks() {
  return useQuery<StockListItem[], Error>({
    queryKey: ['stocks'],
    queryFn: getStocks,
    onSuccess: (res) => {
      console.log('Successfully fetched stocks:', res)
    },
  })
}

function getStocks() {
  return axiosInstance.get<StockListItem[]>('/stock').then((res) => res.data)
}
