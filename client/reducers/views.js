let id = 100

function views (state = [], action) {
  switch (action.type) {
    case 'VIEW':
      const newState = [
        ...state,
        {
          id: id++,
          itemType: action.itemType,
          itemId: action.itemId,
          userId: action.userId,
          date: action.date
        }
      ]

      return newState
    default:
      return state
  }
}

export default views
