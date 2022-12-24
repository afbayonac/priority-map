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
    case 'SHOW_BOARD':
      return {
        ...state,
        board: {
          ...state.board,
          show: true,
          select: payload.id,
          mode: 'edit'
        }
      }
    case 'HIDE_BOARD':
      return {
        ...state,
        board: {
          ...state.board,
          show: false,
          select: null
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
  branches: [{
    id: 1,
    title: 'Random title gyjlT',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 40
  },
  {
    id: 2,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 80
  },
  {
    id: 3,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 90
  },
  {
    id: 4,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 100
  },
  {
    id: 5,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 150
  },
  {
    id: 6,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 190
  },
  {
    id: 7,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 190
  },
  {
    id: 8,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 140
  },
  {
    id: 9,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 200
  },
  {
    id: 10,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 400
  }],
  board: {
    show: false
  }
})
