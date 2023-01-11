import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { log } from './log'

const oauth = (app, global) => {
  global.onload = () => {
    log('Init login One tap')
    global.google.accounts.id.initialize({
      client_id: '366751839164-dg6kaavoaeh3emmt608ajfirv3tqp82k.apps.googleusercontent.com',
      callback: handleCredentialResponse
    })
    global.google.accounts.id.prompt()
  }

  const handleCredentialResponse = (response) => {
    log({ response })
    log('handleCredentialResponse')

    const auth = getAuth(app)
    const credential = GoogleAuthProvider.credential(response.credential)

    signInWithCredential(auth, credential)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        log({ token, user })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        log({ errorCode, errorMessage, email, credential })
      })
  }
}

export {
  oauth
}
