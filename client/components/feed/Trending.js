import React from 'react'
import List from '../shared/List'
import listFrom, { mangaDetailPageUrl } from '../helpers/listFrom'

const Trending = (props) => {
  const { app } = props
  return (
    <List items={listFrom(props, app.trending, mangaDetailPageUrl)} {...props} />
  )
}

export default Trending
