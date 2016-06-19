import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'

import List from '../shared/List'
import listFrom, { mangaDetailPageUrl } from '../helpers/listFrom'

const Recommended = (props) => {
  const { app } = props
  return (
        <div>
            <Navigation type='horizontal'>
                <Link to='/feed/recommended' data-react-toolbox='link'>Recommended for you</Link>
                <Link to='/feed/recommended-by-friends' data-react-toolbox='link'>Recommended by your friends</Link>
            </Navigation>

            <List items={listFrom(props, app.systemRecommendations, mangaDetailPageUrl)} {...props} />
        </div>
    )
}

export default Recommended
