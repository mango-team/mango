const getUpdatedMangaIds = (chapters, size) => {
  const sortedChapters = chapters.sort((c1, c2) => {
    const a = c1.importDate
    const b = c2.importDate
    return a > b ? -1 : a < b ? 1 : 0
  }).reverse()
  const updates = []
  for (let i = 0; i < sortedChapters.length; i++) {
    const { mangaId } = sortedChapters[i]
    if (updates.indexOf(mangaId) < 0) {
      updates.push(mangaId)
    }

    if (updates.length === size) {
      break
    }
  }

  return updates
}

const getUpdatedMangas = ({ take, chapters, mangas }) => {
  return getUpdatedMangaIds(chapters, take).map(mangaId => mangas.find(manga => manga.id === mangaId))
}

export default getUpdatedMangas
