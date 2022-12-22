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
          show: payload
        }
      }
    default:
      return state
  }
}

export const [subscribe, dispatch, getstate] = createStore(reducer, {
  branches: [{
    item: 1,
    title: 'Random title gyjlT',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 40
  },
  {
    item: 2,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 80
  },
  {
    item: 3,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 90
  },
  {
    item: 4,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 100
  },
  {
    item: 5,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 150
  },
  {
    item: 6,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 190
  },
  {
    item: 7,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 190
  },
  {
    item: 8,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 140
  },
  {
    item: 9,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 200
  },
  {
    item: 10,
    title: 'Random title',
    description: 'lorem ipsum dolor sit am id, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dol underlying  theorem ipsum dolor sit am id, consectetur adip  iscing elit sed do eiusmod tempor incididunt ut lab lorem ipsum dolor sit am id, consectetur adip',
    priority: 400
  }],
  board: {
    show: false
  }
})
