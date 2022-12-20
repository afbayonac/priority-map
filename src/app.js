import "./styles/reset.css"
import "./styles/globals.css"
import "./styles/hero.css"
import "./styles/mural.css"
import { pipe } from "./utils/pipe"
import { squarified } from "./utils/layouts"
import { log } from "./utils/log"

log('init [🦥]')

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min

const mural  = document.getElementById('mural')

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
  log({width, height, area: height * width})
  const branches = pipe(
    data,
    d => d.sort(desc),
    normalize,
    calcAreaByBranch(width * height),
    d => squarified(d, width, height, [], 0, 0, false),
    d => {
      log(d)
      return d
    },
    genHTMLElements(document)
  ) 


  element.replaceChildren(...branches)
}

const calcAreaByBranch = area => data => data
  .map(branch => ({
    ...branch,
    area:  area * branch.norm,
  }))

const desc = (a, b) => b.priority - a.priority

const normalize = data => {
  const total = data.reduce((aco, { priority }) => priority + aco, 0)
  return data
    .map(branch => ({
      ...branch,
      norm:  branch.priority / total
    }))
}

const genHTMLElements = document => data => data
  .map(branch => {
    const div = document.createElement('div')
    div.setAttribute('style', `
      width: ${branch.width}px;
      height: ${branch.height}px;
      top: ${branch.top}px;
      left: ${branch.left}px;
    `)

    div.classList.add('branch')

    div.innerHTML = `<pre>${JSON.stringify(branch, null, 2)}</pre>`
    return div
  })

renderTreemap(document, mural, [
  {
    item: 'A',
    priority: randomBetween(20, 100)
  },
  {
    item: 'B',
    priority: randomBetween(20, 100)
  },
  {
    item: 'C',
    priority: randomBetween(20, 100)
  },
  {
    item: 'D',
    priority: randomBetween(20, 100)
  },
  {
    item: 'E',
    priority: randomBetween(20, 100)
  },
  {
    item: 'F',
    priority: randomBetween(20, 100)
  },
  {
    item: 'G',
    priority: randomBetween(20, 100)
  },
  {
    item: 'H',
    priority: randomBetween(20, 100)
  },
  {
    item: 'C',
    priority: randomBetween(20, 100)
  },
  {
    item: 'D',
    priority: randomBetween(20, 100)
  },
  {
    item: 'E',
    priority: randomBetween(20, 100)
  },
  {
    item: 'F',
    priority: randomBetween(20, 100)
  },
  {
    item: 'G',
    priority: randomBetween(20, 100)
  },
  {
    item: 'H',
    priority: randomBetween(20, 100)
  },
  {
    item: 'E',
    priority: randomBetween(20, 100)
  },
  {
    item: 'F',
    priority: randomBetween(20, 100)
  },
  {
    item: 'G',
    priority: randomBetween(20, 100)
  },
  {
    item: 'H',
    priority: randomBetween(20, 100)
  }
])

scrollBeheaveor(window)
