let id = 0
const likes = [
  { id: ++id, itemType: 'manga', itemId: 1, userId: 1, date: Date.now() },
  { id: ++id, itemType: 'manga', itemId: 1, userId: 2, date: Date.now() },
  { id: ++id, itemType: 'manga', itemId: 1, userId: 3, date: Date.now() },
  { id: ++id, itemType: 'manga', itemId: 1, anonymous: true, date: Date.now() },
  { id: ++id, itemType: 'user', itemId: 1, userId: 1, date: Date.now() }
]

export default likes
