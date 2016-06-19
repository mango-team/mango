import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'
import HomeNavigation from './shared/HomeNavigation'

const History = ({children}) => {
  return (
    <div>
      <HomeNavigation />
      <Navigation type='horizontal'>
        <Link to='/history' data-react-toolbox='link'>Watch history</Link>
        <Link to='/history/search' data-react-toolbox='link'>Search History</Link>
      </Navigation>
      {children}
    </div>
  )
}

export default History
