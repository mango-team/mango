import React from 'react'
import List from '../shared/List'
import listFrom, { detailPage } from '../helpers/listFrom'

const Subscriptions = (props) => {
  const { mangas, subscriptions, user } = props
  const userSubscriptions = subscriptions.filter(s => s.userId == user.id).map(s => mangas.find(manga => manga.id == s.mangaId))
  return (
    <div>
      <List
        title='Subscriptions'
        items={listFrom(props, userSubscriptions, mangas, detailPage)}
        {...props} />
    </div>
  )
}

export default Subscriptions
