import '../styles/edit.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'

const Edit = (document, window) => {
  const edit = document.getElementById('edit')
  const { board } = getstate()
  const { select } = board
  const title = edit.querySelector('.edit__title')
  const priority = edit.querySelector('.edit__priority')
  const description = edit.querySelector('.edit__description')
  const update = edit.querySelector('.edit__action__update')
  const remove = edit.querySelector('.edit__action__remove')

  const isValid = () =>
    Number(priority.value) > 0 &&
    title.value.match(/^.{1,}$/)

  title.addEventListener('input', () => {
    isValid() ? update.classList.add('active') : update.classList.remove('active')
  })

  priority.addEventListener('input', () => {
    isValid() ? update.classList.add('active') : update.classList.remove('active')
  })

  description.addEventListener('input', () => {
    isValid() ? update.classList.add('active') : update.classList.remove('active')
  })

  update.addEventListener('click', () => {
    if (!isValid()) return

    const { board } = getstate()
    const { select } = board
    const item = {
      id: select,
      title: title.value,
      description: description.value,
      priority: Number(priority.value)
    }

    dispatch({ type: 'UPDATE', payload: { item } })
  })

  remove.addEventListener('click', () => {
    const { board } = getstate()
    const { select } = board
    console.log('DISPATCHING REMOVE')
    dispatch({ type: 'REMOVE', payload: { id: select } })
  })

  pipe(
    () => select,
    id => {
      let value = id
      return state => {
        const { select } = state.board
        console.log('edit', select)
        if (value === select) return
        value = select

        if (select === null) return dispatch('HIDE_BOARD')
        const { items } = getstate()
        const item = items.find(branch => branch.id === select)
        title.value = ''
        title.focus()
        title.value = item.title
        priority.value = item.priority
        description.value = item.description
      }
    },
    subscribe
  )
}

export default Edit
