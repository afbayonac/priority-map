import './styles/reset.css'
import './styles/globals.css'
import './styles/hero.css'
import './styles/mural.css'
import './styles/modal.css'

import { pipe } from './utils/pipe'
import { calcAreaByBranch, calcColor, normalize, squarifiedPlus } from './utils/layouts'
import { log } from './utils/log'

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min

const mural = document.getElementById('mural')

const scrollBeheaveor = (global) => {
  const vh = global.innerHeight

  global.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  setTimeout(() => {
    if (global.scrollY !== 0) return
    global.scrollTo({
      top: vh,
      behavior: 'smooth'
    })
  }, 5000)
}

const renderTreemap = (document, element, data) => {
  const height = element.offsetHeight
  const width = element.offsetWidth

  const branches = pipe(
    data,
    d => d.sort(desc),
    normalize,
    calcColor,
    calcAreaByBranch(width * height),
    d => {
      if (width > height) {
        return squarifiedPlus(d, width, height, [], 0, 0, false)
      }
      return squarifiedPlus(d, height, width, [], 0, 0, true)
    },
    d => {
      log(d)
      return d
    },
    genHTMLElements(document)
  )

  element.replaceChildren(...branches)
}

const desc = (a, b) => b.priority - a.priority

const genHTMLElements = document => data => data
  .map(branch => {
    const div = document.createElement('div')
    div.setAttribute('style', `
      width: ${branch.width}px;
      height: ${branch.height}px;
      top: ${branch.top}px;
      left: ${branch.left}px;
      background-color: ${branch.color};
    `)

    div.classList.add('branch')

    div.innerHTML = `
    <h2 class="branch__title">${branch.title}<h2>
    <div class="branch__description">
    ${branch.description}
    </div>
    `
    return div
  })

renderTreemap(document, mural, [
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 200)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 40)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 90)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 40)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 200)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 40)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 1000)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 500)
  },
  {
    item: 1,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: randomBetween(20, 50)
  }
])

scrollBeheaveor(window)
