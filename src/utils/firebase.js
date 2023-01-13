import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDhzRWkvKbl7FH-7tMDZs1n8SmY5Vq_4ZU',
  authDomain: 'priority-treemap.firebaseapp.com',
  projectId: 'priority-treemap',
  storageBucket: 'priority-treemap.appspot.com',
  messagingSenderId: '366751839164',
  appId: '1:366751839164:web:9a64127aa21fc90c40b1b9',
  measurementId: 'G-GE1G33R52S'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app)

export {
  app,
  db,
  auth,
  analytics
}
