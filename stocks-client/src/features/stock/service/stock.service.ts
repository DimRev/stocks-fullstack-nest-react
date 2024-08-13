import { AxiosError } from 'axios'
import { axiosInstance } from '../../../lib/axios'

export const stockService = {
  getStocks,
  getStockBySymbol,
  addStockToUserPortfolio,
}

async function getStocks() {
  try {
    const { data } = await axiosInstance
      .get<StockListItem[]>('/stock')
      .catch((err) => {
        console.error(err)
        if (err instanceof AxiosError) throw err.response?.data!.message
        else throw new Error('Something went wrong')
      })
    return data
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}

async function getStockBySymbol(symbol: string) {
  try {
    const { data } = await axiosInstance
      .get<StockDetails>(`/stock/${symbol}`)
      .catch((err) => {
        console.error(err)
        if (err instanceof AxiosError) throw err.response?.data!.message
        else throw new Error('Something went wrong')
      })
    return data
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}

async function addStockToUserPortfolio(symbol: string) {
  try {
    const { data } = await axiosInstance
      .post(`/stock/user/${symbol}`)
      .catch((err) => {
        console.error(err)
        if (err instanceof AxiosError) throw err.response?.data!.message
        else throw new Error('Something went wrong')
      })
    return data
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}
