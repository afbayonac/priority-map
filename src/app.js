import './styles/reset.css'
import './styles/globals.css'
import './styles/hero.css'
import './styles/mural.css'

import Board from './utils/board'
import Mural from './utils/mural'
import List from './utils/list'
import Edit from './utils/edit'
import Add from './utils/add'

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
Board(document, window)
Mural(document, window)
List(document, window)
Edit(document, window)
Add(document, window)
