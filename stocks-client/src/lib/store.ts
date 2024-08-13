import { makeAutoObservable } from 'mobx'
import { stockService } from '../features/stock/service/stock.service'

export type MiniUser = {
  email: string
  username: string
}

class Store {
  miniUser: MiniUser | null = null
  stocks: StockListItem[] = []
  lastFetchedStocks: number | null = null
  userStockSymbols: string[] = []
  stockDetails: Record<string, [number, StockDetails]> = {}

  constructor() {
    makeAutoObservable(this)
  }

  public setMiniUser(miniUser: MiniUser) {
    this.miniUser = miniUser
  }

  public unsetMiniUser() {
    this.miniUser = null
  }

  public async getStocks() {
    stockService.getStocks().then((data) => {
      if (data) {
        this.stocks = data
        this.lastFetchedStocks = Date.now()
      }
    })
  }

  public setUserStockSymbols(userStockSymbols: string[]) {
    this.userStockSymbols = userStockSymbols
  }

  public async addStockToUserPortfolio(symbol: string) {
    stockService.addStockToUserPortfolio(symbol).then((data) => {
      if (data && this.miniUser) {
        this.userStockSymbols = data.stockSymbols
      }
    })
  }

  public async getStockDetails(symbol: string) {
    if (
      !this.stockDetails[symbol] ||
      this.stockDetails[symbol][0] + 1000 * 60 * 10 < Date.now()
    ) {
      const data = await stockService.getStockDetails(symbol)
      if (data) {
        this.stockDetails[symbol] = [Date.now(), data]
        return data
      }
    } else {
      return this.stockDetails[symbol][1]
    }
  }
}

const store = new Store()

export default store
