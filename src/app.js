import "./styles/reset.css"
import "./styles/globals.css"
import "./styles/hero.css"
import "./styles/mural.css"
import "./styles/modal.css"

import { pipe } from "./utils/pipe"
import { calcAreaByBranch, calcColor, normalize, squarified } from "./utils/layouts"
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
    calcColor,
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

    div.innerHTML = `<pre>${JSON.stringify(branch, null, 2)}</pre>`
    return div
  })


const modal = () => {

}

renderTreemap(document, mural, [
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 200)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 200)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 400)
  },
  {
    item: 1,
    title: 'Random title',
    priority: randomBetween(20, 100)
  }
])

scrollBeheaveor(window)
