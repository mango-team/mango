let id = 0
const views = [
  { id: ++id, itemType: 'manga', itemId: 1, userId: 1, date: Date.now() },
  { id: ++id, itemType: 'chapter', itemId: 1, userId: 1, date: Date.now() },
  { id: ++id, itemType: 'page', itemId: 1, userId: 1, date: Date.now() },
  { id: ++id, itemType: 'manga', itemId: 1, anonymours: true, date: Date.now() },
  { id: ++id, itemType: 'user', itemId: 1, userId: 1, date: Date.now() }
]

export default views
