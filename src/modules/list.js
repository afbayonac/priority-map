import '../styles/list.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'

const renderList = (document, list, items) => {
  pipe(
    () => items,
    genHTMLElements(document),
    itemsHTML => list.replaceChildren(...itemsHTML)
  )
}

const genHTMLElements = document => items => items
  .map(item => {
    const div = document.createElement('div')
    div.setAttribute('class', 'list__item')
    div.addEventListener('click', () => dispatch({ type: 'EDIT', payload: { id: item.id } }))

    div.innerHTML = `
    <h2 class="list__title">
      ${item.title}
    </h2>
    <div class="list__description" >
      ${item.description.replace(/(\r\n|\n|\r)/gm, '<br />')}
    </div>
    `
    return div
  })

const List = (document, window) => {
  const list = document.getElementById('list')
  const { items } = getstate()
  renderList(document, list, items)

  pipe(
    () => items,
    items => {
      let value = items
      return state => {
        const { items } = state
        if (value === items) return
        value = items
        renderList(document, list, items)
      }
    },
    subscribe
  )
}

export default List
