import { useMutation } from 'react-query'
import { axiosInstance } from '~/lib/axios'

export function useAddStockToUserPortfolio() {
  return useMutation(addStockToUserPortfolio, {
    onSuccess: (data) => {
      console.log('Successfully added stock to user portfolio:', data)
    },
  })
}

type AddStockToUserPortfolioParams = {
  symbol: string
}

async function addStockToUserPortfolio({
  symbol,
}: AddStockToUserPortfolioParams) {
  try {
    const { data } = await axiosInstance.post<{ stockSymbols: string[] }>(
      `/stock/user/${symbol}`,
      {},
      {
        withCredentials: true,
      },
    )
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
