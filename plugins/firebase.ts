import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  // Doing something with nuxtApp
  const firebaseConfig = {
    apiKey: runtimeConfig.FIREBASE_API_KEY,
    authDomain: runtimeConfig.FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://project-eco-db.firebaseio.com',
    projectId: runtimeConfig.FIREBASE_PROJECT_ID,
    storageBucket: runtimeConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: runtimeConfig.FIREBASE_MESSAGING_SENDER_ID,
    appId: runtimeConfig.FIREBASE_APP_ID,
    measurementId: runtimeConfig.FIREBASE_MEASUREMENT_ID,
  }

  const app = initializeApp(firebaseConfig)
  return {
    provide: {
      firebaseDatabaseRT: getDatabase(app),
    },
  }
})
