import '../styles/mural.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from './state'
import { calcAreaByBranch, calcColor, interpolate, normalize, squarifiedPlus } from './layouts'

const renderTreemap = (document, element, data) => {
  console.log('rendertreemap')
  const height = element.offsetHeight
  const width = element.offsetWidth
  const branches = pipe(
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
    genHTMLElements(document)
  )

  element.replaceChildren(...branches)
}

const desc = (a, b) => b.priority - a.priority

const titleSize = v => (24 * v) + 14
const descriptionSize = v => (20 * v) + 12
const genHTMLElements = document => items => items
  .map(item => {
    const { width, height, top, left, norm, color, interpolation, title, description, id } = item

    const div = document.createElement('div')
    const scale = width < height ? width : height // Math.sqrt(branch.area, 2)

    div.setAttribute('style', `
      width: ${Math.ceil(width)}px;
      height: ${Math.ceil(height)}px;
      top: ${Math.ceil(top)}px;
      left: ${Math.ceil(left)}px;
      
      background-color: ${norm > 0.01 ? color : 'red'};
      padding: ${scale / 20}px;
    `)

    div.classList.add('branch')
    div.addEventListener('click', () => dispatch({ type: 'EDIT', payload: { id } }))

    div.innerHTML = `
    <h2 class="branch__title" style='
      font-size: ${titleSize(interpolation)}px;
      min-height: ${titleSize(interpolation) + 2}px;
    '>
      ${title}
      ${Math.floor(width / height * 100) / 100} 
    </h2>
    <div class="branch__description" style='
      font-size: ${descriptionSize(interpolation)}px;
    '>
      ${description.replace(/(\r\n|\n|\r)/gm, '<br />')}
    </div>
    `
    return div
  })

const Mural = (document, window) => {
  const mural = document.getElementById('mural')
  const { items } = getstate()
  renderTreemap(document, mural, items)

  pipe(
    () => items,
    items => {
      let value = items
      return state => {
        const { items } = state
        if (value === items) return
        value = items
        renderTreemap(document, mural, items)
      }
    },
    subscribe
  )
}

export default Mural
