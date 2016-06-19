import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'

import List from '../shared/List'
import listFrom, { detailPage } from '../helpers/listFrom'

const RecommendedByFriends = (props) => {
  const { app, mangas } = props
  return (
    <div>
      <Navigation type='horizontal'>
        <Link to='/feed/recommended' data-react-toolbox='link'>Recommended for you</Link>
        <Link to='/feed/recommended-by-friends' data-react-toolbox='link'>Recommended by your friends</Link>
      </Navigation>

      <List items={listFrom(props, app.friendsRecommendations, mangas, detailPage)} {...props} />
    </div>
  )
}

export default RecommendedByFriends
