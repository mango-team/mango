const getLastPageViewed = (userMangas, props) => {
  const { currentUser, views, chapterPages, chapters } = props
  const results = []
  userMangas.forEach(manga => {
    const pages = views.filter(view => view.userId == currentUser.id && view.itemType == 'page')
                       .sort((a, b) => new Date(b.date) - new Date(a.date))
                       .map(view => chapterPages.find(page => page.id == view.itemId))
                       .filter(page => page.mangaId == manga.id)
    if (typeof pages !== 'undefined' && pages.length > 0) {
      const page = pages[0]
      const chapter = chapters.find(chapter => chapter.id == page.chapterId)
      const result = {
        id: manga.id,
        name: manga.name,
        chapter: chapter.number,
        page: page.number
      }
      results.push(result)
    }
  })
  return results
}

const getLastViewed = (props) => {
  const { currentUser, views, take, mangas } = props
  const userMangas = views.filter(view => view.userId == currentUser.id && view.itemType == 'manga') // only select mangas from the current user
                          .sort((a, b) => new Date(a.date) - new Date(b.date)) // order they by view date descending
                          .map(view => view.itemId) // select the manga id
                          .filter((elem, pos, arr) => arr.indexOf(elem) == pos) // remove duplicates
                          .slice(0, take) // select number of mangas requested
                          .map(mangaId => mangas.find(manga => manga.id == mangaId)) // retrieve manga entities from ids
  const results = getLastPageViewed(userMangas, props)
  return results
}

export default getLastViewed
