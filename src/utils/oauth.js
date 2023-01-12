import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { dispatch } from './state'

const CLIENT_ID = '366751839164-dg6kaavoaeh3emmt608ajfirv3tqp82k.apps.googleusercontent.com'

const oauth = (app, global) => {
  global.onload = () => {
    const { accounts } = global.google

    accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse
    })

    accounts.id.prompt()
  }

  const handleCredentialResponse = async response => {
    const auth = getAuth(app)
    const credential = GoogleAuthProvider.credential(response.credential)
    const { user } = await signInWithCredential(auth, credential)
    dispatch({ type: 'SIGNIN', payload: { user } })
  }
}

export {
  oauth
}
