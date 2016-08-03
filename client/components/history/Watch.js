import React from 'react'
import List from '../shared/List'
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom'
import getLastViewed from '../../api/getLastViewed'

const Watch = (props) => {
  const { mangas } = props
  return (
    <List items={listFrom(props, getLastViewed(props, 100), mangas, mangaChapterPageUrl)} {...props} />
  )
}

export default Watch
