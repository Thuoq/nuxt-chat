import { defineStore } from 'pinia'

type Account = {
  name: string
  password: string
  displayName: string
  email: string
}
interface AccountStore {
  currentAccount: Account | null
}
export const useAccountStore = defineStore('accounts', {
  state: (): AccountStore => ({
    currentAccount: null,
  }),
  getters: {
    isLogin: (state) => !!state.currentAccount,
  },
  actions: {
    setCurrentAccount(payload: Account) {
      this.$state.currentAccount = payload
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
