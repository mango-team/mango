import React from 'react'
import { Link } from 'react-router'

import HomeNavigation from '../shared/HomeNavigation'
import List from '../shared/List'
import listFrom, { detailPage, mangaChapterPageUrl } from '../helpers/listFrom'
import getUpdatedMangas from '../../api/getUpdatedMangas'
import getLastViewed from '../../api/getLastViewed'

const Home = (props) => {
  const { app, mangas, chapters } = props
  return (
    <div>
      <HomeNavigation active='home' />
      <div>
        <List
          title={<Link to='/feed/updates'>Recent updates</Link>}
          items={listFrom(props, getUpdatedMangas({ mangas, chapters, take: 10 }), mangas, detailPage)}
          {...props} />

        <List
          title={<Link to='/feed/resume'>Resume viewing</Link>}
          items={listFrom(props, getLastViewed(props, 10), mangas, mangaChapterPageUrl)}
          {...props} />

        <List
          title={<Link to='/feed/recommended-by-friends'>Recommended by your friends</Link>}
          items={listFrom(props, app.friendsRecommendations, mangas, detailPage)}
          {...props} />

        <List
          title={<Link to='/feed/recommended'>Recommended by our system</Link>}
          items={listFrom(props, app.systemRecommendations, mangas, detailPage)}
          {...props} />
      </div>
    </div>
  )
}

export default Home
