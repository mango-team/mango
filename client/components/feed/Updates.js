import React from 'react'
import List from '../shared/List'
import listFrom, { detailPage } from '../helpers/listFrom'
import getUpdatedMangas from '../../api/getUpdatedMangas'

const Updates = (props) => {
  const { app, mangas, chapters } = props
  const updates = getUpdatedMangas({ mangas, chapters, take: 10 })

  return (
    <List items={listFrom(props, updates, mangas, detailPage)} {...props} />
  )
}

export default Updates
