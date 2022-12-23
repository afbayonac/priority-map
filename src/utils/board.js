import '../styles/board.css'

import { dispatch, getstate, subscribe } from './state'

const genHTMLList = (document, node, data) => {}

const Board = (document, window) => {
  const { branches } = getstate()
  const board = document.getElementById('board')

  const background = board.querySelector('.board__background')
  background.addEventListener('click', () => dispatch({ type: 'SHOW_BOARD', payload: false }))

  const closeNav = board.querySelector('#board__nav__close')
  closeNav.addEventListener('click', () => dispatch({ type: 'SHOW_BOARD', payload: false }))

  const list = board.querySelector('.board__background')
  genHTMLList(document.body, list, branches)

  subscribe(state => {
    const { show } = state.board
    if (show) {
      board.classList.add('show')
    } else {
      board.classList.remove('show')
    }
  })
}

export default Board
