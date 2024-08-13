import { makeAutoObservable } from 'mobx'

export type MiniUser = {
  email: string
  username: string
}

class Store {
  miniUser: MiniUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setMiniUser(miniUser: MiniUser) {
    this.miniUser = miniUser
  }

  unsetMiniUser() {
    this.miniUser = null
  }
}

const store = new Store()

export default store
