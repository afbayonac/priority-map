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
      console.log('UPDATE item', item, index)
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
          selected: id,
          mode: 'edit'
        }
      }
    }
    case 'REMOVE': {
      const { items, board } = state
      const { id } = payload
      const index = items.findIndex(branch => branch.id === id)
      console.log('REMOVED item', id, index)
      return {
        ...state,
        items: [
          ...items.slice(0, index),
          ...items.slice(index + 1)
        ],
        board: {
          ...board,
          selected: null,
          mode: 'list'
        }
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
  items: [{
    id: 1,
    title: 'Learn English',
    description: `
    Find a good learning resource: There are many resources available for learning English, including textbooks, online courses, and language exchange programs. Choose a resource that meets your learning style and goals.
    Set specific goals: Determine what you want to achieve with your English studies, whether it is to pass an exam, communicate with native speakers, or improve your reading and writing skills. Having specific goals will help you stay motivated and track your progress.
    Practice regularly: To improve your English skills, you need to practice regularly. Set aside a specific time each day or week to focus on your studies.
    Start with the basics: Begin by learning the basic grammar and vocabulary of the English language. This will give you a solid foundation to build upon as you continue to learn.
    Don't be afraid to make mistakes: It is natural to make mistakes when learning a new language. Don't be afraid to make mistakes and use them as an opportunity to learn and improve.`,
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
    show: false,
    select: null
  }
})
