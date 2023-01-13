import { onAuthStateChanged } from 'firebase/auth'
import { dispatch } from './state'

const oauth = async (global) => {
  onAuthStateChanged(user => {
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
