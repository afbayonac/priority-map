import "./styles/reset.css"
import "./styles/globals.css"
import "./styles/hero.css"

const log = (...args) => console.log('[priority-treemap]', ...args)
log('init [🦥]')


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

scrollBeheaveor(window)
