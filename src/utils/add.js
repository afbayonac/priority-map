import '../styles/add.css'
import { pipe } from './pipe'
import { dispatch, getstate, subscribe } from './state'

const Add = (document, window) => {
  const add = document.getElementById('add')
  const { board } = getstate()
  const { mode } = board
  const title = add.querySelector('.add__title')
  const priority = add.querySelector('.add__priority')
  const description = add.querySelector('.add__description')
  const addAction = add.querySelector('.add__action__add')

  addAction.addEventListener('click', () => {
    const item = {
      title: title.value,
      description: description.value,
      priority: Number(priority.value)
    }

    dispatch({ type: 'ADD', payload: { item } })
  })

  pipe(
    () => mode,
    id => {
      let value = mode
      return state => {
        const { mode } = state.board

        if (value === mode) return
        value = mode

        if (mode === 'add') {
          title.focus()
          title.value = ''
          priority.value = '1'
          description.value = ''
        }
      }
    },
    subscribe
  )
}

export default Add
