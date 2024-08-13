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

  public async addStockToUserPortfolio(symbol: string) {
    stockService.addStockToUserPortfolio(symbol).then((data) => {
      if (data) {
        console.log(data)
      }
    })
  }
}

const store = new Store()

export default store
