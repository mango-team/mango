export function like (itemType, itemId, userId, date) {
  return {
    type: 'LIKE',
    itemType,
    itemId,
    userId,
    date
  }
}

export function view (itemType, itemId, userId, date) {
  return {
    type: 'VIEW',
    itemType,
    itemId,
    userId,
    date
  }
}
