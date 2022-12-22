import '../styles/mural.css'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from './state'
import { calcAreaByBranch, calcColor, interpolate, normalize, squarifiedPlus } from './layouts'

const renderTreemap = (document, element, data) => {
  const height = element.offsetHeight
  const width = element.offsetWidth
  const branches = pipe(
    data,
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
const genHTMLElements = document => data => data
  .map(branch => {
    const div = document.createElement('div')
    const scale = branch.width < branch.height ? branch.width : branch.height // Math.sqrt(branch.area, 2)

    div.setAttribute('style', `
      width: ${Math.ceil(branch.width)}px;
      height: ${Math.ceil(branch.height)}px;
      top: ${Math.ceil(branch.top)}px;
      left: ${Math.ceil(branch.left)}px;
      
      background-color: ${branch.norm > 0.01 ? branch.color : 'red'};
      padding: ${scale / 20}px;
    `)

    div.classList.add('branch')
    div.addEventListener('click', () => dispatch({ type: 'SHOW_BOARD', payload: true }))

    div.innerHTML = `
    <h2 class="branch__title" style='
      font-size: ${titleSize(branch.interpolation)}px;
      min-height: ${titleSize(branch.interpolation) + 2}px;
    '>
      ${branch.title}
      ${Math.floor(branch.width / branch.height * 100) / 100} 
    </h2>
    <div class="branch__description" style='
      font-size: ${descriptionSize(branch.interpolation)}px;
    '>
      ${branch.description}
    </div>
    `
    return div
  })

const Mural = (document, window) => {
  const mural = document.getElementById('mural')

  const { branches } = getstate()
  renderTreemap(document, mural, branches)

  subscribe(state => {
    console.log('update map')
    const { branches } = state
    console.log({ branches })
    renderTreemap(document, mural, branches)
  })
}

export default Mural
