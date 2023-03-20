import { useAccountStore } from '~/store/account'

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore()
  if (!accountStore.$state.currentAccount) {
    return navigateTo('/login')
  }
})
