import '../styles/add.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'

const Add = (document, window) => {
  const add = document.getElementById('add')
  const { board } = getstate()
  const { mode } = board
  const title = add.querySelector('.add__title')
  const priority = add.querySelector('.add__priority')
  const description = add.querySelector('.add__description')
  const addAction = add.querySelector('.add__action__add')

  const isValid = () =>
    Number(priority.value) > 0 &&
    title.value.match(/^.{1,}$/)

  title.addEventListener('input', () => {
    isValid() ? addAction.classList.add('active') : addAction.classList.remove('active')
  })

  addAction.addEventListener('click', () => {
    if (!isValid()) return
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
          priority.value = '100'
          description.value = ''
        }
      }
    },
    subscribe
  )
}

export default Add
