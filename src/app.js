import './styles/reset.css'
import './styles/globals.css'
import './styles/hero.css'
import './styles/mural.css'

import Board from './modules/board'
import Mural from './modules/mural'
import List from './modules/list'
import Edit from './modules/edit'
import Add from './modules/add'
import Auth from './modules/auth'
import storage from './utils/storage'

import { app } from './utils/firebase'
import { oauth } from './utils/oauth'

oauth(app, window)

const scrollBeheaveor = (global) => {
  const vh = global.innerHeight

  setTimeout(() => {
    if (global.scrollY !== 0) return
    global.scrollTo({
      top: vh,
      behavior: 'smooth'
    })
  }, 5000)
}

scrollBeheaveor(window)
storage(window)
Board(document, window)
Mural(document, window)
List(document, window)
Edit(document, window)
Add(document, window)
Auth(document, window)
