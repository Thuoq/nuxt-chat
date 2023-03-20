<template>
  <div class="auth-bg">
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-xl-3 col-lg-4">
          <div class="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section">
            <div class="text-white-50">
              <h5>
                <a href="index.html" class="text-white"
                  ><i
                    class="bx bxs-message-alt-detail align-middle text-white h3 mb-1 me-2"
                  ></i>
                  Doot</a
                >
              </h5>
              <p class="font-size-16">Creating Chat App Anwesome</p>
            </div>
            <div class="mt-auto">
              <img src="@/assets/images/auth-img.png" alt="" class="auth-img" />
            </div>
          </div>
        </div>
        <!-- end col -->
        <div class="col-xl-9 col-lg-8">
          <div class="authentication-page-content">
            <div class="d-flex flex-column h-100 px-4 pt-4">
              <div class="row justify-content-center my-auto">
                <div class="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                  <div class="py-md-5 py-4">
                    <div class="text-center mb-5">
                      <h3>Welcome Back !</h3>
                      <p class="text-muted">Sign in to continue to Doot.</p>
                    </div>
                    <form @submit.prevent="onSubmit">
                      <div class="mb-3">
                        <label for="username" class="form-label">Email</label>
                        <input
                          id="username"
                          v-model="state.email"
                          type="text"
                          class="form-control"
                          placeholder="Enter email"
                        />
                      </div>

                      <div class="mb-3">
                        <div class="float-end">
                          <a href="auth-recoverpw.html" class="text-muted"
                            >Forgot password?</a
                          >
                        </div>
                        <label for="userpassword" class="form-label"
                          >Password</label
                        >
                        <div
                          class="position-relative auth-pass-inputgroup mb-3"
                        >
                          <input
                            id="password-input"
                            v-model="state.password"
                            type="password"
                            class="form-control pe-5"
                            placeholder="Enter Password"
                          />
                          <button
                            id="password-addon"
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                          >
                            <i class="ri-eye-fill align-middle"></i>
                          </button>
                        </div>
                      </div>

                      <div class="form-check form-check-info font-size-16">
                        <input
                          id="remember-check"
                          class="form-check-input"
                          type="checkbox"
                        />
                        <label
                          class="form-check-label font-size-14"
                          for="remember-check"
                        >
                          Remember me
                        </label>
                      </div>

                      <div class="text-center mt-4">
                        <button class="btn btn-primary w-100" type="submit">
                          Log In
                        </button>
                      </div>
                      <div class="mt-4 text-center">
                        <div class="signin-other-title">
                          <h5 class="font-size-14 mb-4 title">Sign in with</h5>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <div>
                              <button
                                type="button"
                                class="btn btn-light w-100"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Facebook"
                              >
                                <i class="mdi mdi-facebook text-indigo"></i>
                              </button>
                            </div>
                          </div>
                          <div class="col-6">
                            <div>
                              <button
                                type="button"
                                class="btn btn-light w-100"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Google"
                              >
                                <i class="mdi mdi-google text-danger"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <!-- end form -->

                    <div class="mt-5 text-center text-muted">
                      <p>
                        Don't have an account ?
                        <a
                          href="auth-register.html"
                          class="fw-medium text-decoration-underline"
                        >
                          Register</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container-fluid -->
  </div>
</template>
<script setup lang="ts">
import * as firebase from 'firebase/database'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '~/store/account'
const { $firebaseDatabaseRT } = useNuxtApp()
const router = useRouter()
const patternIsEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const accountStore = useAccountStore()
const state = reactive({
  email: '',
  password: '',
  hasError: false,
})
if (accountStore.$state.currentAccount) {
  router.push('/chat')
}

const hasFormValue = computed(() => {
  return state.email && state.password
})
// const isEmail = computed(() => {
//   return patternIsEmail.test(state.email)
// })

watch(storeToRefs(accountStore).isLogin, () => {
  router.push('chat')
})
function resetState() {
  state.email = ''
  state.password = ''
}
function onSubmit() {
  const { orderByChild, equalTo, query, get } = firebase
  const accountsRef = firebase.ref($firebaseDatabaseRT, '/accounts')
  const queryDatabase = query(
    accountsRef,
    orderByChild('email'),
    equalTo(state.email),
  )
  get(queryDatabase)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const account = childSnapshot.val()
          if (account.password === state.password) {
            accountStore.setCurrentAccount(account)
          } else {
            resetState()
            state.hasError = true
          }
        })
      } else {
        resetState()
        state.hasError = true
      }
    })
    .catch((error) => {
      console.error(error)
      resetState()
      state.hasError = true
    })
}
</script>
<style scoped>
.login-page {
}
</style>
