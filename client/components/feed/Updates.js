import React from 'react'
import List from '../shared/List'
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom'

const Updates = (props) => {
  const { app } = props
  return (
    <List items={listFrom(props, app.updates, mangaChapterPageUrl)} {...props} />
  )
}

export default Updates
