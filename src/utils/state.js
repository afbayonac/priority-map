const createStore = (reducer, initialState) => {
  let state = initialState
  const subscribers = []
  const getstate = () => state

  const subscribe = listener => subscribers.push(listener)

  const dispatch = action => {
    state = reducer(state, action)
    subscribers.forEach(subscriber => subscriber(state))
  }

  return [subscribe, dispatch, getstate]
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'EDIT':
      return {
        ...state,
        board: {
          ...state.board,
          show: true,
          select: payload.id,
          mode: 'edit'
        }
      }
    case 'UPDATE': {
      const { items } = state
      const { item } = payload
      const index = items.findIndex(branch => branch.id === item.id)
      return {
        ...state,
        items: [
          ...items.slice(0, index),
          item,
          ...items.slice(index + 1)
        ]
      }
    }
    case 'ADD': {
      const { items, board } = state
      const id = Math.max(...items.map(e => e.id)) + 1
      const { item } = payload
      return {
        ...state,
        items: [
          ...items,
          {
            ...item,
            id
          }
        ],
        board: {
          ...board,
          select: id,
          mode: 'edit'
        }
      }
    }
    case 'REMOVE': {
      const { items, board } = state
      const { id } = payload
      const index = items.findIndex(branch => branch.id === id)
      return {
        ...state,
        items: [
          ...items.slice(0, index),
          ...items.slice(index + 1)
        ],
        board: {
          ...board,
          select: null,
          mode: 'list'
        }
      }
    }
    case 'RECOVERY': {
      const { items } = payload
      return {
        ...state,
        items
      }
    }
    case 'HIDE_BOARD':
      return {
        ...state,
        board: {
          ...state.board,
          show: false
        }
      }
    case 'MODE_BOARD':
      return {
        ...state,
        board: {
          ...state.board,
          mode: payload.mode
        }
      }
    default:
      return state
  }
}

export const [subscribe, dispatch, getstate] = createStore(reducer, {
  items: [],
  board: {
    show: false,
    select: null
  },
  user: {
    loggedIn: false
  }
})
