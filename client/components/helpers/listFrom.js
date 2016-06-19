const listFrom = (props, list, callback) => {
  const items = []
  if (Array.isArray(list)) {
    const { mangas } = props

    list.forEach((listItem) => {
      if (listItem && listItem.type === 'manga') {
        const manga = mangas.find((m) => m.id === listItem.id)
        if (manga) {
          let additionalData = {}
          if (typeof callback === 'function') {
            additionalData = callback({listItem, manga, list, mangas})
          }
          const item = Object.assign({}, manga, additionalData)
          items.push(item)
        }
      }
    })
  }
  return items
}

export const mangaDetailPageUrl = ({ manga }) => {
  return { url: `/manga/${manga.id}/${manga.name}` }
}

export const mangaChapterPageUrl = ({ manga, listItem }) => {
  return { url: `/view/manga/${manga.id}/${manga.name}/${listItem.chapter}/${listItem.page}` }
}

export default listFrom
