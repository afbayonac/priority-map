import { pipe } from './pipe'
import { dispatch, subscribe } from './state'

const storage = window => {
  const { localStorage } = window

  pipe(
    () => {
      const items = localStorage.getItem('items')

      if (items) {
        return JSON.parse(items)
      }

      return [

      ]
    },
    items => {
      dispatch({ type: 'RECOVERY', payload: { items } })
      return items
    },
    items => {
      let value = items
      return state => {
        const { items } = state
        if (value === items) return
        value = items
        localStorage.setItem('items', JSON.stringify(items))
      }
    },
    subscribe
  )
}

export default storage
