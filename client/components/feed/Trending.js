import React from 'react'
import List from '../shared/List'
import listFrom, { detailPage } from '../helpers/listFrom'

const Trending = (props) => {
  const { app, mangas } = props
  return (
    <List items={listFrom(props, app.trending, mangas, detailPage)} {...props} />
  )
}

export default Trending
