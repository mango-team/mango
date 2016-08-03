const listFrom = (props, list, source, callback) => {
  const items = []
  if (Array.isArray(list)) {
    list.forEach((listItem) => {
      const sourceItem = source.find((m) => m.id == listItem.id)
      if (sourceItem) {
        let additionalData = {}
        if (typeof callback === 'function') {
          additionalData = callback({listItem, sourceItem, list, source})
        }
        const item = Object.assign({}, sourceItem, additionalData)
        items.push(item)
      }
    })
  }
  return items
}

export const detailPage = ({ sourceItem: item }) => {
  return { url: `/${item.type}/${item.id}/${item.name}` }
}

export const mangaChapterPageUrl = ({ sourceItem: manga, listItem }) => {
  return { url: `/view/manga/${manga.id}/${manga.name}/${listItem.chapter}/${listItem.page}` }
}

export default listFrom
