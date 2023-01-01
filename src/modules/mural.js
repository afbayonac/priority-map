import '../styles/mural.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'
import { calcAreaByBranch, calcColor, interpolate, normalize, squarifiedPlus } from '../utils/layouts'

const renderTreemap = (document, element, data) => {
  const height = element.offsetHeight
  const width = element.offsetWidth

  pipe(
    () => data,
    d => d.sort(desc),
    interpolate,
    normalize,
    calcColor,
    calcAreaByBranch(width * height),
    d => {
      if (width > height) {
        return squarifiedPlus(d, width, height, [], 0, 0, false)
      }
      return squarifiedPlus(d, height, width, [], 0, 0, true)
    },
    d => genHTMLElements(d, document, element)
  )
}

const desc = (a, b) => b.priority - a.priority
const titleSize = v => (24 * v) + 14
const descriptionSize = v => (20 * v) + 12
const genHTMLElements = (items, document, element) => items
  .map(item => {
    const { width, height, top, left, color, interpolation, title, description, id, priority } = item
    const scale = width < height ? width : height

    const div = element.querySelector(`#branch-${id}`) || document.createElement('div')

    div.style.height = `${Math.ceil(width)}px`
    div.style.top = `${Math.ceil(width)}px`
    div.style.left = `${Math.ceil(width)}px`
    div.style.back = `${Math.ceil(width)}px`
    div.style.width = `${Math.ceil(width)}px`
    div.innerHTML = `
    <h2 class="branch__title" style='
      font-size: ${titleSize(interpolation)}px;
      min-height: ${titleSize(interpolation) + 2}px;
    '>
      ${title}
    </h2>
    <div class="branch__description" style='
      font-size: ${Math.floor(descriptionSize(interpolation))}px;
      line-height: ${Math.floor(descriptionSize(interpolation)) + 2}px;
      -webkit-line-clamp: ${Math.floor(height / (descriptionSize(interpolation) + 2) - 4)};
    '>
      ${description.replace(/(\r\n|\n|\r)/gm, '<br />')}
    </div>
    `

    div.setAttribute('style', `
      width: ${Math.ceil(width)}px;
      height: ${Math.ceil(height)}px;
      top: ${Math.ceil(top)}px;
      left: ${Math.ceil(left)}px;
      
      background-color: ${color};
      padding: ${scale / 20}px;
    `)

    if (!div.getAttribute('id')) {
      div.setAttribute('id', `branch-${id}`)
      div.setAttribute('data-priority', `${priority}`)
      div.classList.add('branch')
      div.addEventListener('click', () => dispatch({ type: 'EDIT', payload: { id } }))
      element.appendChild(div)
    }

    return items
  })

const Mural = (document, window) => {
  const mural = document.getElementById('mural')
  const { items } = getstate()
  renderTreemap(document, mural, items)
  const nodes = {}
  let resizeTimeout = null

  window.addEventListener('resize', () => {
    if (resizeTimeout !== null) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const { items } = getstate()
      renderTreemap(document, mural, items, nodes)
    }, 300)
  })

  pipe(
    () => items,
    items => {
      let value = items
      return state => {
        const { items } = state
        if (value === items) return
        value = items
        renderTreemap(document, mural, items, nodes)
      }
    },
    subscribe
  )
}

export default Mural
