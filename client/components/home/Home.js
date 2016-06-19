import React from 'react'
import { Link } from 'react-router'

import HomeNavigation from '../shared/HomeNavigation'
import List from '../shared/List'
import listFrom, { mangaDetailPageUrl, mangaChapterPageUrl } from '../helpers/listFrom'

const Home = (props) => {
  const { app, currentUser } = props
  return (
    <div>
      <HomeNavigation active='home' />
      <div>
        <List
          title={<Link to='/feed/updates'>Recent updates</Link>}
          items={listFrom(props, app.updates, mangaChapterPageUrl)}
          {...props} />

        <List
          title={<Link to='/feed/resume'>Resume viewing</Link>}
          items={listFrom(props, currentUser.history, mangaChapterPageUrl)}
          {...props} />

        <List
          title={<Link to='/feed/recommended-by-friends'>Recommended by your friends</Link>}
          items={listFrom(props, app.friendsRecommendations, mangaDetailPageUrl)}
          {...props} />

        <List
          title={<Link to='/feed/recommended'>Recommended by our system</Link>}
          items={listFrom(props, app.systemRecommendations, mangaDetailPageUrl)}
          {...props} />
      </div>
    </div>
  )
}

export default Home
