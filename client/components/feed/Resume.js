import React from 'react'
import List from '../shared/List'
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom'
import getLastViewedItemIds from '../../api/getLastViewedItemIds'

const Resume = (props) => {
  const { mangas, views } = props
  const history = getLastViewedItemIds({ views: views.filter(view => view.itemType === 'manga'), take: 10 }).map(id => mangas.find(manga => manga.id === id))
  return (
    <List items={listFrom(props, history, mangas, mangaChapterPageUrl)} {...props} />
  )
}

export default Resume
