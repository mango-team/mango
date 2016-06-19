import React from 'react'
import List from '../shared/List'
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom'

const Updates = (props) => {
  const { app, mangas } = props
  return (
    <List items={listFrom(props, app.updates, mangas, mangaChapterPageUrl)} {...props} />
  )
}

export default Updates
