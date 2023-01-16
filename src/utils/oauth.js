import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { dispatch } from './state'

const oauth = async (global) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      dispatch({ type: 'SIGNIN', payload: { user } })
      return
    }

    dispatch({ type: 'NO_USER' })
  })
}

export {
  oauth
}
