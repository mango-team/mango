import React from 'react'
import List from '../shared/List'
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom'

const Resume = (props) => {
  const { currentUser, mangas } = props
  return (
    <List items={listFrom(props, currentUser.history, mangas, mangaChapterPageUrl)} {...props} />
  )
}

export default Resume
