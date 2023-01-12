import '../styles/auth.css'
import { log } from '../utils/log'
import { pipe } from '../utils/pipe'
import { getstate, subscribe } from '../utils/state'

const Auth = (document, window) => {
  const base = document.getElementById('auth')

  const avatar = document.createElement('img')
  avatar.classList.add('auth__avatar')

  const btnGoogle = document.createElement('div')

  avatar.setAttribute('alt', 'avatar of user')

  const { user } = getstate()

  if (user.logged) {
    base.replaceChildren(avatar)
  } else {
    base.replaceChildren(btnGoogle)
  }

  pipe(
    () => user,
    user => {
      return state => {
        const { user: value } = state
        if (user === value) return
        user = value
        if (user.logged) {
          log(user)
          avatar.setAttribute('src', user.data.photoURL)
          base.replaceChildren(avatar)
        } else {
          base.replaceChildren(btnGoogle)
        }
      }
    },
    subscribe
  )
}

export default Auth
